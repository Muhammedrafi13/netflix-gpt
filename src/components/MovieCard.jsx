import React from 'react'
import { CDN_IMAGE } from '../utils/constant'

const MovieCard = ({ posterPath }) => {


    return (
        <div className="w-48 pr-4">
            <img alt="poster" src={CDN_IMAGE + posterPath}></img>
        </div>
    )
}

export default MovieCard