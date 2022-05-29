namespace WebAPI.Models {
    public class SchoolClass {
        public SchoolClass() {
            this.num = "12";
            this.terms = new string[] { };
        }
        public string num { get; set; }
        public string[] terms { get; set; }
    }
}
