import axios from "axios";

const API_URL = "http://localhost:8080/staff-appointments";

class StaffAppointmentService {
  // Create a staff appointment
  async createStaffAppointment(data) {
    try {
      const response = await axios.post(API_URL, data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  // Get all staff appointments
  async getAllStaffAppointments() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  // Get staff appointment by ID
  async getStaffAppointmentById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  // Update a staff appointment
  async updateStaffAppointment(id, data) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  // Delete a staff appointment
  async deleteStaffAppointment(id) {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}

export default new StaffAppointmentService();
