import CommentInput from './CommentInput';
import CommentList from './CommentList';
import { Link } from 'react-router-dom';
import React from 'react';
import { Header, Segment, Container, Comment, Divider } from 'semantic-ui-react'

const CommentContainer = props => {
  if (props.currentUser) {
    return (
      <Segment vertical>
        <Container>
          <div className="feed-toggle ui text container" style={{paddingBottom: '50px'}}>
            <Comment.Group size='large'>
              <Header as='h3' dividing>Comments</Header>
              <list-errors errors={props.errors}></list-errors>              
              <CommentList
                comments={props.comments}
                slug={props.slug}
                currentUser={props.currentUser} />
              <Divider horizontal />
              <CommentInput slug={props.slug} currentUser={props.currentUser} />

            </Comment.Group>
          </div>
        </Container>
      </Segment>
    );
  } else {
    return (
      <div>

        <CommentList
          comments={props.comments}
          slug={props.slug}
          currentUser={props.currentUser} />
      </div>
    );
  }
};

export default CommentContainer;
