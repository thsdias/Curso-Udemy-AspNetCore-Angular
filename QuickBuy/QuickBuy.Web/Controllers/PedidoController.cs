using Microsoft.AspNetCore.Mvc;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;
using QuickBuy.Repositorio.Repositorios;
using System;

namespace QuickBuy.Web.Controllers
{
    [Route("api/[controller]")]
    public class PedidoController : Controller
    {
        readonly IPedidoRepositorio _pedidoRepositorio;

        public PedidoController(IPedidoRepositorio pedidoRepositorio)
        {
            _pedidoRepositorio = pedidoRepositorio;
        }

        [HttpGet("ObterPorId")]
        public IActionResult ObterPorId(int id)
        {
            try
            {
                return Json(_pedidoRepositorio.ObterPorId(id));
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
                return Json(_pedidoRepositorio.ObterTodos());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost("Incluir")]
        public IActionResult Incluir([FromBody]Pedido pedido)
        {
            try
            {
                pedido.ValidaDados();

                if (!pedido.Valido)
                {
                    return BadRequest(pedido.ObterMensagensValidacao());
                }

                if (pedido.Id > 0)
                {
                    _pedidoRepositorio.Atualizar(pedido);
                }
                else
                {
                    _pedidoRepositorio.Adicionar(pedido);
                }

                return Created("api/endereco", pedido);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPut("Atualizar")]
        public IActionResult Atualizar([FromBody]Pedido pedido)
        {
            try
            {
                _pedidoRepositorio.Atualizar(pedido);
                return Json(_pedidoRepositorio.ObterPorId(pedido.Id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpDelete("Remover")]
        public IActionResult Remover([FromBody]Pedido pedido)
        {
            try
            {
                _pedidoRepositorio.Remover(pedido);
                return Json(_pedidoRepositorio.ObterTodos());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}
