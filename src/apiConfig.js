import axios from 'axios';

// Tạo một instance cho server đầu tiên
const backend1 = axios.create({
  baseURL: 'https://bendshop.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tạo một instance cho server thứ hai (Flask)
const backend2 = axios.create({
  baseURL: 'https://chatbotndshop.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { backend1, backend2 };
