
var express = require("express");
var mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
mongoose.connect("mongodb://0.0.0.0:27017/formdata", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const contactSchema = {
    name: String,
    reason: String,
    email:String,
    phone:String,
    city:String,
    state:String,
    addressline:String

  };
  const Contact = mongoose.model("Contact", contactSchema);
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*",
      });
         
      // res.send("Hello World");
      return res.redirect("index.html");
});
app.post("/formFillUp", (req, res) => {
    
    const contact = new Contact({
         name  :req.body.name,
     reason : req.body.reason,
     email : req.body.email,
     phone : req.body.phone,
     city : req.body.city,
     state : req.body.state,
     addressline : req.body.addressline
    });
    contact.save(function (err) {
        if (err) {
            throw err;
        } else {
          console.log("saved");
        }
    });
  
    return res.redirect("formSubmitted.html");
  });
app.listen(port, () => {
console.log(`The application started
successfully on port ${port}`);
});
