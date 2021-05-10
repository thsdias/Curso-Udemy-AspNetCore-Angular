using Microsoft.AspNetCore.Mvc;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;
using System;

namespace QuickBuy.Web.Controllers
{
    [Route("api/[controller]")]
    public class UsuarioController : Controller
    {
        private readonly IUsuarioRepositorio _usuarioRepositorio;
        public UsuarioController(IUsuarioRepositorio usuarioRepositorio)
        {
            _usuarioRepositorio = usuarioRepositorio;
        }

        [HttpGet]
        public ActionResult ObterUsuarios()
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost("CadastrarUsuario")]
        public ActionResult Cadastrar([FromBody] Usuario usuario)
        {
            try
            {
                var usarioCadastrado = _usuarioRepositorio.Obter(usuario.Email);

                if (usarioCadastrado != null)
                    return BadRequest("Usuário já cadastrado no sistema");

                _usuarioRepositorio.Adicionar(usuario);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost("AtualizarUsuario")]
        public ActionResult Atualizar([FromBody] Usuario usuario)
        {
            try
            {
                _usuarioRepositorio.Atualizar(usuario);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost("VerificarUsuario")]
        public ActionResult ObterUsuario([FromBody] Usuario usuario)
        {
            try
            {
                var usuarioRetorno = _usuarioRepositorio.Obter(usuario.Email, usuario.Senha);

                if (usuarioRetorno != null)
                {
                    return Json(usuarioRetorno);
                }

                return BadRequest("Usuário ou senha inválido");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}
