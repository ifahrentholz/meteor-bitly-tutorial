import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Links } from '../../imports/collections/links';

class LinkList extends Component {
  removeLink() {
    Meteor.call('link.remove', this._id);
  }

  renderRows() {
    return this.props.links.map((link) => {
      const { url, clicks, token } = link;
      const shortLink = `http://localhost:3000/${token}`;

      return (
        <tr key={link._id}>
          <td>{url}</td>
          <td>
            <a href={shortLink} target="_blank">{shortLink}</a>
          </td>
          <td>
            {clicks}
          </td>
          <td>
            <button onClick={this.removeLink.bind(link)}>Remove link</button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>URL</th>
            <th>Address</th>
            <th>Clicks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    )
  }
}

export default withTracker(props => {
  Meteor.subscribe('links');
  return {
    links: Links.find({}).fetch()
  }
})(LinkList);
