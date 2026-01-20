import React, { useState } from 'react'
import PopupBox from '../../Components/PopupBox'
import { useEffect } from 'react';
import { OrbitProgress } from 'react-loading-indicators';
// import { Link } from 'react-router-dom'

const Signup = () => {
    const [popbox, setPopBox] = useState({
        show:false,
        message: "",
        type: "",
    });

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    useEffect(() => {
        if(popbox.show) {
            const timer = setTimeout(() => {
                setPopBox({ show: false, message: "", type:"" });
            }, 3000);

            return () => clearTimeout(timer)
        }
    }, [popbox.show]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(loading) return;

        try {
            setLoading(true);
            const res = await fetch("http://localhost:3000/signup",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.message || "Signup Failed")
            }

            setPopBox({
                show: true,
                message: "Signup Successful",
                type: "success",
            });

            setForm({
                name: "",
                email: "",
                password: "",
            });
        }catch(error) {
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
        // console.log(data)
    };


    return (
        <div className='relative h-screen '>
            {popbox.show && (
                <PopupBox
                    message={popbox.message}
                    type={popbox.type}
                    onClose={() => setPopBox({ show: false, message: "", type: "" })}
                />
            )}
            
            <div className='absolute inset-0 m-auto w-100 h-80 bg-indigo-200 border-black shadow-xl/30 p-4 text-center rounded-4xl'>
                <h3 className='font-mono tracking-wide'>Signup</h3>
                <div className='form-container my-3'>
                    <form onSubmit={handleSubmit} className={loading ? "opacity-70 pointer-events-none" : ""}>
                        <input
                            disabled={loading}
                            type='text'
                            name='name' 
                            placeholder='Enter the Name'  
                            value={form.name}
                            onChange={handleChange}
                        />
                        <input 
                            disabled={loading}
                            type='email'
                            name='email' 
                            placeholder='Enter the Email'
                            value={form.email}
                            onChange={handleChange}
                        />
                        <input 
                            disabled={loading}
                            type='password'
                            name='password' 
                            placeholder='Enter the Password'
                            value={form.password}
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className={`
                                w-60 my-5 mx-auto rounded-4xl px-3 py-2 
                                flex items-center justify-center gap-3
                                font-mono tracking-widest
                                transition-all duration-300
                                ${
                                loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-fuchsia-400 hover:scale-110 hover:bg-fuchsia-600 hover:text-white cursor-pointer"
                                }
                            `}
                            >
                            {loading ? (
                                <>
                                <OrbitProgress color="white" size="small" />
                                <span>Signing up...</span>
                                </>
                            ) : (
                                "Signup"
                            )}
                        </button>
                    </form>
                </div>
                <p 
                    className={`${
                                loading
                                    ? "hidden"
                                    : ""
                                }
                            `}
                >If you have already signup then click on. 
                    <a href='/signin'> Login</a>
                </p>
            </div>
        </div>
    )
};

export default Signup;