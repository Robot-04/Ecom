import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signin = () => {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await fetch("http://localhost:3000/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })

        const { data } = await res.json()

        if(res.ok) {
            localStorage.setItem("token", data.token)
            alert("Signin Successful")
            navigate("/home")
        }else {
            alert(data.manager)
        }


    }

    return (
        <div className='relative h-screen text-center'>
            <div className='absolute inset-0 m-auto w-100 h-80 bg-indigo-200 border-black shadow-xl/30 p-4 rounded-4xl'>
                <h3 className='font-mono tracking-wide'>Signin</h3>
                <div className='form-container my-3'>
                    <form onSubmit={handleSubmit} className='flex-col'>
                        <input 
                            name='email'
                            placeholder='Enter the registered email'
                            value={form.email}
                            onChange={handleChange}
                        />
                        <input
                            type='password'
                            name='password'
                            placeholder='Enter the password'
                            value={form.password}
                            onChange={handleChange}
                        />
                        <button type='submit' className='w-25 bg-fuchsia-500 rounded-4xl tracking-widest p-1 mt-4' 
                        >Singin</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signin