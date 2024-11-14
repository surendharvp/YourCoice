import api from './api';
import { API_ENDPOINTS } from '../config/constants';

export interface RequestData {
  title: string;
  description: string;
  estimatedHours: number;
  category: string;
  skillId: number;
  remotePossible: boolean;
  budgetRangeMin?: number;
  budgetRangeMax?: number;
}

export const requestService = {
  async getAllRequests() {
    const response = await api.get(API_ENDPOINTS.REQUESTS.BASE);
    return response.data;
  },

  async getRequestById(id: string) {
    const response = await api.get(API_ENDPOINTS.REQUESTS.DETAIL(id));
    return response.data;
  },

  async createRequest(data: RequestData) {
    const response = await api.post(API_ENDPOINTS.REQUESTS.BASE, data);
    return response.data;
  },

  async submitBid(requestId: string, bidData: any) {
    const response = await api.post(API_ENDPOINTS.REQUESTS.BIDS(requestId), bidData);
    return response.data;
  },

  async updateRequest(id: string, data: Partial<RequestData>) {
    const response = await api.put(API_ENDPOINTS.REQUESTS.DETAIL(id), data);
    return response.data;
  },

  async deleteRequest(id: string) {
    await api.delete(API_ENDPOINTS.REQUESTS.DETAIL(id));
  },
};