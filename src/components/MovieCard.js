import React from 'react'
import LazyLoad from 'react-lazyload'
import Logo from '../illustration.svg'

export default function({ elem }) {
  const { title, genre, music, id } = elem
  return (
    <div className="cp-movie-card">
      <div className="cp-movie-card-overlay">
        <h2>{title}</h2>
        <p className="genre">{genre}</p>
        <p className="music">{music}</p>
      </div>
      <LazyLoad once placeholder={<img src={Logo} alt="React brand logo" />}>
        <img
          className="cp-movie-card-thumb"
          src={`${elem.image_src}?random=${id}`}
          alt={elem.title}
        />
      </LazyLoad>
    </div>
  )
}
