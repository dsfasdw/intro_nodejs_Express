const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Items array
const items = ['Apple', 'Banana', 'Orange'];

// GET /items - Fetch all items
app.get('/items', (req, res) => {
    res.json(items);
});

// POST /items - Add a new item
app.post('/items', (req, res) => {
    const newItem = req.body.item;
    items.push(newItem);
    res.json(items);
});

// GET /about - About page
app.get('/about', (req, res) => {
    res.send('About Us');
});

// POST /submit - Receive data
app.post('/submit', (req, res) => {
    const data = req.body;
    res.send(`Received: ${JSON.stringify(data)}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke');
});

// Serve static files from the "public" folder
app.use(express.static('public'));

// Define a route for the home page
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
