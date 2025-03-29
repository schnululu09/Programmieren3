const express = require("Express");
const app = express();

app.use(express.static("gol"));


app.get("/", function(req, res){
   res.send("Hello world");
});

app.get("/name/:name", function(req, res){
    const name = req.params.name;
    res.send("<h1>Hello " + name +"</h1>");
 });

app.get("/google", function(req, res){
    res.redirect('http://google.com')
});

app.get("/google/search/:value", function(req, res){
    const value = req.params.value
    res.redirect('https://www.google.com/search?q=' + value)
});


app.get("/project", function(req, res){
    res.redirect("index 2.html");
});

app.get("/*", function(req, res){
    res.redirect("/404");
});

app.use(function(req, res){
    res.status(404).send("<h1>Fehler, Webadresse nicht gefunden</h1>");
});


app.listen(3001, function(){
   console.log("Example is running on port 3001");
});
