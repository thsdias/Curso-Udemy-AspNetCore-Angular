using Microsoft.AspNetCore.Mvc;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;
using System;

namespace QuickBuy.Web.Controllers
{
    [Route("api/[controller]")]
    public class UsuarioController : Controller
    {
        readonly IUsuarioRepositorio _usuarioRepositorio;

        public UsuarioController(IUsuarioRepositorio usuarioRepositorio)
        {
            _usuarioRepositorio = usuarioRepositorio;
        }

        [HttpGet("ObterPorId")]
        public IActionResult ObterPorId(int id)
        {
            try
            {
                return Json(_usuarioRepositorio.ObterPorId(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("ObterTodos")]
        public IActionResult ObterTodos()
        {
            try
            {
                return Json(_usuarioRepositorio.ObterTodos());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost("Incluir")]
        public IActionResult Incluir([FromBody]Usuario usuario)
        {
            try
            {
                usuario.ValidaDados();

                if (!usuario.Valido)
                {
                    return BadRequest(usuario.ObterMensagensValidacao());
                }

                if (usuario.Id > 0)
                {
                    _usuarioRepositorio.Atualizar(usuario);
                }
                else
                {
                    _usuarioRepositorio.Adicionar(usuario);
                }

                return Created("api/usuario", usuario);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPut("Atualizar")]
        public IActionResult Atualizar([FromBody]Usuario usuario)
        {
            try
            {
                _usuarioRepositorio.Atualizar(usuario);
                return Json(_usuarioRepositorio.ObterPorId(usuario.Id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpDelete("Remover")]
        public IActionResult Remover([FromBody]Usuario usuario)
        {
            try
            {
                _usuarioRepositorio.Remover(usuario);
                return Json(_usuarioRepositorio.ObterTodos());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}
