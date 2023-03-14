using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RedTechAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private DataContext _context;

        public OrderController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Order>>> Get()
        {
            return Ok(await _context.Orders.ToListAsync());
        }

        [HttpGet("{ID}")]
        public async Task<ActionResult<Order>> Get(string ID)
        {
            Guid gID = Guid.Parse(ID);
            var oneOrder = await _context.Orders.FindAsync(gID);
            if (oneOrder == null)
                return BadRequest("Order not found");
            return Ok(oneOrder);

        }

        [HttpPost]
        public async Task<ActionResult<List<Order>>> AddOrder(Order newOrder)
        {
            _context.Orders.Add(newOrder);
            await _context.SaveChangesAsync();
            return Ok(newOrder);
        }

        [HttpDelete("{ID}")]
        public async Task<ActionResult<List<Order>>> Delete(string ID)
        {
            Guid gID = Guid.Parse(ID);
            var delOrder = await _context.Orders.FindAsync(gID);
            if (delOrder == null)
                return BadRequest("Order not found");

            _context.Orders.Remove(delOrder);
            await _context.SaveChangesAsync();
            return Ok(delOrder);
        }

    }
};



