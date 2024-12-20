const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config(); // 用來讀取 .env 檔案

const app = express();
const PORT = 3000;

// 假設這是您用來儲存用戶資料的地方（可以是資料庫）
let users = [];

// 設定 Express 解析 JSON 請求
app.use(express.json());

// 註冊端點
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    // 檢查用戶是否已經存在
    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // 加密密碼
    const hashedPassword = await bcrypt.hash(password, 10);

    // 儲存用戶資料
    const newUser = { username, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
});

// 登入端點
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // 查找用戶
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // 驗證密碼
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 生成 JWT 令牌
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
});

// 設置首頁路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
