import React, { Component } from "react";
import Comment from '../Comment';
import faker from 'faker';
import GiphyAPI from '../../giphy';

class Chat extends Component {
    constructor(props){
        super(props);

        const firstComment = {
            name: faker.name.findName(),
            text: faker.hacker.phrase(),
            avatar: faker.image.avatar(),
            time: this.currentTime(),
            reduced: false
        }

        this.state = {
            commentInput: '',
            comments: [firstComment],
            currentName: 'Tyler Kung',
            currentAvatar: 'https://ca.slack-edge.com/TAJT28H7Y-UAK27T6DD-04f4ba9d1a7a-48',
            interval: undefined
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addComment = this.addComment.bind(this);
        this.commentTimer = this.commentTimer.bind(this);
        this.checkFunctions = this.checkFunctions.bind(this);
        this.currentTime = this.currentTime.bind(this);
    }

    currentTime(){
        var date = new Date();
        var h = date.getHours();
        var m = date.getMinutes();
        var timeSuffix = 'AM';
        if (h > 12){
            h -= 12;
            timeSuffix = 'PM';
        }
        var timeString = h + ":" + m + timeSuffix;
        return timeString;
    }

    componentDidMount(){
        var interval = setInterval(this.commentTimer, 10000);
        this.setState({interval})
    }

    componentWillUnmount(){
        clearInterval(this.state.interval);
    }

    handleFormSubmit(e){
        e.preventDefault();
        this.checkFunctions();
    }

    handleInputChange(e){
        this.setState({commentInput: e.target.value});
    }

    commentTimer(){
        let fakeComment = {
            name: faker.name.findName(),
            text: faker.hacker.phrase(),
            avatar: faker.image.avatar(),
            time: this.currentTime()
        }
        this.addComment(fakeComment);
    }

    checkFunctions = async () => {
        var isGiphy = false;
        if (this.state.commentInput === '/giphy'){
            isGiphy = true;
            const giphy = await GiphyAPI.random();
            this.setState({commentInput: giphy.data.image_url});
        }

        let comment = {
            name: this.state.currentName,
            text: this.state.commentInput,
            avatar: this.state.currentAvatar,
            time: this.currentTime(),
            giphy: isGiphy
        }
        this.addComment(comment);
        this.setState({commentInput: ''});
    }

    addComment(newComment){
        if (this.state.comments[this.state.comments.length-1].name === newComment.name){
            newComment.reduced = true;
        }
        const newArr = [newComment];
        this.setState(state => {
            const comments = state.comments.concat(newArr);

            return {
                comments
            }
        });
        var scrollDiv = document.getElementById('scrollComments');
        scrollDiv.scrollTop = scrollDiv.scrollHeight + 99999;
    }

    render() {

        return (
            <div className="comments-chat">
                <div className="comments-feed" id="scrollComments">
                    <div className="comments ui">
                        {this.state.comments.map(comment => (
                            <Comment reduced={comment.reduced} key={comment.name + '-' + faker.random.word()} name={comment.name}
                                text={comment.text}
                                avatar={comment.avatar}
                                time={comment.time}
                                giphy={comment.giphy} />
                        ))}
                    </div>
                </div>
                <form onSubmit={this.handleFormSubmit} style={{marginTop: '10px'}}>
                    <div className="ui fluid icon input">
                        <input type="text" placeholder=""
                            onChange={this.handleInputChange}
                            value={this.state.commentInput}
                            placeholder="Message #chat"/>
                    </div>
                </form>
            </div>
        );
    }
};

export default Chat;
