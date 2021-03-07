using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace app_webapi.models
{
    public class ProductDB : IProduct
    {
        private ProductContext context;

        public ProductDB(ProductContext _context)
        {
            this.context = _context;
            this.context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public void Add<T>(T entity) where T : class
        {
             context.Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            context.Remove(entity);
        }

        public async Task<Product[]> GetAllProductsAsync(bool p)
        {
            IQueryable<Product> query = context.Products;

            query = query.AsNoTracking()
                         .OrderBy(n => n.Name);
            
            return await query.ToArrayAsync();
        }

        public async Task<Product> GetProductAsyncById(int ProductId, bool p)
        {
            IQueryable<Product> query = context.Products;

            query = query.AsNoTracking()
                    .OrderBy(n => n.Name)
                    .Where(i => i.Id == ProductId);

            return await query.FirstOrDefaultAsync();

        }

        public async Task<bool> saveChangesAsync()
        {
            //se existe registro no banco de dados retorna e salva as mudanças
            bool results = await context.SaveChangesAsync() > 0;
            return (results); // salva mudanças
        }

        public async Task<List<string>> GetAllNameAsync()
        {
            IQueryable<string> query = context.Products.Select(X => X.Name);

            query = query.AsNoTracking();                      
                      
            return await query.ToListAsync();
            // Product product = await query.ToArrayAsync();
            // return product.Name != null ? product.Name : null;

        }
        public async Task<List<int>> GetAllIdAsync()
        {
            IQueryable<int> query = context.Products.Select(X => X.Id);

            // query = query.AsNoTracking();

            return await query.ToListAsync();
        }

        public async Task<Product[]> GetProductAsyncByName(string name, bool p)
        {
            IQueryable<Product> query = context.Products;

            query = query.AsNoTracking()
                         .OrderBy(c => c.Id)
                         .Where(n => n.Name.ToLower().Contains(name.ToLower()));
            
            return await query.ToArrayAsync();  
        }
    }
}