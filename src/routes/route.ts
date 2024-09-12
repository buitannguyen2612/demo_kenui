import HomePage from "../pages/homePage/page"
import Login from "../pages/login/page"
import Register from "../pages/register/page"
import PrivateLayout from "../protectedLayout/PrivateLayout"
import PublicLayout from "../protectedLayout/PublicLayout"

// interface IICRoute{
//     path:string
//     component:ReactElement
//     layout:ReactElement
// }

export const routes = [
    {
        path: '/todo/homepage',
        component: HomePage,
        layout: PrivateLayout
    },
    {
        path: '/todo/login',
        component: Login,
        layout: PublicLayout
    },
    // {
    //     path: '/todo/grid',
    //     component: DataTable,
    //     layout: PrivateLayout
    // },
    {
        path: '/',
        component: Register,
        layout: PublicLayout
    },
    {
        path: '/todo/testparam/:slug',
        component: Register,
        layout: PublicLayout
    },

]