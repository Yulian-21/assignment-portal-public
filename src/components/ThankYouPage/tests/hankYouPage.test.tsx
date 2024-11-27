import { render, screen, fireEvent } from '@testing-library/react';
import ThankYouPage from '../ThankYouPage';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('ThankYouPage', () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });
  
  it('renders the Thank You message', () => {
    render(<ThankYouPage />);

    expect(screen.getByText(/Thank you for your submission!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Your assignment has been successfully submitted. We will review it shortly./i)
    ).toBeInTheDocument();
  });

  it('renders the Submit Another Assignment button', () => {
    render(<ThankYouPage />);
    const submitButton = screen.getByRole('button', { name: /Submit Another Assignment/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('calls router.push when the Submit Another Assignment button is clicked', () => {
    render(<ThankYouPage />);
    
    const submitButton = screen.getByRole('button', { name: /Submit Another Assignment/i });
    

    fireEvent.click(submitButton);
    

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
