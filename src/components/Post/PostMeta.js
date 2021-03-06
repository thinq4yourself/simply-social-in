import PostActions from './PostActions';
import { Link } from 'react-router-dom';
import React from 'react';
import faker from 'faker';
import { Item, Icon } from 'semantic-ui-react'

const PostMeta = props => {
  const article = props.article;
  return (
    <div>
      <PostActions canModify={props.canModify} article={article} style={{position: 'absolute', right: 0}} />
      <Item.Group>
        <Item>
          <Item.Image size='mini' rounded src={faker.image.image()} />
          <Item.Content className='white'>
            <Item.Header className='white'>Author: <Link to={`/@${article.author.username}`} className="author white">{article.author.username}</Link></Item.Header>
            <Item.Description className='white'>{new Date(article.createdAt).toDateString()}</Item.Description>
            <Item.Extra className='white'>
              <Icon color='red' name='like' /> {faker.random.number()} Likes
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    </div>
  );
};

export default PostMeta;
