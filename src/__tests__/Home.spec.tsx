
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import HomePage from '../pages/homePage/page';
import { postTodoElement } from '../rest/api/todoApi';

jest.mock('../mobX/store', () => ({
    todoActions: {
        todos: [],
        addTodo: jest.fn(),
        clearAllTodo: jest.fn(),
    },
}));

jest.mock('../rest/api/todoApi')

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

    it('Add todo successfully', () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );

        const inputElement = screen.getByPlaceholderText('Enter your todo');
        const addButton = screen.getByText('ADD');

        fireEvent.change(inputElement, { target: { value: 'New Todo' } });
        fireEvent.click(addButton);
        expect(postTodoElement).toHaveBeenCalledWith({
            name: 'New Todo',
            isComplete: false
        });
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

});
