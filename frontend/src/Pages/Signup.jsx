import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { Link } from 'react-router-dom'

const Signup = () => {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: "",
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

        const res = await fetch("http://localhost:3000/signup",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })

        const data = await res.json()

        if(res.ok){
            alert("Signup successful")
            // navigate("/signin")
            setForm({
                name: "",
                email: "",
                password: "",
            })
        }else {
            // const signup = JSON.parse(jsonString)
            alert(data.message)
        }

        console.log(data)
    }


    return (
        <div className='relative h-screen '>
            <div className='absolute inset-0 m-auto w-100 h-80 bg-indigo-200 border-black shadow-xl/30 p-4 text-center rounded-4xl'>
                <h3 className='font-mono tracking-wide'>Signup</h3>
                <div className='form-container my-3'>
                    <form onSubmit={handleSubmit}>
                        <input 
                            name='name' 
                            placeholder='Enter the Name'  
                            value={form.name}
                            onChange={handleChange}
                        />
                        <input 
                            name='email' 
                            placeholder='Enter the Email'
                            value={form.email}
                            onChange={handleChange}
                        />
                        <input 
                            name='password' 
                            placeholder='Enter the Password'
                            value={form.password}
                            onChange={handleChange}
                        />
                        <button type='submit' className='w-25 bg-fuchsia-400 my-5 rounded-4xl tracking-widest px-1 py-1'>Signup</button>
                    </form>
                    <p>If you have already signup then click on <a href='/signin'>Login</a></p>
                </div>
            </div>
        </div>
    )
}

export default Signup