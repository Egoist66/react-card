import { ReactNode } from "react"
import { Home } from "../pages"

type Routes = {
    path: string,
    component: ReactNode,
    exact?: boolean
}

export default  [
    {path: '/', component: <Home />},
    {path: '/about', component: <h1>About</h1>}
]  as Routes[]