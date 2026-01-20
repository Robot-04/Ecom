import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
    const { user, ready } = useAuth();

    if(!ready) return null;

    if(!user || user.role !== "admin") {
        return <Navigate to="/home" replace />;
    } 

    return children;
};
 
export default AdminRoute