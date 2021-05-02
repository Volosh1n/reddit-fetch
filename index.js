document.addEventListener('DOMContentLoaded', function() {
  const baseURL = 'https://www.reddit.com/r/'
  const search = location.search.substr(1, location.search.length)
  const desiredSubreddit = search.substr(1, search.length)
  const subreddit = desiredSubreddit.length == 0 ? 'Delightfullychubby' : desiredSubreddit
  const URL = baseURL.concat(subreddit).concat('.json?limit=100')
  const container = document.querySelector('#container')

  fetch(URL)
    .then(res => res.json())
    .then(posts => renderPosts(posts.data.children))

  function renderPosts(posts) {
    const filteredPosts = posts.filter(post => post.data.url.match(/\.(jpeg|jpg|png)$/) != null)

    filteredPosts.map((post, index) => {
      const postLink = document.createElement('a')
      const postImage = document.createElement('img')

      postLink.setAttribute('href', post.data.url)
      postLink.setAttribute('_target', 'blank')
      postLink.setAttribute('key', index)

      postImage.setAttribute('src', post.data.thumbnail)
      postImage.setAttribute('alt', post.data.url)

      postLink.appendChild(postImage)
      container.appendChild(postLink)
    })
  }
})
