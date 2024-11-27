import { fetchCandidateLevels } from '../fetchCandidates';
import { ApiResponse } from "@/types/types";

global.fetch = jest.fn();

describe('fetchCandidateLevels', () => {
  it('should fetch candidate levels successfully', async () => {
    const mockData: ApiResponse = { levels: ['Junior', 'Mid', 'Senior'] };
    const response = { ok: true, json: jest.fn().mockResolvedValue(mockData) };

    (fetch as jest.Mock).mockResolvedValue(response);

    const result = await fetchCandidateLevels();

    expect(fetch).toHaveBeenCalledWith('https://tools.qa.public.ale.ai/api/tools/candidates/levels');
    
    expect(result).toEqual(mockData);
  });

  it('should throw an error if there is a network error', async () => {
    const networkError = new Error('Network Error');

    (fetch as jest.Mock).mockRejectedValue(networkError);

    try {
      await fetchCandidateLevels();
    } catch (error) {
      expect(error).toEqual(networkError);
    }
  });

  it('should throw an error if the response cannot be parsed as JSON', async () => {
    const response = { ok: true, json: jest.fn().mockRejectedValue(new Error('Invalid JSON')) };
  
    (fetch as jest.Mock).mockResolvedValue(response);
  
    try {
      await fetchCandidateLevels();
    } catch (error) {
      expect(error).toEqual(new Error('Invalid JSON'));
    }
  });
});
