const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// 將 Express 應用包裝為無伺服器函數
module.exports = (req, res) => {
    app(req, res);
};
