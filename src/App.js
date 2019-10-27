import React, { Component } from 'react';
import './App.css';

const URL = "https://www.reddit.com/r/Delightfullychubby.json?limit=100";
const THANKS = 'Thanks to the whole /r/Delightfullychubby community!';
const THANKS_TIMEOUT = 10000;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      thanks: ''
    };
  }

  componentDidMount() {
    fetch(URL).then(res => res.json())
      .then(posts => {
        this.addPostsToState(posts.data.children)
      })
    setTimeout(() => {
      this.setState({ thanks: THANKS });
    }, THANKS_TIMEOUT);
  }

  addPostsToState(newPosts) {
    let filtered = newPosts.filter(value => {
      return value.data.url.match(/\.(jpeg|jpg|png)$/) != null;
    });
    this.setState({ posts: this.state.posts.concat(filtered) });
  }

  composeIcon(thumbnail, imageLink, alt, index) {
    return (
      <a href={imageLink} target="_blank" key={index}>
        <img src={thumbnail} alt={alt} />
      </a>
    );
  }

  render() {
    return(
      <div>
        {
          this.state.posts.map((post, index) => {
            return this.composeIcon(post.data.thumbnail, post.data.url, post.data.title, index)
          })
        }
        <span id="footer">
          {this.state.thanks}
        </span>
      </div>
    );
  }
}

export default App;
