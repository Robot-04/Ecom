import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PopupBox from '../../Components/PopupBox'
import { OrbitProgress } from 'react-loading-indicators';
import { useAuth } from '../../context/AuthContext';

const Signin = () => {

    const navigate = useNavigate();

    const [popbox, setPopBox] = useState({
        show:false,
        message: "",
        type: ""
    });
    
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const { login } = useAuth();

    useEffect(() => {
        if(popbox.show) {
            const timer = setTimeout(() => {
                setPopBox({show: false, message: "", type: ""});
            }, 3000);
            return() => clearTimeout(timer);
        }
    }, [popbox.show]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(loading) return;

        try {
            setLoading(true);
            const res = await fetch("http://localhost:3000/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            })

            const data = await res.json()

            if(!res.ok) {
                throw new Error(data.message || "Signin Failed");
            }

            // localStorage.setItem("token", data.token);
            login(data.token, data.user);

            setPopBox({
                show: true,
                message: "Signin Successful",
                type: "success",
            });

            setTimeout(() => {
                if(data.user.role === "admin"){
                    navigate("/admin");
                }
                else {
                    navigate("/home");
                }
            }, 500);
            
        } catch(error){
            const message =
                error.message === "Failed to fetch"
                    ? "Server not reachable. Try again later."
                    : error.message;
            setPopBox({
                show: true,
                message,
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='relative h-screen text-center'>
            {popbox.show && (
                <PopupBox
                    message={popbox.message}
                    type={popbox.type}
                    onClose={() => setPopBox({ show: false, message: "", type: "" })}
                />
            )}

            <div className='absolute inset-0 m-auto w-100 h-80 bg-indigo-200 border-black shadow-xl/30 p-4 rounded-4xl'>
                <h3 className='font-mono tracking-wide'>Signin</h3>
                <div className='form-container my-3'>
                    <form onSubmit={handleSubmit} className={`flex-col ${loading ? "opacity-70 pointer-events-none" : ""}`}>
                        <input 
                            name='email'
                            placeholder='Enter the registered email'
                            value={form.email}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <input
                            type='password'
                            name='password'
                            placeholder='Enter the password'
                            value={form.password}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <button
                            type='submit'
                            disabled={loading}
                            className={`w-60 mt-4 mx-auto rounded-4xl px-3 py-2 flex items-center justify-center gap-3 font-mono tracking-widest transition-all duration-300
                                ${loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-fuchsia-500 hover:scale-110 hover:bg-fuchsia-600 hover:text-white"
                                }
                            `}
                        >
                            {loading ? (
                                <>
                                <OrbitProgress color="white" size="small" />
                                Signing in...
                                </>
                            ) : (
                                "Signin"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signin