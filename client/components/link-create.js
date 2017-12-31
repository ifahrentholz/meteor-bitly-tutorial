import React, {Component} from 'react';


class LinkCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { error: '' };
  }

  handleSubmit(event) {
    event.preventDefault();
    Meteor.call('links.insert', this.refs.urlInput.value, (error) => {
      if(error) {
        this.setState({
          error: 'Please enter a valid URL.'
        });
      } else {
        this.setState({
          error: ''
        });
        this.refs.urlInput.value = '';
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <div className="text-danger">{this.state.error}</div>
          <label>Link to shorten</label>
          <input className="form-control" ref="urlInput" />
        </div>
        <button className="btn btn-primary">Shorten!</button>
      </form>
    )
  }
}


export default LinkCreate;