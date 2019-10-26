import React, { Component } from 'react';
import './App.css';

const URL = "https://www.reddit.com/r/Delightfullychubby.json?limit=50"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch(URL).then(res => res.json())
      .then(posts => {
        this.addToStatePosts(posts.data.children)
      })
  }

  addToStatePosts(newPosts) {
    let filtered = newPosts.filter(value => {
      return value.data.url.match(/\.(jpeg|jpg|png)$/) != null;
    });
    this.setState({ posts: this.state.posts.concat(filtered) });
  }

  renderImage(link) {
    return (
      <a href={link} target="_blank">
        <img src={link} alt={"image"} />
      </a>
    );
  }

  render() {
    return(
      <div>{this.state.posts.map(post => this.renderImage(post.data.url))}</div>
    );
  }
}

export default App;
