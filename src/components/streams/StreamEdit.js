import _ from 'lodash'
import React from 'react'; 
import {connect} from 'react-redux'
import {fetchStream, editStream} from '../../actions'
import StreamForm from './StreamForm'
class StreamEdit extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id); 
    }

    onSubmit = (formValues) => {
        console.log(formValues)
    }

    render() {
        if (!this.props.stream) {
            return <div>...Loading</div>
        }
        return (
           <div>
               <h3>Edit a Stream</h3>
               {/* initailValues is a special prop from redux form library, we add two {{}} below to create an object with jsx. (ended up taking that code out) */}
               <StreamForm initialValues={_.pick(this.props.stream, 'title', 'description')} onSubmit={this.onSubmit}/> 
           </div>
        )
    }
}

const mapStateToprops = (state, ownProps) => { // ownProps is the reference to the props object that shows up inside of this component
    return {stream: state.streams[ownProps.match.params.id]  } // this gives us the stream id from this components props via ownProps
}

export default connect(mapStateToprops, {fetchStream, editStream})(StreamEdit);