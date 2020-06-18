import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions';
import Modal from '../modal';
import history from '../../history';

class StreamDelete extends Component {
  renderActions() {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteStream(id)}
          className="ui negative button"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onDismiss = () => {
    console.log('CANCEL');
    history.push('/');
  };

  renderContent = () => {
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream?';
    }
    return `Are you sure you want to delete the stream with title: ${this.props.stream.title}?`;
  };

  render() {
    if (this.props.stream) {
      return (
        <Modal
          title="Delete stream"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push('/')}
        />
      );
    } else {
      return null;
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
