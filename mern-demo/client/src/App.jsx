// mern-demo/client/src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

// !!! QUAN TRỌNG: Thay bằng URL Forwarded Port 5000 của bạn !!!
const API_URL = 'https://humble-robot-9754757994w9cxwp4-5000.app.github.dev/api/students';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Gọi API lấy danh sách sinh viên
  const fetchStudents = async () => {
    try {
      const res = await axios.get(API_URL);
      setStudents(res.data);
      setError('');
    } catch (error) {
      console.error('Lỗi tải danh sách:', error);
      setError('Không thể kết nối đến server backend.');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gửi dữ liệu tạo sinh viên mới
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post(API_URL, formData);
      setFormData({ studentId: '', name: '', email: '' }); // Xóa form
      fetchStudents(); // Tải lại danh sách
      alert('🎉 Thêm sinh viên thành công!');
    } catch (error) {
      alert('❌ Lỗi: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    // Container chính với nền xám nhạt
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        
        {/* Tiêu đề chính */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-800 tracking-tight">
            Hệ Thống Quản Lý Sinh Viên
          </h1>
          <p className="mt-3 text-lg text-gray-600">Trường Đại học Công nghệ Cloud-Lab</p>
        </div>

        {/* Bố cục 2 cột trên màn hình lớn */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* CỘT 1: FORM NHẬP LIỆU (Chiếm 1/3) */}
          <div className="md:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 sticky top-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Thêm Sinh Viên Mới
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Mã sinh viên (MSSV)</label>
                  <input
                    type="text"
                    name="studentId"
                    placeholder="VD: SV001"
                    value={formData.studentId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Họ và Tên</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="VD: Nguyễn Văn A"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email sinh viên</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="VD: vana@st.huflit.edu.vn"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center items-center gap-2 px-6 py-3 text-white font-bold rounded-lg transition duration-150 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'}`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang xử lý...
                    </>
                  ) : 'Thêm Vào Danh Sách'}
                </button>
              </form>
            </div>
          </div>

          {/* CỘT 2: DANH SÁCH HIỂN THỊ (Chiếm 2/3) */}
          <div className="md:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 01-9-4.333M16.444 12a4 4 0 11-5.714 5.714" />
                  </svg>
                  Danh Sách Sinh Viên Hiện Tại
                </h2>
                <span className="px-4 py-1 bg-blue-100 text-blue-800 text-sm font-bold rounded-full">
                  Tổng số: {students.length}
                </span>
              </div>

              {/* Hiển thị lỗi nếu có */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-lg mb-6 flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Bảng dữ liệu */}
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-left table-auto">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">MSSV</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Họ và Tên</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Email</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {students.length === 0 && !error ? (
                      <tr>
                        <td colSpan="3" className="px-6 py-16 text-center text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 012 2v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5a2 2 0 012-2m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                          </svg>
                          Chưa có dữ liệu sinh viên nào được thêm.
                        </td>
                      </tr>
                    ) : (
                      students.map((st, index) => (
                        <tr key={st._id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                          <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-blue-700 font-medium">{st.studentId}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{st.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{st.email}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <footer className="mt-20 text-center py-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">© 2024 Cloud-Lab Student Management. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;