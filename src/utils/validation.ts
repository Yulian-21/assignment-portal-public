import { FormData, FormErrors } from "@/types/types";

export function validateForm(formData: FormData): FormErrors {
    const errors: FormErrors = {};
  
    if (!formData.name) errors.name = 'Name is required.';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email is required.';
    if (formData.assignment_description.length < 10) errors.assignment_description = 'Assignment description must be at least 10 characters.';
    if (!formData.github_repo_url || !/^https?:\/\/github\.com\//.test(formData.github_repo_url)) errors.github_repo_url = 'Valid GitHub repository URL is required.';
    if (!formData.candidate_level) errors.candidate_level = 'Please select a candidate level.';
  
    return errors;
  }