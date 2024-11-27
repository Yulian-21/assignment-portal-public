import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import AssignmentForm from '../AssignmentForm';
import '@testing-library/jest-dom';
import { submitAssignment } from '../../../api/submitAssignment';
import { fetchCandidateLevels } from '../../../api/fetchCandidates';
import { useRouter } from 'next/navigation';

jest.mock('../../../api/submitAssignment');
jest.mock('../../../api/fetchCandidates');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('AssignmentForm Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (fetchCandidateLevels as jest.Mock).mockResolvedValue({
      levels: ['Junior', 'Middle', 'Senior'],
    });
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    
  });

  it('renders the form and loads candidate levels', async () => {
    render(<AssignmentForm />);

    expect(screen.getByText(/Assignment Submission Portal/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Junior')).toBeInTheDocument();
      expect(screen.getByText('Middle')).toBeInTheDocument();
      expect(screen.getByText('Senior')).toBeInTheDocument();
    });
  });

  it('shows validation errors if form fields are empty', async () => {
    render(<AssignmentForm />);
    fireEvent.click(screen.getByText(/Submit Assignment/i));
  
    expect(await screen.findByText(/Name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Assignment description must be at least 10 characters./i)).toBeInTheDocument();
    expect(await screen.findByText(/GitHub Repository URL is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please select a candidate level./i)).toBeInTheDocument();
  });
  

  it('submits the form with valid data', async () => {
    (submitAssignment as jest.Mock).mockResolvedValue({ ok: true });
    (fetchCandidateLevels as jest.Mock).mockResolvedValue({
      levels: ['Junior', 'Mid', 'Senior'],
    });

    await act(async () => {
      render(<AssignmentForm />);
    });;

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Assignment Description/i), {
      target: { value: 'Test description that greater than 10 characters' },
    });
    fireEvent.change(screen.getByLabelText(/GitHub Repository URL/i), {
      target: { value: 'https://github.com/Yulian-21/LabPy-8' },
    });
    fireEvent.change(screen.getByLabelText(/Candidate Level/i), {
      target: { value: 'Junior' },
    })

    fireEvent.click(screen.getByText(/Submit Assignment/i));

    await waitFor(() => {
      expect(submitAssignment).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        assignment_description: 'Test description that greater than 10 characters',
        github_repo_url: 'https://github.com/Yulian-21/LabPy-8',
        candidate_level: 'Junior',
      });
    });
      
  });

  it('redirects the form with valid data', async () => {
    (submitAssignment as jest.Mock).mockResolvedValue({ ok: true });
    (fetchCandidateLevels as jest.Mock).mockResolvedValue({
      levels: ['Junior', 'Mid', 'Senior'],
    });

    await act(async () => {
      render(<AssignmentForm />);
    });;

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Assignment Description/i), {
      target: { value: 'Test description that greater than 10 characters' },
    });
    fireEvent.change(screen.getByLabelText(/GitHub Repository URL/i), {
      target: { value: 'https://github.com/Yulian-21/LabPy-8' },
    });
    fireEvent.change(screen.getByLabelText(/Candidate Level/i), {
      target: { value: 'Junior' },
    })

    fireEvent.click(screen.getByText(/Submit Assignment/i));

    await waitFor(() => {expect(mockPush).toHaveBeenCalledWith('/thank-you'); });
  });
});
