import { useSelector } from 'react-redux'
import VideoBackground from './VideoBackground'
import VideoTitle from './VideoTitle'

const MainContaniner = () => {
    const movies = useSelector(store => store.movies?.nowPlayingMovies);
    if (!movies) return;
    const { title, overview,id } = movies[0]


    return (
        <div className="pt-[44%] bg-black md:pt-0">
            <VideoTitle title={title} overview={overview} />
            <VideoBackground movieId={id} />
        </div>
    )
}

export default MainContaniner