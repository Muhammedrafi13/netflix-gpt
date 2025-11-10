

const VideoTitle = ({ title, overview }) => {
    return (
        <div className="mt-[3%] md:mt-0 pt-[20%] px-6 md:px-12 absolute text-white bg-gradient-to-r from-black w-full aspect-video">
            <h1 className="font-bold text-xl md:text-6xl">{title}</h1>
            <p className="hidden md:inline-block py-6 text-lg w-2/4">{overview}</p>
            <div>
                <button className="mt-3 md:mt-0 bg-white text-black p-2 md:p-4 px-4 md:px-12 text-lg md:text-xl rounded-lg hover:bg-white/80">Play</button>
                <button className="hidden md:inline-block mx-2 bg-gray-500/50 text-white p-4 px-12 text-xl rounded-lg hover:bg-gray-500/90">More Info</button>
            </div>

        </div>
    )
}

export default VideoTitle