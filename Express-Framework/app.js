const express = require("express");
const path = require("path");
const responseTime = require("./middleware/responseTime");

const usersRoute = require("./routes/users");
const blogRoute = require("./routes/blog");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(responseTime);

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/users", usersRoute);
app.use("/blog", blogRoute);

// Contact form routes
app.get("/contact", (req, res) => {
    res.render("contact");
});

app.post("/contact", (req, res) => {
    console.log(req.body);
    res.send("Form submitted successfully!");
});

// Gallery Route
app.get("/gallery", (req, res) => {
    const images = ["img1.jpg", "img2.jpg", "img3.jpg"];
    res.render("gallery", { images });
});

// 404 Page
app.use((req, res) => {
    res.status(404).render("404");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
