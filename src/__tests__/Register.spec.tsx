import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Register from "../pages/register/page";


// this callback will clean after each test case
afterEach(() => {
    cleanup()
})

// Mock the useContext hook to return a mock implementation of authentActions
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: () => ({
        listUser: [],
        createAccount: jest.fn(),
    }),
}));

describe('Register Component', () => {
    test('renders Register component', () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );
        expect(screen.getByText('Register')).toBeInTheDocument();
    });

    test('validates username, password, and email fields', () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText('UserName'), { target: { value: 'Invalid@User' } });
        fireEvent.blur(screen.getByLabelText('UserName'));
        expect(screen.getByText('UserName must not contain in special character and uppercase letter')).toBeInTheDocument();

        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'short' } });
        fireEvent.blur(screen.getByLabelText('Password'));
        expect(screen.getByText('Password must contain in 2-10 character')).toBeInTheDocument();

        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalidemail' } });
        fireEvent.blur(screen.getByLabelText('Email'));
        expect(screen.getByText('Please enter a valid email.')).toBeInTheDocument();
    });

    test('submits the form with valid data', () => {
        const mockCreateAccount = jest.fn();
        jest.spyOn(React, 'useContext').mockReturnValue({
            listUser: [],
            createAccount: mockCreateAccount,
        });

        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText('UserName'), { target: { value: 'ValidUser' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'validpass' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'valid@example.com' } });

        fireEvent.click(screen.getByTestId('btn_trigger'));

        expect(mockCreateAccount).toHaveBeenCalledWith('ValidUser', 'validpass');
        expect(screen.getByText('🦄 Register successful!!')).toBeInTheDocument();
    });
});