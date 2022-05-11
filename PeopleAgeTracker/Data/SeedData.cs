using PeopleAgeTracker.Models;

namespace PeopleAgeTracker.Data
{
    public class SeedData
    {
        private readonly PeopleDBContext _peopleDBContext;

        public SeedData(PeopleDBContext peopleDBContext)
        {
            _peopleDBContext = peopleDBContext;
        }
        public void Seed()
        {
            if (!_peopleDBContext.People.Any())
            {
                var people = new List<Person>()
                {
                       new Person() {FirstName="Len",LastName="Argot" ,DOB = DateTime.Parse("1981-08-23")},
                       new Person() {FirstName="Milo",LastName="Kaleal" ,DOB = DateTime.Parse("1983-12-06")},
                       new Person() {FirstName="Loyd",LastName="Campitelli" ,DOB = DateTime.Parse("1991-10-25")},
                       new Person() {FirstName="Edgar",LastName="Rehmert" ,DOB = DateTime.Parse("2008-03-18")},
                       new Person() {FirstName="Chance",LastName="Giammarino" ,DOB = DateTime.Parse("2019-04-10")},
                       new Person() {FirstName="Garret",LastName="Boatswain" ,DOB = DateTime.Parse("2011-07-07")},
                       new Person() {FirstName="Jewell",LastName="Pinke" ,DOB = DateTime.Parse("2016-08-25")},
                       new Person() {FirstName="Bruce",LastName="Donaghey" ,DOB = DateTime.Parse("1981-08-22")},
                       new Person() {FirstName="Willis",LastName="Pramik" ,DOB = DateTime.Parse("1979-09-01")},
                       new Person() {FirstName="Avery",LastName="Llewelyn" ,DOB = DateTime.Parse("1980-04-08")},
                       new Person() {FirstName="Renaldo",LastName="Rotruck" ,DOB = DateTime.Parse("2014-09-30")},
                       new Person() {FirstName="Chris",LastName="Skoch" ,DOB = DateTime.Parse("1983-10-30")},
                       new Person() {FirstName="Zack",LastName="Hemberger" ,DOB = DateTime.Parse("1993-11-27")},
                };

                _peopleDBContext.People.AddRange(people);
                _peopleDBContext.SaveChanges();
            }
        }
    }
}

