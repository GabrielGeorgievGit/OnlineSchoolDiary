namespace WebAPI.Models
{
    public class Teacher
    {
        public Teacher() {
            this.id = -50;
            this.fullName = "";
            this.email = "";
            this.password = "";
            this.idSchool = -50;
        }
        public Teacher(int id, string fullName, string email, string password, int idSchool) {
            this.id = id;
            this.fullName = fullName;
            this.email = email;
            this.password = password;
            this.idSchool = idSchool;
        }
        public int id { get; set; }
        public string fullName { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public int idSchool { get; set; }
    }
}
