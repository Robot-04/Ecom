import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';

const Home = () => {

  const navigate = useNavigate()
  const { user, logout } = useAuth();

  // console.log(user?.name);

  useEffect(() => {
    if(!user){
      navigate("/signin")
    }
  }, [user, navigate])

  const handleLogout = () => {
    logout();
    navigate("/signin")
  }
  
  if (!user) return null;

  return (
    <div>
      <h1>Welcome {user.name} 👋</h1>
      <p>{user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
 
export default Home