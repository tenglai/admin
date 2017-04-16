import axios from 'axios'

// 使用代理
const HOST = '/api/'

export const API_TYPE = {
  movie: {
    in_theaters: 'in_theaters',
    coming_soon: 'coming_soon'
  }
}

export function fetch (url) {
  console.log(HOST + url)
  return new Promise((resolve, reject) => {
    axios.get(HOST + url)
      .then(response => {
        resolve(response.data)
      })
  })
}

export function fetchItemByType (type) {
  return fetch(`${type}`)
}

export function fetchMoviesByType (type, start = 0, count = 20) {
  return fetchItemByType(`movie/${type}?start=${start}&count=${count}`)
}

export function fetchMovieById (id) {
  return fetch(`movie/subject/${id}`)
}

export function fetchSearchMovies (query) {
  let url = encodeURI('/movie/search?q=' + query)
  return fetch(url)
}
