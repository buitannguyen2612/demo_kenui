import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Register from '../pages/register/page';
import { register } from '../rest/api/authentication';
import { showToatify } from '../utils/toastify';

afterEach(() => {
    cleanup()
})

jest.mock('../rest/api/authentication')

jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn()
    },
    Bounce: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

jest.mock('../mobX/store', () => ({
    authenticationActions: {
        createAccount: jest.fn(),
    },
}));

jest.mock('../../images/sndRegisterbg.jpg', () => 'sndRegisterbg.jpg');

const renderComponent = () => {
    return render(
        <Router>
            <Register />
        </Router>
    );
};

describe('Register Component', () => {
    it('renders the Register component', () => {
        renderComponent();
        expect(screen.getByTestId('register-container')).toBeInTheDocument();
    });

    it('validates password length', () => {
        renderComponent();
        const passwordInput = screen.getByTestId('passwordInput');
        fireEvent.change(passwordInput, { target: { value: 'a' } });
        fireEvent.blur(passwordInput);
        expect(screen.getByText('Password must contain in 2-10 character')).toBeInTheDocument();
    });

    it('validates confirm password', () => {
        renderComponent();
        const passwordInput = screen.getByTestId('passwordInput');
        const confirmPasswordInput = screen.getByTestId('confirmPassword');

        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'different' } });
        fireEvent.blur(confirmPasswordInput);

        expect(screen.getByText('Confirm password must be same to current password')).toBeInTheDocument();
    });

    it('validates email format', () => {
        renderComponent();
        const emailInput = screen.getByLabelText('Email:');
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.blur(emailInput);
        expect(screen.getByText('Please enter a valid email.')).toBeInTheDocument();
    });

    it('submits the form with valid data', () => {
        renderComponent();

        // Fill in the username
        const usernameInput = screen.getByLabelText('Username:');
        fireEvent.change(usernameInput, { target: { value: 'nguyen' } });

        // Fill in the email
        const emailInput = screen.getByLabelText('Email:');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        // Fill in the password
        const passwordInput = screen.getByTestId('passwordInput');
        fireEvent.change(passwordInput, { target: { value: '26122001' } });

        // Fill in the confirm password
        const confirmPasswordInput = screen.getByTestId('confirmPassword');
        fireEvent.change(confirmPasswordInput, { target: { value: '26122001' } });

        // Click the submit button
        const submitButton = screen.getByRole('button', { name: /Sign Up/i }); //* Get the button that having "Sign Up" text in that
        fireEvent.click(submitButton);

        // Check if the form was submitted (you might need to adjust this based on your implementation)
        expect(register).toHaveBeenCalledWith({ email: "test@example.com", password: "26122001", role: "user", userName: "nguyen" })
    });


});
