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
        const element = screen.getByTestId('login-title')
        expect(element).toBeInTheDocument()
    })

    it('Login was fail with incorrect username and password', () => {
        conponentRender()
        const btnLogin = screen.getByTestId('btn-login')
        fireEvent.change(screen.getByLabelText('UserName'), { target: { value: "nguyenyellow" } })
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: "invalidpassword" } })
        fireEvent.click(btnLogin)
        expect(authenticationActions.loginByAccount).toHaveBeenCalledWith('nguyenyellow', 'invalidpassword')
        expect(toast.error).toHaveBeenCalledWith('🦄 Login fail!!', expect.any(Object));
    })

    it('Login success', () => {
        conponentRender()
        const btnLogin = screen.getByTestId('btn-login')
        fireEvent.change(screen.getByLabelText('UserName'), { target: { value: "nguyenyellow" } })
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: "validpassword" } })
        fireEvent.click(btnLogin)
        expect(authenticationActions.loginByAccount).toHaveBeenCalledWith('nguyenyellow', 'validpassword')
        expect(toast.success).toHaveBeenCalledWith('🦄 Login success!!', expect.any(Object));
    })
})