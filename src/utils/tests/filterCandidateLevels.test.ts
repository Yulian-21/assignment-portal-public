import { filterCandidateLevels } from '../filterCandidateLevels';
import { ApiResponse } from "@/types/types";

describe('filterCandidateLevels', () => {
  it('should filter out only Junior, Middle, and Senior levels', () => {
    const response: ApiResponse = {
      levels: ['Junior', 'Intern', 'Middle', 'Senior', 'Lead']
    };
    
    const filteredResponse = filterCandidateLevels(response);

    expect(filteredResponse.levels).toEqual(['Junior', 'Middle', 'Senior']);
  });

  it('should return an empty array if no valid levels are present', () => {
    const response: ApiResponse = {
      levels: ['Intern', 'Lead', 'Manager']
    };

    const filteredResponse = filterCandidateLevels(response);

    expect(filteredResponse.levels).toEqual([]);
  });

  it('should return an empty array if levels is an empty array', () => {
    const response: ApiResponse = {
      levels: []
    };

    const filteredResponse = filterCandidateLevels(response);

    expect(filteredResponse.levels).toEqual([]);
  });

  it('should return the same array if only valid levels are present', () => {
    const response: ApiResponse = {
      levels: ['Junior', 'Middle', 'Senior']
    };

    const filteredResponse = filterCandidateLevels(response);

    expect(filteredResponse.levels).toEqual(['Junior', 'Middle', 'Senior']);
  });
});
