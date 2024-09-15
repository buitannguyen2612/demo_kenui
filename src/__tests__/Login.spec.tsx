import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Login from "../pages/login/page"
import { toast } from "react-toastify"
import { authentActions, authenticationActions } from '../mobX/store';

afterEach(() => {
    cleanup()
})

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));


jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn()
    },
    Bounce: jest.fn(),
}))

jest.mock('../mobX/store', () => ({
    authenticationActions: {
        loginByAccount: jest.fn().mockImplementation((username: string, password: string) => {
            return username === 'nguyenyellow' && password === 'validpassword'
        }),
    },
}));

const conponentRender = () => {
    return render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>)
}

describe("Login component", () => {
    it('Component render with no crash', () => {
        conponentRender()
        const element = screen.getByTestId('login-container')
        expect(element).toBeInTheDocument()
    })

    it("Validation username input fail", () => {
        conponentRender()
        const usernameInput = screen.getByLabelText('Username:');
        fireEvent.change(usernameInput, { target: { value: 'nguyenS@' } });

        expect(screen.getByText("UserName must not contain in special character and uppercase letter")).toBeInTheDocument()
    })

    it("Validation password input fail", () => {
        conponentRender()
        const passwordInput = screen.getByTestId('passwordInput');
        fireEvent.change(passwordInput, { target: { value: 'nguyenS@@@@@@@@@@@@22' } });

        expect(screen.getByText("Password must contain in 2-10 character")).toBeInTheDocument()
    })

})