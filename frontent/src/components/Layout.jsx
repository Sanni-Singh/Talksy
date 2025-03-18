import { Outlet } from "react-router-dom"
import NavbarComponent from "./NavbarComponent"

const Layout = ()=>{
    return(
        <div className="w-[100%] relative">
            <NavbarComponent/>
                <Outlet/>
        </div>
    )
}
export default Layout