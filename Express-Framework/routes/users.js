const express = require("express");
const router = express.Router();

const users = [
    { id: 1, name: "Aman" },
    { id: 2, name: "Ravi" },
    { id: 3, name: "Sita" },
    { id: 4, name: "Amanpreet" }
];

router.get("/", (req, res) => {
    const { name } = req.query;

    let filteredUsers = users;

    if (name) {
        filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    res.render("users", { users: filteredUsers });
});

module.exports = router;
