import { ReactElement } from "react"
import HomePage from "../pages/homePage/page"
import Login from "../pages/login/page"
import PublicLayout from "../protectedLayout/PublicLayout"
import PrivateLayout from "../protectedLayout/PrivateLayout"
import Register from "../pages/register/page"
import { todoActions } from "../mobX/store"

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
        path:'/todo/register',
        component:Register,
        layout:PublicLayout
    },
    {
        path:'/todo/testparam/:slug',
        component:Register,
        layout:PublicLayout
    },
]