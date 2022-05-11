using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeopleAgeTracker.Data;
using PeopleAgeTracker.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PeopleAgeTracker.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class PersonController : ControllerBase
    {
        private readonly PeopleDBContext _peopleDBContext;

        public PersonController(PeopleDBContext peopleDBContext)
        {
            _peopleDBContext = peopleDBContext;
        }
        // GET: api/<PersonController>
        [HttpGet]
        [ProducesResponseType(typeof(Person), StatusCodes.Status200OK)]
        public JsonResult Get()
        {
            var persons = _peopleDBContext.People;
            return new JsonResult(persons);
        }


        // POST api/<PersonController>
        [HttpPost]
        [ProducesResponseType(typeof(Person), StatusCodes.Status200OK)]
        public JsonResult Post(Person per)
        {
            try
            {
                
                var res = _peopleDBContext.People.Add(per);
                _peopleDBContext.SaveChanges();
            }
            catch (Exception)
            {

                return new JsonResult("Unsuccessfully");
            }


            return new JsonResult("Successfully");
        }

        // PUT api/<PersonController>/
        [HttpPut]
        [ProducesResponseType(typeof(Person), StatusCodes.Status200OK)]
        public JsonResult Put(Person per)
        {
            try
            {
                var tempper = _peopleDBContext.People.Where(x => x.PersonId == per.PersonId).Single();
                if (tempper != null)
                {
                    tempper.FirstName = per.FirstName;
                    tempper.LastName = per.LastName;
                    tempper.DOB = per.DOB;
                    _peopleDBContext.Update(tempper);
                    _peopleDBContext.SaveChanges();
                }
                
            }
            catch (Exception)
            {

                return new JsonResult("Unsuccessfully");
            }


            return new JsonResult("Successfully");
        }

        // DELETE api/<PersonController>/5
        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(Person), StatusCodes.Status200OK) ]
        public JsonResult Delete(int id)
        {
            try
            {
                var del = _peopleDBContext.People.Where(x => x.PersonId == id).Single();
                var res = _peopleDBContext.People.Remove(del);
                _peopleDBContext.SaveChanges();
            }
            catch (Exception)
            {

                return new JsonResult("Deleted Unsuccessfully");
            }
            

            return new JsonResult("Deleted Successfully");
        }
    }
}
