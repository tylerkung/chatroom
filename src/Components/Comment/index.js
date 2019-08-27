import React, { Component } from "react";
import faker from 'faker';
import GiphyAPI from '../../giphy';

class Comment extends Component {
    constructor(props){
        super(props);

        this.state = {
        }
    }

    render() {
        let image;
        let authorDate;
        let text;
        let commentClass = 'comment reduced';
        if (!this.props.reduced){
            image = <img alt="avatar" src={this.props.avatar} />;
            authorDate = (
                <div>
                    <a className="author">{this.props.name}</a>
                    <div className="metadata">
                        <span className="date">{this.props.time}</span>
                    </div>
                </div>
            );
            commentClass = 'comment';
        }
        if (this.props.giphy){
            text = <img src={this.props.text} />;
        } else {
            text = this.props.text;
        }
        return (
            <div className={commentClass}>
                <a className="avatar">
                    {image}
                </a>
                <div className="content">
                    {authorDate}
                    <div className="text">
                        <p>{text}</p>
                    </div>
                </div>
            </div>
        );
    }
};

export default Comment;
