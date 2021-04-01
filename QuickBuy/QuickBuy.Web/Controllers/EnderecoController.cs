using Microsoft.AspNetCore.Mvc;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;
using System;

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
        public IActionResult ObterTodos()
        {
            try
            {
                return Ok(_enderecoRepositorio.ObterTodos());
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

        [HttpPut("Atualizar")]
        public IActionResult Atualizar([FromBody]Endereco endereco)
        {
            try
            {
                _enderecoRepositorio.Atualizar(endereco);
                return Json(_enderecoRepositorio.ObterPorId(endereco.Id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpDelete("Remover")]
        public IActionResult Remover([FromBody]Endereco endereco)
        {
            try
            {
                _enderecoRepositorio.Remover(endereco);
                return Json(_enderecoRepositorio.ObterTodos());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}
