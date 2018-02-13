import {Meteor} from 'meteor/meteor';
import React from 'react';
import Clipboard from 'clipboard';  
import {setTimeout} from 'timers';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class LinksListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {justCopied: false}
    };
    componentDidMount(){
        this.clipboard = new Clipboard(this.refs.copy);
        this.clipboard.on('success', ()=>{this.setState({justCopied: true}); 
            setTimeout(()=>this.setState({justCopied: false}), 1000)
            }).on('error', ()=>{alert('Something went wrong, please copy the link manually')})
    }
    componentWillUnmount(){
        this.clipboard.destroy();
    }
    renderStats(){
        const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
        let visitedMessage = null;
        if(typeof this.props.lastVisitedAt === 'number'){visitedMessage = ` - (last visited ${moment(this.props.lastVisitedAt).fromNow()})`}
        return <p className="item__message">{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
    }
    render() {
        return (
            <div className="item">
                <h2>{this.props.url}</h2>
                <p className="item__message">{this.props.shortUrl}</p>
                {this.renderStats()}
                <a className="button button--bordered button--link" href={this.props.shortUrl} target="_blank">Visit</a>
                <button className="button button--bordered" ref="copy" data-clipboard-text={this.props.shortUrl}>
                    {this.state.justCopied ? 'Copied' : 'Copy'}
                </button>
                <button className="button button--bordered" onClick={()=>Meteor.call('links.setVisibility', this.props._id, !this.props.visible)}>
                    {this.props.visible ? 'hide' : 'unhide'}
                </button>
                <button className="button button--bordered" onClick={()=>Meteor.call('links.remove', this.props._id)}>Delete</button>
            </div>
        );
    }
};
LinksListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    shortUrl: PropTypes.string.isRequired,
    visitedCount: PropTypes.number.isRequired,
    lastVisitedAt: PropTypes.number
};