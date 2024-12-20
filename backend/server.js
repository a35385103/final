const express = require('express');
const path = require('path');
const app = express();

// 設定靜態資源目錄為 frontend 資料夾
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// 設定首頁路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// 將 Express 應用包裝為無伺服器函數
module.exports = (req, res) => {
    app(req, res);
};
