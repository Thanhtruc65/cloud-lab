# Câu 32: Khai báo Node.js Image làm Base Image
FROM node:18-alpine

# Câu 33: Thiết lập thư mục làm việc bên trong Container
WORKDIR /app

# Câu 34: Sao chép file cấu hình thư viện vào Container trước
COPY package*.json ./

# Câu 35: Cài đặt các thư viện phụ thuộc (dependencies)
RUN npm install

# Câu 36: Sao chép toàn bộ mã nguồn Backend vào Container
COPY . .

# Câu 37: Khai báo cổng 5000 mà Backend sử dụng
EXPOSE 5000

# Câu 38: Thiết lập lệnh khởi động server khi Container chạy
CMD ["npm", "start"]