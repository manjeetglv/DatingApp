using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.Data.Models;
using DatingApp.Data.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DatingApp.API.Controllers
{
    // http:localhost:5000/api/Values
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ValuesController : ControllerBase
    {
        private readonly ILogger<ValuesController> _logger;
        private readonly IValueRepository _valueRepository;

        public ValuesController(ILogger<ValuesController> logger, IValueRepository valueRepository)
        {
            _logger = logger;
            _valueRepository = valueRepository;
        }
        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<Value> values = await _valueRepository.GetValues();
            return Ok(values);
        }

        // GET api/values/5
        [HttpGet("{valueId}")]
        public ActionResult<string> Get(int valueId)
        {
            return Ok(_valueRepository.GetValue(valueId));
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
