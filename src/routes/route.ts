import HomePage from "../pages/homePage/page"
import Login from "../pages/login/page"
import Register from "../pages/register/page"
import PrivateLayout from "../protectedLayout/PrivateLayout"
import PublicLayout from "../protectedLayout/PublicLayout"
import TryingKendoUI from "../TryingKendoUI"

// interface IICRoute{
//     path:string
//     component:ReactElement
//     layout:ReactElement
// }

export const routes =  [
    {
        path:'/todo/homepage',
        component:HomePage,
        layout:PrivateLayout
    },
    {
        path:'/todo/login',
        component:Login,
        layout:PublicLayout
    },
    {
        path:'/',
        component:Register,
        layout:PublicLayout
    },
    {
        path:'/todo/testparam/:slug',
        component:Register,
        layout:PublicLayout
    },
    {
        path:'/todo/kenui',
        component:TryingKendoUI,
        layout:PublicLayout
    },
]