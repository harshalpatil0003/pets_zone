import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'

function Login() {

    const [email , setEmail ] = useState('')
    const [password , setPassword ] = useState('')

    const loginNow = async () => {
        const response = await axios.post(`http://localhost:5000/login` , {
            email : email,
            password : password
        })

        if(response.data.success){
            toast.success(response.data.message)

            localStorage.setItem('currentUser' , JSON.stringify(response.data.data))

            toast.loading('Redirecting to dashboard..')
            setTimeout(() =>{
                window.location.href='/'
            }, 3000)
        }
        else{
            toast.error(response.data.message)
        }
    }

    return (
        <div>
            <div className='bodyContainer'>
                <form className='formContainer'>
                    <h1 className='form-title'> Login</h1>

                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control input-box" id="exampleInputEmail1" aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control input-box" id="exampleInputPassword1" placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button type="button"
                        className="signUp-btn"
                        onClick={loginNow}
                    >Login</button>

                    <Link to='/signup' className=" alreadyAcc">Already Have an account ? <span className='login-text' > SignUp</span></Link>
                </form>
                <Toaster />

            </div><br /><br /><br />
        </div>
    )
}

export default Login
