import { cleanup, render, screen } from '@testing-library/react';
import App from '../App';


afterEach(() => {
    cleanup()
})

jest.mock('../routes/route', () => ({
    routes: [
        {
            path: '/todo/homepage',
            component: (prop: any) => 'Homepage',
            layout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
        },
        {
            path: '/todo/login',
            component: (prop: any) => "Login",
            layout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
        },
        {
            path: '/todo/grid',
            component: (prop: any) => 'datatable',
            layout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
        },
        {
            path: '/',
            component: (prop: any) => 'register',
            layout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
        },
    ],
}));

jest.mock('./images/sndbackground.jpg', () => 'sndbackground.jpg')

describe('App component', () => {
    it('should render without crashing', () => {
        render(
            <App />
        );
        const container = screen.getByTestId('container');
        expect(container).toBeInTheDocument();
    });
});

