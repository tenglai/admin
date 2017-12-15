/**
 * 封装的网络请求接口
 */
// 引入 stream 模块
const stream = weex.requireModule('stream')
// 接口
// const baseURL = 'https://hacker-news.firebaseio.com/v0'
const baseURL = 'https://hacker-news.firebaseio.com/v0'

// 封装请求方法
export function fetch (path) {
  return new Promise((resolve, reject) => {
    stream.fetch({
      method: 'GET',
      url: `${baseURL}/${path}.json`,
      type: 'json'
    }, (response) => {
      if (response.status == 200) {
        resolve(response.data)
      }
      else {
        reject(response)
      }
    }, () => {})
  })
}

export function fetchIdsByType (type) {
  return fetch(`${type}stories`)
}

export function fetchItem (id) {
  return fetch(`item/${id}`)
}

export function fetchItems (ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchUser (id) {
  return fetch(`user/${id}`)
}
