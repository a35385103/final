const express = require('express');
const path = require('path'); // 引入 path 模組來處理路徑
const app = express();
const PORT = 3000;

// 設定靜態檔案目錄，這樣 Express 會從 frontend 資料夾提供靜態檔案
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// 設定首頁路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
