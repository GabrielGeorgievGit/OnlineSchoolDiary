namespace WebAPI.Models {
    public class GradeSubjectTeacherPair {
        public GradeSubjectTeacherPair() {
            this.subject = "";
            this.teacher = "";
            this.gst = new GradeSubjectTeacher();
        }
        public GradeSubjectTeacherPair(GradeSubjectTeacher gst, string s, string t) {
            this.subject = s;
            this.teacher = t;
            this.gst = gst;
        }
        public string subject { get; set; }
        public string teacher { get; set; }
        public GradeSubjectTeacher gst { get; set; }

    }
}
