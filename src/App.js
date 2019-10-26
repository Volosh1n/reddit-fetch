import React, { Component } from 'react';
import './App.css';

const URL = "https://www.reddit.com/r/Delightfullychubby.json?limit=30";
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

  composeImage(link) {
    return (
      <a href={link} target="_blank">
        <img src={link} alt={"image"} />
      </a>
    );
  }

  render() {
    return(
      <div>
        {this.state.posts.map(post => this.composeImage(post.data.url))}
        <span id="footer">
          {this.state.thanks}
        </span>
      </div>
    );
  }
}

export default App;
