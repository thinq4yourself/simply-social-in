import ArticleMeta from './ArticleMeta';
import CommentContainer from './CommentContainer';
import React from 'react';
import faker from 'faker';
import api from '../../services/api';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RelativeTime from 'react-relative-time'
import marked from 'marked';
import { ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED } from '../../constants/actionTypes';
import { Image, Card, Button, Header, Dropdown, Icon, Segment, Container } from 'semantic-ui-react'

const mapStateToProps = state => ({
  ...state.article,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: ARTICLE_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: ARTICLE_PAGE_UNLOADED })
});

class Article extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      api.Articles.get(this.props.match.params.id),
      api.Comments.forArticle(this.props.match.params.id)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.article) {
      return null;
    }

    const article = this.props.article;
    const markup = { __html: marked(this.props.article.body, { sanitize: true }) };
    const canModify = this.props.currentUser &&
      this.props.currentUser.username === this.props.article.author.username;

    const handleClick = ev => {
      ev.preventDefault();
      if (article.favorited) {
        this.props.unfavorite(article.slug);
      } else {
        this.props.favorite(article.slug);
      }
    };

    const PostImage = () => {
      if (this.props.article.tagList === 0) {
        return (
          <Image src={faker.image.image()} style={{maxHeight: '210px'}} />
        )
      } else {
        return (
          <Image src={faker.image.image()} style={{maxHeight: '210px'}} />
        )
      }
    }

    const FavoriteButton = () => {
      if (this.props.article.favorited) {
        return (
          <Button circular icon='red heart' onClick={handleClick} basic style={{boxShadow: 'none', padding: '.78571429em 0.285714em .78571429em'}} />
        )
      } else {
        return (
          <Button circular icon='red empty heart' onClick={handleClick} basic style={{boxShadow: 'none', padding: '.78571429em 0.285714em .78571429em'}} />
        )
      }
    }

    return (
      <div className="article-page">

        <Segment
          textAlign='center'
          style={{ minHeight: 275, padding: '4em 0em 3.5rem', backgroundImage: 'url(/images/header-bg.jpg)' }}
          vertical
        >
          <Container>
            <Segment textAlign='left' basic>
              <Header
                as='h1'
                content={this.props.article.title}
                inverted
                style={{ fontSize: '2.8em', fontWeight: 'normal' }}
                shape='rounded'
              >
                <Header.Content>
                  {this.props.article.title}
                </Header.Content>
                <Header.Subheader><ArticleMeta article={this.props.article} canModify={canModify} /></Header.Subheader>
              </Header>
            </Segment>
          </Container>
        </Segment>

        <Segment style={{ padding: '3.292em 0em' }} vertical>
          <Container>
            <div className="feed-toggle ui text container" style={{paddingBottom: '50px'}}>
              <Card.Group itemsPerRow='1'>
                <Card>
                  <Card.Content>
                    <Card.Header>
                      <Header as='h1' color='black'>
                        {this.props.article.title}
                      </Header>
                      <Header as='h4' color='black'>
                          {faker.lorem.words()}
                        <Card.Meta>
                          {faker.internet.url()}
                        </Card.Meta>
                      </Header>
                    </Card.Header>
                    <Card.Description>
                      <Segment color='teal' secondary><div dangerouslySetInnerHTML={markup}></div></Segment>
                    </Card.Description>
                  </Card.Content>
                  <PostImage />
                  <Card.Content extra>
                    <div className='ui two'>
                      <div className="pull-xs-right">
                        <Dropdown upward trigger={<Button circular icon='share' basic style={{boxShadow: 'none', padding: '.78571429em 0.285714em .78571429em'}} />} pointing='top left' icon={null} inverted>
                          <Dropdown.Menu>
                            <Dropdown.Item><Link to='#' className='ui nav-link'><Icon name='twitter' />Twitter</Link></Dropdown.Item>
                            <Dropdown.Item><Link to='#' className='ui nav-link'><Icon name='facebook' />Facebook</Link></Dropdown.Item>
                            <Dropdown.Item><Link to='#' className='ui nav-link'><Icon name='instagram' /> Instagram</Link></Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <FavoriteButton />
                        <RelativeTime value={new Date(this.props.article.createdAt).toDateString()} titleFormat="YYYY/MM/DD HH:mm" />
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              </Card.Group>
            </div>
          </Container>
        </Segment>
        <CommentContainer
          comments={this.props.comments || []}
          errors={this.props.commentErrors}
          slug={this.props.match.params.id}
          currentUser={this.props.currentUser} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
