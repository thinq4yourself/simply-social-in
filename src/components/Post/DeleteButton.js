import React from 'react';
import api from '../../services/api';
import { connect } from 'react-redux';
import { DELETE_COMMENT } from '../../constants/actionTypes';
import { Icon } from 'semantic-ui-react'

const mapDispatchToProps = dispatch => ({
  onClick: (payload, commentId) =>
    dispatch({ type: DELETE_COMMENT, payload, commentId })
});

const DeleteButton = props => {
  const del = () => {
    const payload = api.Comments.delete(props.slug, props.commentId);
    props.onClick(payload, props.commentId);
  };

  if (props.show) {
    return (
      <a onClick={del}><Icon link name='trash outline' /> Delete comment</a>
    );
  }
  return null;
};

export default connect(() => ({}), mapDispatchToProps)(DeleteButton);
