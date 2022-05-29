namespace WebAPI.Models {
    public class Student {

        public Student() { this.id = -50; this.name = ""; this.idGrade = -50; }
        public Student(int id, string name, int idGrade) {
            this.id = id; this.name = name; this.idGrade = idGrade;
        }
        public int id { get; set; }
        public string name { get; set; }

        public int idGrade { get; set; }
    }
}
