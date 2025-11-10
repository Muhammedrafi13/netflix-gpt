import { BACKGROUND_IMAGE } from "../utils/constant"
import GptMovieSuggestions from "./GptMovieSuggestions"
import GptSearchBar from "./GptSearchBar"

const GptSearch = () => {
    return (
        <div>
            <div className="fixed -z-10">
                <img  className="h-screen object-cover md:w-screen" src={BACKGROUND_IMAGE} alt="background">
                </img>
            </div>
            <div>
                <GptSearchBar />
                <GptMovieSuggestions />
            </div>

        </div>
    )
}

export default GptSearch