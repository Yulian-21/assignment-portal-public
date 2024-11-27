export interface FormData {
    name: string;
    email: string;
    assignment_description: string;
    github_repo_url: string;
    candidate_level: string;
  }
  
  export interface FormErrors {
    name?: string;
    email?: string;
    assignment_description?: string;
    github_repo_url?: string;
    candidate_level?: string;
  }
  
  export interface ApiResponse {
    levels?: string[];
    message?: string;
  }