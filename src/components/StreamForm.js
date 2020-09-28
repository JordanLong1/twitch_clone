import React from 'react'; 
import { Field, reduxForm} from 'redux-form' // F is capitalized because it is a react component, reduxForm is lowercase becausse it is a function

class Streamorm extends React.Component {


    renderError ( {error, touched})  {
        if (touched && error) {
            return (
                <div className='ui error message'>
                    <div className='header'>
                    {error}
                    </div>

                </div>
            )
        }
    }
    renderInput = ( {input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete='off'/>
                    {/* <div>{meta.error}</div> */}
                    {this.renderError(meta)}
            </div>

        ) 
    }

    onSubmit = formValues => {
    this.props.onSubmit(formValues) // whenever the user submits the form, we will validate the inputs, if the inputs are valid we will call this func
    // on submit is going to call our action creator createStream which will run that action that will make a post request
    //which then can create a stream
    }

    render() {
        return (
          <form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Field name='title' component={this.renderInput} label='Enter Title' />
              <Field name='description' component={this.renderInput} label='Enter Description'/>
          <button className='ui button primary'>
            Submit
          </button>
          </form>
        )
    }
}

const validate = (formValues) => {
    const errors = {}; 

    if (!formValues.title) {
        errors.title = 'You must enter a title'
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description'
    }

    return errors
}

export default reduxForm({
    form: 'streamForm', 
    validate
})(StreamForm);