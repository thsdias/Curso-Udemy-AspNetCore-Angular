using Microsoft.AspNetCore.Mvc;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;
using System;
using System.Linq;

namespace QuickBuy.Web.Controllers
{
    [Route("api/[controller]")]
    public class EnderecoController : Controller
    {
        readonly IEnderecoRepositorio _enderecoRepositorio;

        public EnderecoController(IEnderecoRepositorio enderecoRepositorio)
        {
            _enderecoRepositorio = enderecoRepositorio;
        }

        [HttpGet("ObterPorId")]
        public IActionResult ObterPorId(int id)
        {
            try
            {
                return Ok(_enderecoRepositorio.ObterPorId(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("ObterTodos")]
        public IActionResult ObterTodos(int usuarioId)
        {
            try
            {
                var enderecos = _enderecoRepositorio.ObterTodos();

                if (enderecos != null)
                    return Json(enderecos.AsEnumerable().Where(e => e.UsuarioId == usuarioId));
                else
                    return Json(new Endereco());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost("Incluir")]
        public IActionResult Incluir([FromBody]Endereco endereco)
        {
            try
            {
                endereco.ValidaDados();

                if (!endereco.Valido)
                {
                    return BadRequest(endereco.ObterMensagensValidacao());
                }

                if (endereco.Id > 0)
                {
                    _enderecoRepositorio.Atualizar(endereco);
                }
                else
                {
                    _enderecoRepositorio.Adicionar(endereco);
                }

                return Created("api/endereco", endereco);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost("Remover")]
        public IActionResult Remover([FromBody]Endereco endereco)
        {
            try
            {
                _enderecoRepositorio.Remover(endereco);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}
