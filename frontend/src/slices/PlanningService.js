import axios from 'axios';

const API_URL = '/api/planning';

export const fetchPlannings = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createPlanning = async (planningData) => {
  const response = await axios.post(API_URL, planningData);
  return response.data;
};

export const updatePlanning = async (id, planningData) => {
  const response = await axios.put(`${API_URL}/${id}`, planningData);
  return response.data;
};

export const deletePlanning = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};