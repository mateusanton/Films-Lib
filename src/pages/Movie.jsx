import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
  BsFillCalendarEventFill
} from 'react-icons/bs'

import {BiCategory} from 'react-icons/bi'

import MovieCard from '../components/MovieCard'

import './Movie.css'

const moviesURL = import.meta.env.VITE_API
const apikey = import.meta.env.VITE_API_KEY
const genUrl = import.meta.env.VITE_GEN

const Movie = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [gen, setGen] = useState([])

  const getGen = async url => {
    const res = await fetch(url)
    const data = await res.json()

    setGen(data.results)
  }

  const getMovie = async url => {
    const res = await fetch(url)
    const data = await res.json()

    setMovie(data)
  }


  const formatCurrency = (number) => {
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  }

  useEffect(() => {
    const generUrl = `${genUrl}${apikey}&language=pt-BR`
    getGen(generUrl)
  }, [])

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?${apikey}&language=pt-BR`
    getMovie(movieUrl)
  }, [])



  return (
    <div className='movie-page'>
      {movie && 
      <>
        <MovieCard movie={movie} showLink={false} />
        <p className="tagline">{movie.tagline}</p>
        <div className="info">
          <h3>
            <BsWallet2 /> Orçamento:
          </h3>
          <p>{formatCurrency(movie.budget)}</p>
        </div>
        <div className="info">
          <h3>
            <BsGraphUp /> Receita:
          </h3>
          <p>{formatCurrency(movie.revenue)}</p>
        </div>
        <div className="info">
          <h3>
            <BsHourglassSplit /> Duração:
          </h3>
          <p>{movie.runtime} minutos</p>
        </div>
        <div className="info">
          <h3>
            <BiCategory /> Genêros:
          </h3>
          <p>{movie.genres.map(gene => `${gene.name} `)}</p>
        </div>
        <div className="info">
          <h3>
            <BsFillCalendarEventFill /> Data de Lançamento:
          </h3>
          <p>{movie.release_date}</p>
        </div>
        <div className="info description">
          <h3>
            <BsFillFileEarmarkTextFill /> Descrição:
          </h3>
          <p>{movie.overview}</p>
        </div>
      </>}
    </div>
  )
}

export default Movie
