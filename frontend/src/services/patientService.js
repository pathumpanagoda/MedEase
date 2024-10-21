import axios from "axios";

const API_URL = "http://localhost:8080/patients";

class PatientService {
  // Create a patient
  async createPatient(data) {
    try {
      const response = await axios.post(API_URL, data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  // Get all patients
  async getAllPatients() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  // Get patient by ID
  async getPatientById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  // Update a patient
  async updatePatient(id, data) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  // Delete a patient
  async deletePatient(id) {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}

export default new PatientService();
