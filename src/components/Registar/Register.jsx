import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
    const [registerError, setRegisterError] = useState('')
    const [success, setSuccess] = useState()
    const [showPassword, setShowPassword] = useState()
    const handleRegister = e => {
        e.preventDefault();
        console.log('form submitting')
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(email, password,accepted,name);
        // reset error and success
        setRegisterError('')
        setSuccess('')

        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters')
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your Password at list one character to upper case')
            return;
        }
        else if (!/[0-9]/.test(password)) {
            setRegisterError('Your password at list one number ')
            return;
        }
        else if(!accepted){
            setRegisterError('please accepted terms condition ')
            return;
        }

        // create register 
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user
                console.log(user);
                setSuccess('User Created Successfully')

                // send validation email 
                sendEmailVerification(result.user)
                .then( () =>{
                    alert('please check your email and verify your account')
                })
            })
            .catch(error => {
                console.log('error', error);
                setRegisterError(error.message)
            })
    } 
    return (
        <div className="">
            <div className="mx-auto md:w-1/2">
                <h2 className="text-3xl mb-5 text-center">Please Register</h2>
                <form onSubmit={handleRegister}>
                    <input className="border-solid border-2 border-indigo-600 mb-2 w-full px-2 py-2" type="text" name="name" placeholder="Your Name" required />
                    <br />
                    <input className="border-solid border-2 border-indigo-600 mb-2 w-full px-2 py-2" type="email" name="email" placeholder="Email" required />
                    <br />
                   <div className="relative">
                   <input className="border-solid border-2 border-indigo-600 w-full px-2 py-2"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        required />
                    <span className="absolute top-3 right-2" onClick={() => setShowPassword(!showPassword)}>
                        { 
                        showPassword ?  <FaEye></FaEye> :<FaEyeSlash></FaEyeSlash>
                        }
                    </span>
                   </div>
                    <br />
                    <div>
                        <input type="checkbox" name="terms" id="" />
                        <label className="ml-2" htmlFor="terms">Accept Our <a href="">Terms And Condition</a></label>
                    </div>
                    <br />
                    <input className="border-solid border-2 border-indigo-600 mt-2 btn btn-secondary w-full" type="submit" value="Register" />
                </form>
                {
                    registerError && <p className="text-xl text-red-700">{registerError}</p>
                }
                {
                    success && <p className="text-green-500">{success}</p>
                }
                <p>Already have a account ? please <Link to='/login'>Login</Link></p>
            </div>
        </div>
    );
};

export default Register;