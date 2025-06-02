import axios from "axios";

const BASE_URL = "http://localhost:1576/api/user";

// Save user to local storage
const saveUser = (userData) => {
  if (userData) {
    localStorage.setItem("user", JSON.stringify(userData));
  }
};

export const clearUser = () => {
  localStorage.removeItem("user");
};

// ✅ Register
export const createUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/register`, userData);
  saveUser(response.data);
  return response.data;
};

// ✅ Login
export const loginUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/login`, userData);
  saveUser(response.data);
  return response.data;
};




// logout

export const Logout = ()=>{

  localStorage.removeItem('user')
}

export const AllUsers = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`, 
    },
  };

  const response = await axios.get(`${BASE_URL}/Users`, config);
  return response.data; 
};
