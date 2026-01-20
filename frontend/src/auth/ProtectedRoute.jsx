import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    // console.log(children)
    const { token, ready } = useAuth();
    
    if(!ready) return null;

    // console.log(token)
    if(!token) return <Navigate to="/signin" replace />;

    return children;
};

export default ProtectedRoute;