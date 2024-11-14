import api from './api';
import { API_ENDPOINTS } from '../config/constants';

export interface ProfileData {
  name: string;
  location?: string;
  bio?: string;
  skills?: Array<{
    id: number;
    proficiencyLevel: string;
    hourlyRate: number;
  }>;
}

export const userService = {
  async getProfile() {
    const response = await api.get(API_ENDPOINTS.USERS.PROFILE);
    return response.data;
  },

  async updateProfile(data: ProfileData) {
    const response = await api.put(API_ENDPOINTS.USERS.PROFILE, data);
    return response.data;
  },

  async getTransactions() {
    const response = await api.get(API_ENDPOINTS.USERS.TRANSACTIONS);
    return response.data;
  },
};