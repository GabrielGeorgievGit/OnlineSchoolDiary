namespace WebAPI.Models
{
    public class User
    {
        public User(int id, string name, string email, string role, int? schoolId)
        {
            this.id = id;
            this.email = email;
            this.role = role;
            this.schoolId = schoolId;
            this.name = name;
        }

        public int id { get; set; }
        public string email { get; set; }
        public string role { get; set; }
        public string name { get; set; }
        public int? schoolId { get; set; }

    }
}
