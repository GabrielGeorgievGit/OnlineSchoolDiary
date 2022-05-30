namespace WebAPI.Models
{
    public class Grade
    {
        public Grade() {
            this.id = -50;
            this.classNumber = "";
            this.grade = "";
            this.schoolName = "";
            this.teacherName = "";
        }
        public Grade(int id, string classNumber, string grade, string schoolName, string teacherName) {
            this.id = id;
            this.classNumber = classNumber;
            this.grade = grade;
            this.schoolName = schoolName;
            this.teacherName = teacherName;
        }
        public int id { get; set; }
        public string classNumber { get; set; }
        public string grade { get; set; }
        public string schoolName { get; set; }
        public string teacherName { get; set; }
    }
}