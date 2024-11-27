import { FormData } from "@/types/types";

export async function submitAssignment(formData: FormData) {
    try {
      const response = await fetch('https://tools.qa.public.ale.ai/api/tools/candidates/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      return response;
    } catch (error) {
      console.error('Error submitting assignment:', error);
      throw error;
    }
  }