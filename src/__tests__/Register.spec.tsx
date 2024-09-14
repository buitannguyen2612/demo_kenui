import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { authenticationActions } from '../mobX/store';
import Register from '../pages/register/page';

afterEach(() => {
    cleanup()
})

jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn(),
    },
    ToastContainer: jest.fn(() => null),
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

const renderComponent = () => {
    return render(
        <Router>
            <ToastContainer />
            <Register />
        </Router>
    );
};


describe('Register Component', () => {
    it('renders the Register component', () => {
        renderComponent();
        expect(screen.getByTestId('register-container')).toBeInTheDocument();
    });

    it('Calling to store when register', () => {
        renderComponent();

        fireEvent.change(screen.getByLabelText('UserName'), { target: { value: 'newuser' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'newpassword' } });
        fireEvent.click(screen.getByTestId('btn_trigger'));
        expect(authenticationActions.createAccount).toHaveBeenCalledWith('testuser', 'password');
    });

    it('shows validation error for invalid username', () => {
        renderComponent();

        fireEvent.change(screen.getByLabelText('UserName'), { target: { value: 'Invalid@User' } });
        fireEvent.blur(screen.getByLabelText('UserName'));

        expect(screen.getByText('UserName must not contain in special character and uppercase letter')).toBeInTheDocument();
    });

    it('shows validation error for invalid password', () => {
        renderComponent();
        fireEvent.change(screen.getByTestId('passwordInput'), { target: { value: 'p' } });
        expect(screen.getByText('Password must contain in 2-10 character')).toBeInTheDocument();
    });

    it('shows validation error for invalid confirm password', () => {
        renderComponent();
        fireEvent.change(screen.getByTestId('passwordInput'), { target: { value: 'password1' } });
        fireEvent.change(screen.getByTestId('confirmPassword'), { target: { value: 'password' } });

        expect(screen.getByText('Confirm password must be same to current password')).toBeInTheDocument();
    });
});
