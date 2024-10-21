import axios from "axios";

const API_URL = "http://localhost:8080";

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
    });
  }

  async login(email, password) {
    try {
      const response = await this.api.post("/users/login", { email, password });
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async register(userData) {
    try {
      const response = await this.api.post("/users", userData);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllUsers() {
    try {
      const response = await this.api.get("/users");
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getUserById(id) {
    try {
      const response = await this.api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateUser(id, userData) {
    try {
      const response = await this.api.patch(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteUser(id) {
    try {
      const response = await this.api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  logout() {
    localStorage.removeItem("token");
  }

  handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Data:", error.response.data);
      console.error("Status:", error.response.status);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
    }
    throw error;
  }
}

export default new UserService();
