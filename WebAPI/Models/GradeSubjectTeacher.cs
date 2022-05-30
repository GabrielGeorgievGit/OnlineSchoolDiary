namespace WebAPI.Models {
    public class GradeSubjectTeacher {

        public GradeSubjectTeacher() {
            this.idGrade = -50;
            this.idSubject = -50;
            this.idTeacher = -50;
        }
        public GradeSubjectTeacher(int idGrade, int idSubject, int idTeacher) {
            this.idGrade = idGrade;
            this.idSubject = idSubject;
            this.idTeacher = idTeacher;
        }
        public int idGrade { get; set; }
        public int idSubject { get; set; }
        public int idTeacher { get; set; }
    }
}
