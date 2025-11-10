import { useDispatch, useSelector } from "react-redux"
import lan from "../utils/languageConstants";
import { useRef, useState } from "react";
import ai from "../utils/geminiai";
import { API_OPTIONS } from "../utils/constant";
import { addGptMovieResult, removeGptMovieResult } from "../utils/gptSlice";
import { decrementGptCount } from "../utils/userSlice";
import Spinner from "./Spinner";

const GptSearchBar = () => {
  const langKey = useSelector(store => store?.config?.lang);
  const [submit, setSubmit] = useState(false);
  const gptCount = useSelector(store => store?.user?.gptSearchCount);
  const [errorMessage, setErrorMessage] = useState("");
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`, API_OPTIONS);
    const json = await data.json();
    return json.results;
  }
  const handleGptSearchClick = async () => {
    setSubmit(true);
    if (gptCount <= 0) {
      setSubmit(false);
      dispatch(removeGptMovieResult());
      setErrorMessage("Your Gpt Search limit has been exhausted");
      return;
    }

    const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query"
      + searchText.current.value + ", only give me names of 5 movies, comma separated like the example result ahead. Example Result: Minnal Murali,Don,Ustad Hotel,Lokah,Turbo"

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: gptQuery,
      });
      const gptMovies = response?.text.split(",");
      const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie))
      const tmdbResults = await Promise.all(promiseArray);
      setErrorMessage("");
      dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }));
      dispatch(decrementGptCount());
      setSubmit(false);
    } catch (error) {
      const failed = error?.error?.message || "Something went wrong!";
      setErrorMessage(String(failed));
      setSubmit(false);
      return;
    }
  }

return (
        <>
            {submit && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <Spinner />
                </div>
            )}
            
            <div className="pt-[50%] md:pt-[10%] flex justify-center">
                <form className="w-[90%] md:w-1/2 bg-black grid grid-cols-12" onSubmit={((e) => e.preventDefault())}>
                    <input type="text" ref={searchText} className="p-4 m-4 bg-white col-span-9" placeholder={lan[langKey].searchPlaceHolder} />
                    <button 
                        className="py-2 m-2 my-3 md:m-4 bg-red-700 text-white rounded-lg col-span-3 disabled:opacity-70 disabled:cursor-not-allowed" 
                        disabled={submit} 
                        onClick={handleGptSearchClick}
                    >
                        {lan[langKey].search}
                    </button>
                </form>
            </div>
            
            {errorMessage && !submit && (
                <div className="p-20 mt-10  md:p-50 overflow-hidden text-center bg-black/70">
                    <p className="text-white mx-auto mt-3 text-md md:text-2xl ">{errorMessage}</p>
                </div>
            )}
        </>
    );
}

export default GptSearchBar