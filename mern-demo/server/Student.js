require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 1. Kết nối MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cloud_lab';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Đã kết nối MongoDB Atlas thành công!'))
  .catch(err => console.error('Lỗi kết nối MongoDB:', err.message));

// 2. Schema & Model Student (chỉ định rõ collection 'students')
const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true }
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema, 'students');

// Câu 45: API /api/hello để kiểm tra hoạt động cơ bản
app.get('/api/hello', (req, res) => {
  res.status(200).json({ message: 'Hello from Docker Backend!' });
});

// Câu 46: GET /api/students - Lấy danh sách sinh viên từ MongoDB
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// POST /api/students - Thêm sinh viên mới
app.post('/api/students', async (req, res) => {
  try {
    const { studentId, name, email } = req.body;
    const newStudent = await Student.create({ studentId, name, email });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: 'Không thể tạo sinh viên', error: error.message });
  }
});

// PUT /api/students/:id - Cập nhật sinh viên
app.put('/api/students/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStudent) return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi cập nhật', error: error.message });
  }
});

// DELETE /api/students/:id - Xóa sinh viên
app.delete('/api/students/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
    res.status(200).json({ message: 'Đã xóa sinh viên thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa', error: error.message });
  }
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server đang chạy trên port ${PORT}`));