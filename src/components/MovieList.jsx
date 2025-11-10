import MovieCard from './MovieCard';
import { useRef } from 'react'; // 👈 1. Import useRef

const MovieList = ({ title, movies }) => {
    
    const scrollRef = useRef(null);

    const handleClickScroll = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ 
                left: 500, 
                behavior: 'smooth' 
            });
        }
    };

    return (
        <div className="px-6 relative group"> 
            <h1 className="text-lg md:text-2xl py-4 text-white">{title}</h1>
            <div ref={scrollRef} className="flex overflow-x-scroll scrollbar-hide"> 
                <div className="flex">
                    {
                        movies?.map(movie => <MovieCard key={movie?.id} posterPath={movie?.poster_path} />)
                    }
                </div>
            </div>
           {movies && movies.length > 0 && (
                <div 
                    className="
                        absolute right-0 top-0 bottom-0 
                        flex items-center justify-end
                        pr-4 pl-6
                        bg-gradient-to-l from-black/80 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        cursor-pointer z-20 
                    "
                    onClick={handleClickScroll}
                >
                    <div className="text-white text-5xl transition-opacity"> 
                        &gt;
                    </div>
                </div>
            )}
        </div>
    )
}

export default MovieList