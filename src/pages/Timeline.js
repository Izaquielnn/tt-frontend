import React, {Component} from 'react';
import socket from 'socket.io-client';
import api from '../services/api';

import Tweet from '../components/Tweet';

import twitterlogo from '../twitter.svg';
import './Timeline.css';

export default class Timeline extends Component {
    state = {
        tweets: [],
        newTweet: ''
    };

    async componentDidMount() {

        this.subscribeToEvents();
        const response = await api.get('/tweets');

        this.setState({ tweets: response.data });
    }

    subscribeToEvents = () => {
        const io = socket('http://localhost:3000');

        io.on('tweet', data => {
            this.setState({ tweets: [data, ...this.state.tweets]});
        });
        
        io.on('like', data => {
            this.setState({ tweets: this.state.tweets.map( tweet => 
                tweet._id === data._id ? data : tweet)});
        });
    }

    handleNewTweet = async e => {
        console.log(e.keyCode);
        if (e.keyCode !== 13) return;
        const content = this.state.newTweet;
        const author = localStorage.getItem('@tt:username');
        
        await api.post('tweets', { content, author});

        this.setState({newTweet: ''});
    }

    handleInputChange = e => {
        this.setState({ newTweet: e.target.value });
    };
    
    render() {
        return (
            <div className='timeline-wrapper'>
                <img heigth={24} src={twitterlogo} alt='tt' />
                <form>
                    <textarea
                        value={this.state.newTweet}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleNewTweet}
                        placeholder="O que esta acontecendo?"
                    />
                </form>
                <ul className='tweet-list'>
                    {this.state.tweets.map( tweet => <Tweet key={tweet._id} tweet={tweet} />)}
                </ul>
            </div>
        );
    }
}