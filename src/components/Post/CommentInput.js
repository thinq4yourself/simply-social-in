import React from 'react';
import api from '../../services/api';
import { connect } from 'react-redux';
import { ADD_COMMENT } from '../../constants/actionTypes';
import { Button, Form } from 'semantic-ui-react'

const mapDispatchToProps = dispatch => ({
  onSubmit: payload =>
    dispatch({ type: ADD_COMMENT, payload })
});

class CommentInput extends React.Component {
  constructor() {
    super();
    this.state = {
      body: ''
    };

    this.setBody = ev => {
      this.setState({ body: ev.target.value });
    };

    this.createComment = ev => {
      ev.preventDefault();
      const payload = api.Comments.create(this.props.slug,
        { body: this.state.body });
      this.setState({ body: '' });
      this.props.onSubmit(payload);
    };
  }

  render() {
    return (
      <Form onSubmit={this.createComment}>
          <Form.TextArea
            placeholder='Write your comment...'
            value={this.state.body}
            onChange={this.setBody}
            rows='3'
            />
          <Button content='Add Comment' labelPosition='left' icon='edit' color='teal' />
      </Form>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(CommentInput);
