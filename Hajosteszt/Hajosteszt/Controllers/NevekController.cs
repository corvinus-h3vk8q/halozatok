using Hajosteszt.JokeModels;
using Hajosteszt.NevekModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HajosTeszt.Controllers
{
    [Route("api/Nevek")]
    [ApiController]
    public class NevekController : Controller
    {
        // GET: api/Nevek
        [HttpGet]
        public IEnumerable<Nevek> Get()
        {
            corvinusfovjmpContext context = new corvinusfovjmpContext();
            return context.Neveks.ToList();
        }

        // GET api/Nevek/5
        [HttpGet("{id}")]
        public Nevek Get(int id)
        {
            corvinusfovjmpContext context = new corvinusfovjmpContext();
            var keresettNév = (from x in context.Neveks
                               where x.Id == id
                               select x).FirstOrDefault();
            return keresettNév;
        }

        // POST api/Nevek
        [HttpPost]
        public void Post([FromBody] Nevek újnév)
        {
            corvinusfovjmpContext context = new corvinusfovjmpContext();
            context.Neveks.Add(újnév);
            context.SaveChanges();
        }

        // PUT api/<NevekController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/Nevek/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            corvinusfovjmpContext context = new corvinusfovjmpContext();
            var törlendőnév = (from x in context.Neveks
                               where x.Id == id
                               select x).FirstOrDefault();
            context.Remove(törlendőnév);
            context.SaveChanges();

        }
    }
}
