import React, { Component } from 'react';

import { getTweet, sendSearchWord } from './utils/socket';
import { WORD_SEARCHED } from './utils/constantes';
import { Content, Tweet, SearchInput, SearchBtn } from './appStyled';

class App extends Component {
  state = {
    tweet: {},
    searchWord: WORD_SEARCHED,
  };
  componentDidMount() {
    this.searchTweets();
    getTweet(tweet => this.setState({ tweet }));
  }

  searchTweets = () => {
    sendSearchWord(this.state.searchWord);
  };

  searchWordInput = ({ target: { value: searchWord } }) => {
    this.setState({ searchWord });
  };

  onKeyDown = e => {
    const hasText = this.state.searchWord.length !== 0;
    const isEnterKeyDown = e.key === 'Enter';
    if (hasText && isEnterKeyDown) {
      this.searchTweets();
    }
  };

  render() {
    const {
      tweet: { text, sentiment },
      searchWord,
    } = this.state;
    return (
      <Content sentiment={sentiment}>
        <div>
          <SearchInput
            type="text"
            onChange={this.searchWordInput}
            value={searchWord}
            onKeyDown={this.onKeyDown}
          />
          <SearchBtn onClick={this.searchTweets}>
            <i className="fas fa-search" />
          </SearchBtn>
        </div>
        <Tweet>
          {text ? (
            text
          ) : (
            <div className="fa-3x">
              <i className="fas fa-spinner fa-spin" />
            </div>
          )}
        </Tweet>
      </Content>
    );
  }
}

export default App;
