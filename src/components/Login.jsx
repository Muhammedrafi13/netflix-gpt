import Header from './Header';
import { useState } from 'react';

const Login = () => {
    const [isSignIn,setIsSignIn] = useState(true);
    const isSignInForm = ()=>{
        setIsSignIn(!isSignIn);
    }
    return (
        <div>
            <Header />
            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/9c363af5-4750-4f14-87d1-8125f5276db0/web/IN-en-20251027-TRIFECTA-perspective_b68b1528-3a10-4997-9f99-48ccbdb86626_small.jpg" alt="logo">
                </img>
            </div>
            <form className="w-3/12 absolute p-12 my-26 mx-auto right-0 left-0 text-white rounded-lg bg-black/70">
            <h1 className="font-bold text-3xl py-4"> {isSignIn ? "Sign In" : 'Sign Up'} </h1>
                {
                    !isSignIn &&(
                        <input type="text" placeholder="Full Name" className="bg-gray-700 p-4 my-4 w-full" />
                    )
                }
                <input type="text" placeholder="Email Address" className="bg-gray-700 p-4 my-4 w-full" />
                <input type="text" placeholder="Password" className="bg-gray-700 p-4 my-4 w-full" />
                <button className="bg-red-700 p-4 my-6 w-full rounded-lg">{isSignIn ? "Sign In" : 'Sign Up'}</button>
                <p className="py-4 cursor-pointer" onClick={isSignInForm}> {isSignIn ? "New to Netflix? Sign Up Now" : 'Already Registered? Sign In Now'}  </p>
            </form>
        </div>
    )
}

export default Login