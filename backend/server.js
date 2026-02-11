const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API endpoint to handle Valentine's responses
app.post('/api/response', (req, res) => {
    const { response } = req.body;
    console.log(`Received response: ${response}`);
    // In a real application, you might save this to a database
    res.json({ message: `Thank you for your ${response}!` });
});

// Serve static files from the React app (place after API routes)
app.use(express.static(path.join(__dirname, '../build')));

// All other GET requests not handled by the API or static files will return our React app
// This should be the very last route.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
