using System.Collections.Generic;
using System.Threading.Tasks;

namespace app_webapi.models
{
    public interface IProduct
    {
         void Add<T>(T entity) where T : class; // interface add products

         void Update<T>(T entity) where T : class; // interface update products

         void Delete<T>(T entity) where T : class; // 

         Task<bool> saveChangesAsync();

         Task<Product[]> GetAllProductsAsync(bool p);

         Task<Product> GetProductAsyncById(int productId, bool p);

         Task<Product[]> GetProductAsyncByName(string name, bool p);

         Task<List<string>> GetAllNameAsync();

         Task<List<int>> GetAllIdAsync();
    }
}