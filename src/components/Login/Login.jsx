import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";




const Login = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef(null);
    
    const handleLogin = e => {
        e.preventDefault();
        // console.log('from submitting ');
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        // reset error and success
        setRegisterError('')
        setSuccess('')
        // add validation
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user
                console.log(user);
                if(result.user.emailVerified){
                    setSuccess('User logged in Successfully')
                }
                else{
                    alert('please check your email verify or access')
                }
            })
            .catch(error => {
                console.log(error);
                setRegisterError(error.message)
                
            })
    }
    const handleForgatPassword = () =>{
        const email = emailRef.current.value;
        if(!email){
            console.log('please provied an email',emailRef.current.value);
            return;
        }
        else if(!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email))
        {
            console.log('please write a valid email');
            return;
        }
        // sent validatio email 
        sendPasswordResetEmail(auth,email)
        .then(() =>{
            alert('please check your email');

        })
        .catch(error =>{
            console.log(error);
        })
       
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input 
                            type="email" 
                            ref={emailRef} placeholder="email" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a onClick={handleForgatPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    {
                    registerError && <p className="text-xl text-red-700">{registerError}</p>
                }
                {
                    success && <p className="text-green-500">{success}</p>
                }
                    <p>New this Website <Link to='/register'>please register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;