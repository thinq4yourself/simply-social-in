import React from 'react';
import api from '../services/api';
import { connect } from 'react-redux';
import faker from 'faker';
import { Link } from 'react-router-dom';
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../constants/actionTypes';
import RelativeTime from 'react-relative-time'
import { Image, Card, Button, Header, Dropdown, Icon } from 'semantic-ui-react'

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: ARTICLE_FAVORITED,
    payload: api.Articles.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: ARTICLE_UNFAVORITED,
    payload: api.Articles.unfavorite(slug)
  })
});

const ArticlePreview = props => {
  const article = props.article;

  const handleClick = ev => {
    ev.preventDefault();
    if (article.favorited) {
      props.unfavorite(article.slug);
    } else {
      props.favorite(article.slug);
    }
  };

  const FavoriteButton = () => {
    if (article.favorited) {
      return (
        <Button circular icon='red heart' onClick={handleClick} basic style={{boxShadow: 'none', padding: '.78571429em 0.285714em .78571429em'}} />
      )
    } else {
      return (
        <Button circular icon='red empty heart' onClick={handleClick} basic style={{boxShadow: 'none', padding: '.78571429em 0.285714em .78571429em'}} />
      )
    }
  }

  const PostImage = () => {
    if (props.article.tagList === 0) {
      return (
        <Image src={faker.image.image()} style={{maxHeight: '210px'}} />
      )
    } else {
      return (
        <Image src={faker.image.image()} style={{maxHeight: '210px'}} />
      )
    }
  }

  return (
    <Card>
        <Card.Content>
          <Card.Header>
            <Header as='h4' color='black'>
              <Link to={`/article/${article.slug}`} className='ui header black'><Image floated='left' size='mini' shape='rounded' src={faker.internet.avatar()} /></Link>
              <Link to={`/article/${article.slug}`} className='ui header black'>{faker.name.firstName() + ' ' + faker.name.lastName()}</Link>
              <Card.Meta>
                {article.title}
              </Card.Meta>
            </Header>
          </Card.Header>
          <Card.Header>
            <Link to={`/@${article.author.username}`} className="preview-link">{article.author.name}</Link>
          </Card.Header>
          <Card.Description>
            {article.description}: <Card.Meta>{faker.internet.url()}</Card.Meta>
            <ul className="tag-list">
              {
                article.tagList.map(tag => {
                  return (
                    <li className="tag-default tag-pill tag-outline" key={tag}>
                      {tag}
                    </li>
                  )
                })
              }
            </ul>
          </Card.Description>
        </Card.Content>
        <PostImage />
        <Card.Content extra>
          <div className='ui two'>
            <div className="pull-xs-right">
              <Dropdown upward trigger={<Button circular icon='share' basic style={{boxShadow: 'none', padding: '.78571429em 0.285714em .78571429em'}} />} pointing='top left' icon={null}>
                <Dropdown.Menu>
                  <Dropdown.Item><Link to='#' className='ui nav-link'><Icon name='twitter' />Twitter</Link></Dropdown.Item>
                  <Dropdown.Item><Link to='#' className='ui nav-link'><Icon name='facebook' />Facebook</Link></Dropdown.Item>
                  <Dropdown.Item><Link to='#' className='ui nav-link'><Icon name='instagram' /> Instagram</Link></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <FavoriteButton />
              <RelativeTime value={new Date(article.createdAt).toDateString()} titleFormat="YYYY/MM/DD HH:mm" />
            </div>
          </div>
        </Card.Content>
    </Card>
  );
}

export default connect(() => ({}), mapDispatchToProps)(ArticlePreview);
