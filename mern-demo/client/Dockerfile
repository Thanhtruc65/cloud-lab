# Câu 51: Base Image Node.js
FROM node:20-alpine

# Câu 52: Thiết lập thư mục làm việc bên trong Container
WORKDIR /app

# Câu 53: Sao chép package.json và package-lock.json
COPY package*.json ./

# Câu 54: Cài đặt dependencies và cài thêm gói 'serve' để chạy bản build
RUN npm install
RUN npm install -g serve

# Câu 55: Sao chép toàn bộ source code React vào Container
COPY . .

# Câu 56: Build ứng dụng React (tạo ra thư mục dist)
RUN npm run build

# Khai báo port 3000 phục vụ giao diện
EXPOSE 3000

# Khởi chạy web tĩnh từ thư mục dist vừa build (Câu 57)
CMD ["serve", "-s", "dist", "-l", "3000"]