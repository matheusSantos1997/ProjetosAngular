using System.Collections.Generic;
using System.Threading.Tasks;
using app_webapi.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace app_webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
         private IProduct database;
         private ProductContext context;

         public ProductController(IProduct _database)
         {
             this.database = _database;
         }
        
        // rota de listagem de produtos 
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await database.GetAllProductsAsync(true);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados Falhou!");
            }
        }

        [HttpGet("getByName/Name/{name}")]
        public async Task<IActionResult> GetNameAsync(string name)
        {
            try 
            {
                var products = await database.GetProductAsyncByName(name, true);

                return Ok(products);
            }
            catch (System.Exception) 
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados Falhou!");
            }
        }

        // rota de inserçao de novos produtos
        [HttpPost]
        public async Task<IActionResult> insert(Product model) 
        {
            try
            {
                database.Add(model);

                if (await database.saveChangesAsync())
                {
                    return Created($"/api/product/{model.Id}", model);
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou!");
            }

            // caso não retorne nenhuma exceçao
            return BadRequest();
        }

        [HttpPut("{ProductId}")]
        public async Task<IActionResult> update(int ProductId, Product model)
        {
            try 
            { 
                var product = await database.GetProductAsyncById(ProductId, false);

                if (product == null)
                {
                    return NotFound(); // nao vai encontrar
                }

                database.Update(model);

                if (await database.saveChangesAsync())
                {
                    return Created($"/api/product/{model.Id}", model);
                }
            } 
            catch(System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados Falhou!");
            }

            return BadRequest();
        }

        [HttpDelete("{ProductId}")]
        public async Task<IActionResult> delete(int ProductId)
        {
            try 
            {
                 var usuario = await database.GetProductAsyncById(ProductId, false);

                if (usuario == null)
                {
                    return NotFound();
                }

                database.Delete(usuario);

                if (await database.saveChangesAsync())
                {
                    return Ok();
                }
            }
            catch(System.Exception) 
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou!");
            }

            return BadRequest();
        }


        [HttpGet("getByName")]
        public async Task<IActionResult> GetOnlyNameAsync()
        {
            try {
                var products = await database.GetAllNameAsync();

                return Ok(products);

            }
            catch(System.Exception)
            {
                 return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados Falhou!");
            }
        }

        // [HttpGet("names")]
        // public async Task<ActionResult<List<string>>> GetUsersNames()
        // {
        //     var users = await context.Products
        //     .Select(x => x.Name)
        //     .AsNoTracking()
        //     .ToListAsync();
        //     return Ok(users);
        // }


        [HttpGet("ProductId")]
        public async Task<IActionResult> GetOnlyId() 
        {
            try {

                var products = await database.GetAllIdAsync();

                return Ok(products);

            }
            catch(System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados Falhou!");
            }
        }

    }
}