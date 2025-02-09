const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

const list = ['apple', 'banana', 'orange'];

app.use(express.static('public'));
app.use(express.json()); // Middleware for parsing JSON

// Logging middleware should be before route handlers
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Serve main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
   
});

// API endpoint to return list
app.get('/list', (req, res) => {
    res.json(list);
});

// About route
app.get('/about', (req, res) => {
    res.send('About Page');
});

// Handle form submission (Fixed: Added `req, res` to callback)
app.post('/submit', (req, res) => {
    const data = req.body; // Get JSON data from the request body
    res.send(`Received: ${JSON.stringify(data)}`);
});

// Global error handler (should be last)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something Broke!');
});

// Start server
app.listen(port, () => {
    console.log(`Server Running at http://localhost:${port}`);
});
