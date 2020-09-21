import React from 'react'; 
import {connect} from 'react-redux'
import {signIn, signOut} from '../actions'
class GoogleAuth extends React.Component {

    state = {isSignedIn: null}

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '646209919451-phtgdo6ee1ia3pgbh0go1fnbg7t5dv3b.apps.googleusercontent.com', 
                scope: 'email'
            }).then(() => {
                //gets executed after the promise resolves. 
                this.auth = window.gapi.auth2.getAuthInstance()
                this.setState({
                    isSignedIn: this.auth.isSignedIn.get() // built in method from the window.gapi.client
                })
                this.auth.isSignedIn.listen(this.onAuthChange) 
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn === true) {
            this.props.signIn();
        } else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        console.log('sign in')
        this.auth.signIn(); 
    }

    onSignOutClick = () => {
        console.log(' sign out')
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null
        } else if (this.state.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className='ui red google button'>
                    <i className='google icon' />
                    Sign Out
                </button>
            )

            
        } else {
            return (
                <button onClick={this.onSignOutClick} className='ui red google button'>
                    <i className='google icon' />
                    Sign In with Google
                </button>
            )
        }
    } 

    render() {
        return (
        <div>{this.renderAuthButton()}</div>
        )
    }
}

export default connect(null, {signIn, signOut})(GoogleAuth)