
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { todoActions } from '../mobX/store';
import HomePage from '../pages/homePage/page';

jest.mock('../mobX/store', () => ({
    todoActions: {
        todos: [],
        addTodo: jest.fn(),
        clearAllTodo: jest.fn(),
    },
}));

jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
    },
    Bounce: jest.fn(),
}));

describe('HomePage component', () => {
    // test case 1: should component render with not crash
    it('should render without crashing', () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );
        const inputElement = screen.getByPlaceholderText('Enter your todo');
        expect(inputElement).toBeInTheDocument();
    });

    it('should add a todo when the form is submitted with a non-empty input', () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );

        const inputElement = screen.getByPlaceholderText('Enter your todo');
        const addButton = screen.getByText('ADD');

        fireEvent.change(inputElement, { target: { value: 'New Todo' } });
        fireEvent.click(addButton);

        expect(todoActions.addTodo).toHaveBeenCalledWith('New Todo');
        expect(inputElement).toHaveValue('');
    });

    it('should show an error toast when the form is submitted with an empty input', () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );

        const addButton = screen.getByText('ADD');
        fireEvent.click(addButton);

        expect(toast.error).toHaveBeenCalledWith('🦄 Do not leave this empty!!', expect.any(Object));
    });

    it('should clear all todos when the clear button is clicked', () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );

        const inputElement = screen.getByPlaceholderText('Enter your todo')

        const clearButton = screen.getByText('CLEAR ALL');
        fireEvent.click(clearButton);

        expect(inputElement).toHaveValue('')
        expect(todoActions.todos).toHaveLength(0)
        expect(todoActions.clearAllTodo).toHaveBeenCalled();
    });
});
