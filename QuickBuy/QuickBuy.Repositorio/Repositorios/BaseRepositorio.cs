using QuickBuy.Dominio.Contratos;
using QuickBuy.Repositorio.Repositorios.Contexto;
using System.Collections.Generic;
using System.Linq;

namespace QuickBuy.Repositorio.Repositorios
{
    public class BaseRepositorio<T> : IBaseRepositorio<T> where T : class
    {
        protected readonly QuickBuyContext QuickBuyContext;

        public BaseRepositorio(QuickBuyContext quickBuyContext)
        {
            QuickBuyContext = quickBuyContext;
        }

        public void Adicionar(T entity)
        {
            QuickBuyContext.Set<T>().Add(entity);
            QuickBuyContext.SaveChanges();
        }

        public void Atualizar(T entity)
        {
            QuickBuyContext.Set<T>().Update(entity);
            QuickBuyContext.SaveChanges();
        }

        public T ObterPorId(int id)
        {
            return QuickBuyContext.Set<T>().Find(id);
        }

        public IEnumerable<T> ObterTodos()
        {
            return QuickBuyContext.Set<T>().ToList();
        }

        public void Remover(T entity)
        {
            QuickBuyContext.Set<T>().Remove(entity);
            QuickBuyContext.SaveChanges();
        }

        public void Dispose()
        {
            QuickBuyContext.Dispose();
        }
    }
}
