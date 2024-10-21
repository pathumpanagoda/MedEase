import axios from "axios";

const API_URL = "http://localhost:8080/lab-reports";

class LabReportService {
  // Create a lab report
  async createLabReport(data) {
    try {
      const response = await axios.post(API_URL, data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  // Get all lab reports
  async getAllLabReports() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  // Get lab report by ID
  async getLabReportById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  // Update a lab report
  async updateLabReport(id, data) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  // Delete a lab report
  async deleteLabReport(id) {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}

export default new LabReportService();
