import React from 'react'; 
import {connect} from 'react-redux'
import {fetchStream} from '../../actions'
class StreamEdit extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id); 
    }

    render() {
        if (!this.props.stream) {
            return <div>...Loading</div>
        }
        return (
            <div>
           {this.props.stream.title}
            </div>
        )
    }
}

const mapStateToprops = (state, ownProps) => { // ownProps is the reference to the props object that shows up inside of this component
    return {stream: state.streams[ownProps.match.params.id]  } // this gives us the stream id from this components props via ownProps
}

export default connect(mapStateToprops, {fetchStream})(StreamEdit);