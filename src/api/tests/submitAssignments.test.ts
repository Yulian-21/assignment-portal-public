import { submitAssignment } from '../submitAssignment';
import { FormData } from '@/types/types';

global.fetch = jest.fn();

describe('submitAssignment', () => {
  const mockFormData: FormData = {
    name: 'John Doe',
    email: 'john@example.com',
    assignment_description: 'Test assignment description',
    github_repo_url: 'https://github.com/user/repo',
    candidate_level: 'Junior',
  };

  it('should successfully submit assignment and return response', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ success: true }),
    };

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const response = await submitAssignment(mockFormData);

    expect(fetch).toHaveBeenCalledWith(
      'https://tools.qa.public.ale.ai/api/tools/candidates/assignments',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockFormData),
      })
    );
    
    expect(response).toEqual(mockResponse);
  });

  it('should throw error if fetch fails', async () => {
    const mockError = new Error('Network error');
    
    (global.fetch as jest.Mock).mockRejectedValue(mockError);

    await expect(submitAssignment(mockFormData)).rejects.toThrow('Network error');
  });

  it('should log error if fetch fails', async () => {
    const mockError = new Error('Network error');
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

    (global.fetch as jest.Mock).mockRejectedValue(mockError);

    try {
      await submitAssignment(mockFormData);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      expect(consoleErrorMock).toHaveBeenCalledWith('Error submitting assignment:', mockError);
    }

    consoleErrorMock.mockRestore();
  });
});
