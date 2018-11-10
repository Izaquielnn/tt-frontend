import React, {Component} from 'react';

import twitterlogo from '../twitter.svg';
import './Timeline.css';

export default class Timeline extends Component {
    state = {
        newTweet: ''
    };

    handleNewTweet = e => {
        if (e.keyCode !== 13) return;
        const content = this.state.newTweet;
        const author = localStorage.getItem('@tt:username');
        
        console.log(content, author);
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
            </div>
        );
    }
}