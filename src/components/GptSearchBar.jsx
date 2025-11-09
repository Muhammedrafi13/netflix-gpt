import { useSelector } from "react-redux"
import lan from "../utils/languageConstants";

const GptSearchBar = () => {
  const langKey = useSelector(store=>store?.config?.lang);
  return (
    <div className="pt-[10%] flex justify-center">
        <form className="w-1/2 bg-black grid grid-cols-12">
            <input type="text" className="p-4 m-4 bg-white col-span-9" placeholder={lan[langKey].searchPlaceHolder} />
            <button className="py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3">{lan[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar