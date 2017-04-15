import axios from 'axios'

// 使用代理
const HOST = '/api/'

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

export function fetchMoviesByType (type) {
  return fetchItemByType(`movie/${type}`)
}

export function fetchMovieById (id) {
  return fetch(`movie/subject/${id}`)
}

export function fetchSearchMovies (query) {
  let url = encodeURI('/movie/search?q=' + query)
  return fetch(url)
}
