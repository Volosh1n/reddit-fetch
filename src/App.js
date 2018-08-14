import React, { Component } from 'react';
import './App.css';
import Fade from 'react-reveal/Fade';

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
        this.setState({ posts: posts.data.children });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let images = [];
    for (var index = 0; index < this.state.posts.length; index++) {
      var link = this.state.posts[index].data.url;
      if ((/.gifv/.test(link)) || (/v.redd.it/.test(link)) || (/imgur.com.a/.test(link)))
        continue;
      if (/imgur/.test(link))
        link += ".jpg";
      images.push (
        <Fade>
          <a href={link} target="_blank" key={'image' + index}>
            <Fade>
              <img src={link} alt={"image" + index} />
            </Fade>
          </a>
        </Fade>
      );
    }
    return <div>{images}</div>;
  }
}

export default App;
