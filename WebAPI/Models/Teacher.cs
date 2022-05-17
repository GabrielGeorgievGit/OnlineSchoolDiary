namespace WebAPI.Models
{
    public class Teacher
    {
        public int id { get; set; }
        public string fullName { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public int idSchool { get; set; }
    }
}
