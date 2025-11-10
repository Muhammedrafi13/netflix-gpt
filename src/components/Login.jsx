import Header from './Header';
import { useState, useRef } from 'react';
import { checkValidData } from '../utils/validate';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword , updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BACKGROUND_IMAGE } from '../utils/constant';

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const dispatch = useDispatch();

    const isSignInForm = () => {
        setIsSignIn(!isSignIn);
    }
    const handleButtonClick = () => {
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);
        if (message) return;

        if (!isSignIn) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value,
                    }).then(() => {
                        const { uid, email, displayName } = auth.currentUser;
                        dispatch(addUser({ userId: uid, email: email, displayName: displayName, gptSearchCount:2 }));
                    }).catch((error) => {
                         setErrorMessage(error)
                    });

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage)
                    // ..
                });
        } else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage)
                });
        }

    }
    return (
        <div>
            <Header />
            <div className="absolute">
                <img className="h-screen object-cover md:w-screen" src={BACKGROUND_IMAGE} alt="background">
                </img>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-3/12 absolute p-12 my-26 mx-auto right-0 left-0 text-white rounded-lg bg-black/70">
                <h1 className="font-bold text-xl md:text-3xl py-4 mx-auto text-center"> {isSignIn ? "Sign In" : 'Sign Up'} </h1>
                {
                    !isSignIn && (
                        <input type="text" ref={name} placeholder="Full Name" className="bg-gray-700 p-4 my-4 w-full" />
                    )
                }
                <input ref={email} type="text" placeholder="Email Address" className="bg-gray-700 p-4 my-4 w-full" />
                <input ref={password} type="password" placeholder="Password" className="bg-gray-700 p-4 my-4 w-full" />
                <p className="text-red-500 text-lg text-bold">{errorMessage}</p>
                <button className="bg-red-700 p-4 my-6 w-full rounded-lg" onClick={handleButtonClick}>{isSignIn ? "Sign In" : 'Sign Up'}</button>
                <p className="py-4 cursor-pointe text-center" onClick={isSignInForm}> {isSignIn ? "New to Netflix? Sign Up Now" : 'Already Registered? Sign In Now'}  </p>
            </form>
        </div>
    )
}

export default Login