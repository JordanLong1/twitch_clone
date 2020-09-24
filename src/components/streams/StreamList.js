import React from 'react'; 
import {connect} from 'react-redux'; 
import {fetchStreams } from '../../actions'

class StreamList extends React.Component {

    renderList() {
        return this.props.streams.map(stream => {
            return (
                <div className='item' key={stream.id}>
                    <i className='large middle aligned icon camera' />
                    <div className='content'>
                        {stream.title}
            <div className='description'>{stream.description}</div>
                    </div>
                </div>
            )
        })
    }

    componentDidMount() {
        this.props.fetchStreams(); // when this component mounts, in the streams state tab in redux tools will show all of the streams fetched
    }

    render() {
        return (
            <div>
                <h2>Streams</h2>
        <div className='ui celled list'> {this.renderList()}</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {streams: Object.values(state.streams) } // Object.values() is a built in JS method that turns all of the values inside of an object into an array of objects so we can map over it
}

export default connect(mapStateToProps, {fetchStreams})(StreamList);