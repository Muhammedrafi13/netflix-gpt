import React from 'react'
import { CDN_IMAGE } from '../utils/constant'

const MovieCard = ({ posterPath }) => {
   if(!posterPath) return null;

    return (
        <div className="w-36 md:w-48 pr-4">
            <img alt="poster" src={CDN_IMAGE + posterPath}></img>
        </div>
    )
}

export default MovieCard