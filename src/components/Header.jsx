import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGE } from "../utils/constant";
import { removeGptMovieResult, toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);
  const user = useSelector(store => store.user);
  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      navigate('/');
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ userId: uid, email: email, displayName: displayName, gptSearchCount: 2 }));
        navigate("/browse")
      } else {
        dispatch(removeUser());
        navigate('/')
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGptSearch = () => {
    dispatch(toggleGptSearchView());
    if (showGptSearch) {
      dispatch(removeGptMovieResult());
    }
  }

  const handleLanguage = (e) => {
    dispatch(changeLanguage(e.target.value))
  }

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="Logo" />
      {user && (
        <div className="flex p-2 justify-between">
          {showGptSearch && (
            <select className="p-2 m-2 bg-gray-900 text-white rounded-lg" onChange={handleLanguage} >
              {SUPPORTED_LANGUAGE.map(lang => (
                <option key={lang.key} value={lang.key}>{lang.name}</option>
              ))}
            </select>
          )}
          <button className="py-2 px-4 m-2 bg-purple-800 text-white rounded-lg"  onClick={handleGptSearch}> {showGptSearch ? "Home" : "GPT Search"}</button>
          <button className="font-bold bg-red-500 text-white py-2 px-4 m-2 rounded-lg " onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  )
}

export default Header;