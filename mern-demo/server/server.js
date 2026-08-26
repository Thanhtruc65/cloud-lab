require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Đã kết nối MongoDB Atlas thành công!');
  })
  .catch((err) => {
    console.error('❌ Lỗi kết nối MongoDB Atlas:', err);
  });

// Route kiểm tra hoạt động
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Backend đang hoạt động thành công!' });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
app.get('/', (req, res) => {
  res.send('Server và MongoDB Atlas đang hoạt động bình thường!');
});