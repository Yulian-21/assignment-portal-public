import { ApiResponse } from "@/types/types";

export async function fetchCandidateLevels() {
    try {
      const response = await fetch('https://tools.qa.public.ale.ai/api/tools/candidates/levels');
      const data: ApiResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching candidate levels:', error);
      throw error;
    }
  }