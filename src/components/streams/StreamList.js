import React from 'react'; 
import {connect} from 'react-redux'; 
import {fetchStreams } from '../../actions'
import { Link } from 'react-router-dom'
class StreamList extends React.Component {

    renderAdmin(stream) { // pass in stream because this is a helper method for renderList
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className='right floated content'>
                    <button className='ui button primary'>
                        Edit
                    </button>
                    <button className='ui button negative'>
                        Delete
                    </button>
                </div>
            )
        }
    }

    renderList() {
        return this.props.streams.map(stream => {
           
            return (
                <div className='item' key={stream.id}>
                    <i className='large middle aligned icon camera' />
                    <div className='content'>
                        {stream.title}
            <div className='description'>{stream.description}</div>
            {this.renderAdmin(stream)}
                    </div>
                </div>
            )
        })
    }

    componentDidMount() {
        this.props.fetchStreams(); // when this component mounts, in the streams state tab in redux tools will show all of the streams fetched
    }

    renderCreateButton() {
        if (this.props.isSignedIn) {
            return (
                <div style={{textAlign: 'right'}}>
                <Link to='/streams/new' >
                    Create Stream    
                 </Link>
                </div>
                )
            }
        }

    render() {
        return (
            <div>
                <h2>Streams</h2>
        <div className='ui celled list'> {this.renderList()}</div>
        {this.renderCreateButton()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {streams: Object.values(state.streams), currentUserId: state.auth.userId, isSignedIn: state.auth.isSignedIn } // Object.values() is a built in JS method that turns all of the values inside of an object into an array of objects so we can map over it

}

export default connect(mapStateToProps, {fetchStreams})(StreamList);