using Hajosteszt.H3VK8QModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HajosTeszt.Controllers
{
    [Route("api/Names")]
    [ApiController]
    public class H3VK8QController : Controller
    {
        // GET: api/Names
        [HttpGet]
        public IEnumerable<H3vk8q> Get()
        {
            SzamhaloContext context = new SzamhaloContext();
            return context.H3vk8qs.ToList();
        }

        // GET api/Names/5
        [HttpGet("{id}")]
        public H3vk8q Get(int id)
        {
            SzamhaloContext context = new SzamhaloContext();
            var keresettNév = (from x in context.H3vk8qs
                               where x.Id == id
                               select x).FirstOrDefault();
            return keresettNév;
        }

        // POST api/Names
        [HttpPost]
        public void Post([FromBody] H3vk8q újnév)
        {
            SzamhaloContext context = new SzamhaloContext();
            context.H3vk8qs.Add(újnév);
            context.SaveChanges();
        }

        // PUT api/H3VK8QController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/Names/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            SzamhaloContext context = new SzamhaloContext();
            var törlendőnév = (from x in context.H3vk8qs
                               where x.Id == id
                               select x).FirstOrDefault();
            context.Remove(törlendőnév);
            context.SaveChanges();

        }
        [HttpGet]
        [Route("count")]
        public int sorokSzama()
        {
            SzamhaloContext context = new SzamhaloContext();
            int NevekCount = context.H3vk8qs.Count();
            return NevekCount;
        }
    }
}