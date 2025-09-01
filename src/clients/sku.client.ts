import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function listSku() {
  try {
    const response = await axios.get(`${API_URL}/sku`);
    return response.data;
  } catch (error) {
    console.error("Error fetching list sku:", error);
  }
}

export async function findById(id: string) {
  try {
    const response = await axios.get(`${API_URL}/sku/id/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching list sku:", error);
  }
}

export async function updateStatus(id: string, status: string) {
  try {
    const response = await axios.put(`${API_URL}/sku/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error("Error update status SKU:", error);
  }
}

export async function createSku(skuData: {
  description: string;
  commercialDescription: string;
  sku: string;
}) {
  try {
    const response = await axios.post(`${API_URL}/sku`, skuData);
    return response.data;
  } catch (error) {
    console.error("Error creating sku:", error);
  }
}

export async function updateSku(
  id: string,
  skuData: {
    description: string;
    commercialDescription: string;
    sku: string;
  }
) {
  try {
    const response = await axios.put(`${API_URL}/sku/${id}`, skuData);
    return response.data;
  } catch (error) {
    console.error("Error updating sku:", error);
  }
}

export async function searchBySku(sku: string) {
  try {
    const response = await axios.get(`${API_URL}/sku/${sku}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching by sku:", error);
  }
}
