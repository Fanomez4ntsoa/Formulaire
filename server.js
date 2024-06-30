const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const users = [];

app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    users.push({ name, email });
    console.log(users);
    res.json({ message: 'User data received', users });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
