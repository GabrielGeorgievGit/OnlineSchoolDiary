namespace WebAPI.Models {
    public class Subject {

        public Subject() {
            this.id = -50;
            this.name = "";
        }
        public Subject(int id, string name) {
            this.id = id;
            this.name = name;
        }
        public int id { get; set; }
        public string name { get; set; }
    }
}
