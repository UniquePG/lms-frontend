import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth( { allowedRoles }) {

    const { isLoggedIn, role } = useSelector((state)=> state.auth);
    const location = useLocation();

    // console.log("require auth",typeof(isLoggedIn),isLoggedIn, role);
    // console.log("require AllowedRoles", typeof allowedRoles[0], allowedRoles[0]);


    return isLoggedIn && allowedRoles.find((myrole)=> myrole === role) ? (
        <Outlet />
    ) : isLoggedIn ? 
        ( <Navigate to="/denied" state={{ from: location }} replace />) : 
        ( <Navigate to="/login" state={{ from: location }} replace />)

}

export default RequireAuth;