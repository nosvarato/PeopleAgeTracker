using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PeopleAgeTracker.Models
{
    public class Person
    {
        public int PersonId { get; set; }

        [Required]
        public string FirstName { get; set; } = null!;
        [Required]
        public string LastName { get; set; } = null!;

        public DateTime DOB { get; set; }

        public DateTime? DateCreated { get; set; }

        public DateTime? DateModified { get; set; }

        [NotMapped]
        public int Age
        {
            get
            {
                DateTime today = DateTime.Today;
                int age = today.Year - DOB.Year;
                if (DOB > today.AddYears(-age))
                    age--;
                return age;
            }
        }
        [NotMapped]
        public string DobString
        {
            get
            {
                return DOB.ToString("yyyy-MM-dd");
            }
            set
            {
                DOB = DateTime.Parse(value);
            }
        }
    }
}
