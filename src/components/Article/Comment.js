import DeleteButton from './DeleteButton';
import { Link } from 'react-router-dom';
import React from 'react';
import RelativeTime from 'react-relative-time'
import { Comment as UIComment } from 'semantic-ui-react'

const Comment = props => {
  const comment = props.comment;
  const show = props.currentUser &&
    props.currentUser.username === comment.author.username;
  return (
    <UIComment>
      <UIComment.Avatar as='a' src={comment.author.image} />
      <UIComment.Content>
        <UIComment.Author>
          <Link
            to={`/@${comment.author.username}`}
            className="comment-author">
            {comment.author.username}
          </Link>
        </UIComment.Author>
        <UIComment.Metadata>
          <span><RelativeTime value={new Date(comment.createdAt).toDateString()} titleFormat="YYYY/MM/DD HH:mm" /></span>
        </UIComment.Metadata>
        <UIComment.Text>
          <p>{comment.body}</p>
        </UIComment.Text>
        <UIComment.Actions>
          <UIComment.Action><DeleteButton show={show} slug={props.slug} commentId={comment.id} /></UIComment.Action>
        </UIComment.Actions>
      </UIComment.Content>
    </UIComment>
  );
};

export default Comment;
