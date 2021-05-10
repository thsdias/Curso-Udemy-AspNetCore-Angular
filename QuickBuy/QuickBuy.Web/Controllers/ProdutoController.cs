using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;
using System;
using System.IO;
using System.Linq;

namespace QuickBuy.Web.Controllers
{
    [Route("api/[controller]")]
    public class ProdutoController : Controller
    {
        readonly IProdutoRepositorio _produtoRepositorio;
        private IHttpContextAccessor _httpContextAccessor;
        private IHostingEnvironment _hostingEnvironment;

        public ProdutoController(IProdutoRepositorio produtoRepositorio, 
                                 IHttpContextAccessor httpContextAccessor, 
                                 IHostingEnvironment hostingEnvironment)
        {
            _produtoRepositorio = produtoRepositorio;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;  // Obter inf sobre a pasta raiz onde o site esta sendo executado.
        }

        [HttpGet("ObterPorId")]
        public IActionResult ObterPorId(int id)
        {
            try
            {
                return Json(_produtoRepositorio.ObterPorId(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Json(_produtoRepositorio.ObterTodos());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost("Incluir")]
        public IActionResult Incluir([FromBody]Produto produto)
        {
            try
            {
                produto.ValidaDados();

                if (!produto.Valido)
                    return BadRequest(produto.ObterMensagensValidacao());
                else if (produto.Id > 0)
                    _produtoRepositorio.Atualizar(produto);
                else
                    _produtoRepositorio.Adicionar(produto);

                return Created("api/produto", produto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPut("Atualizar")]
        public IActionResult Atualizar([FromBody]Produto produto)
        {
            try
            {
                _produtoRepositorio.Atualizar(produto);
                return Json(_produtoRepositorio.ObterPorId(produto.Id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost("Remover")]
        public IActionResult Remover([FromBody]Produto produto)
        {
            try
            {
                _produtoRepositorio.Remover(produto);
                return Json(_produtoRepositorio.ObterTodos());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost("EnviarArquivo")]
        public IActionResult EnviarArquivo()
        {
            try
            {
                var arquivo = _httpContextAccessor.HttpContext.Request.Form.Files["arquivoEnviado"];
                var nomeArquivo = arquivo.FileName;
                var extensao = nomeArquivo.Split(".").Last();
                string novoNomeArquivo = GerarNovoNomeArquivo(nomeArquivo, extensao);

                var pastaArquivo = _hostingEnvironment.WebRootPath + "\\arquivos\\"; // nome do diretorio.
                var caminhoCompleto = $"{pastaArquivo}{novoNomeArquivo}";

                using (var streamArquivo = new FileStream(caminhoCompleto, FileMode.Create))
                {
                    arquivo.CopyTo(streamArquivo);
                }

                return Json(novoNomeArquivo);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        private static string GerarNovoNomeArquivo(string nomeArquivo, string extensao)
        {
            var nomeReduzido = Path.GetFileNameWithoutExtension(nomeArquivo).Take(12).ToArray();
            var novoNomeArquivo = new string(nomeReduzido).Replace(" ", "-");
            novoNomeArquivo = $"{novoNomeArquivo}_{DateTime.Now.Year}{DateTime.Now.Month}{DateTime.Now.Day}{DateTime.Now.Hour}{DateTime.Now.Minute}{DateTime.Now.Second}.{extensao}";
            return novoNomeArquivo;
        }
    }
}
