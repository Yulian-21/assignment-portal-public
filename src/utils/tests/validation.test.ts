import { validateForm } from '../validation';

const FORM_DATA = {
    name: 'John Doe',
    email: 'john@example.com',
    assignment_description: 'Valid description for the assignment',
    github_repo_url: 'https://github.com/Yulian-21/LabPy-8',
    candidate_level: 'Junior',
  };

describe('validateForm', () => {
    it('should return an error for empty name', () => {
        const errors = validateForm({...FORM_DATA, name: ''});
  
        expect(errors.name).toBe('Name is required.');
    });
  
    it('should return an error for empty email', () => {
        const errors = validateForm({...FORM_DATA, email: ''});
  
        expect(errors.email).toBe('Valid email is required.');
    });
  
    it('should return an error for invalid email format', () => {
        const errors = validateForm({...FORM_DATA, email: 'INVALID-MAIL'});
  
        expect(errors.email).toBe('Valid email is required.');
    });
  
    it('should return an error for assignment description too short', () => {
        const errors = validateForm({...FORM_DATA, assignment_description: 'short'});
  
        expect(errors.assignment_description).toBe('Assignment description must be at least 10 characters.');
    });
  
    it('should return an error for invalid GitHub URL', () => {
        const errors = validateForm({...FORM_DATA, github_repo_url: 'invalid-url'});
  
        expect(errors.github_repo_url).toBe('Valid GitHub repository URL is required.');
    });
  
    it('should return an error for empty GitHub URL', () => {
        const errors = validateForm({...FORM_DATA, github_repo_url: ''});
  
        expect(errors.github_repo_url).toBe('Valid GitHub repository URL is required.');
    });
  
    it('should return an error for empty candidate level', () => {
        const errors = validateForm({...FORM_DATA, candidate_level: ''});
  
        expect(errors.candidate_level).toBe('Please select a candidate level.');
    });
  
    it('should return an empty errors object if all fields are valid', () => {
        const errors = validateForm(FORM_DATA);
  
        expect(errors).toEqual({});
    });
  });