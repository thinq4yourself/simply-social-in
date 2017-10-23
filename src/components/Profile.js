import PostList from './PostList';
import React from 'react';
import faker from 'faker';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { connect } from 'react-redux';
import {
  FOLLOW_USER,
  UNFOLLOW_USER,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED
} from '../constants/actionTypes';
import {
  Container,
  Segment,
  Image,
  Header,
  Grid,
  Menu
} from 'semantic-ui-react'

const FollowUserButton = props => {
  if (props.isUser) {
    return null;
  }

  let classes = 'btn btn-sm action-btn';
  if (props.user.following) {
    classes += ' btn-secondary';
  } else {
    classes += ' btn-outline-secondary';
  }

  const handleClick = ev => {
    ev.preventDefault();
    if (props.user.following) {
      props.unfollow(props.user.username)
    } else {
      props.follow(props.user.username)
    }
  };

  return (
    <button
      className={classes}
      onClick={handleClick}>
      <i className="ion-plus-round"></i>
      &nbsp;
      {props.user.following ? 'Unfollow' : 'Follow'} {props.user.username}
    </button>
  );
};

const mapStateToProps = state => ({
  ...state.articleList,
  currentUser: state.common.currentUser,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  onFollow: username => dispatch({
    type: FOLLOW_USER,
    payload: api.Profile.follow(username)
  }),
  onLoad: payload => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
  onUnfollow: username => dispatch({
    type: UNFOLLOW_USER,
    payload: api.Profile.unfollow(username)
  }),
  onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED })
});

class Profile extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      api.Profile.get(this.props.match.params.username),
      api.Articles.byAuthor(this.props.match.params.username)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  renderTabs() {
    return (
      <Menu pointing inverted secondary borderless size='massive' style={{ margin: '0 auto 0 30%', border: 'none' }}>
        <Menu.Item name='my' active><Link to={`/@${this.props.profile.username}`} className='ui text white'>{faker.name.firstName()}'s' Feed</Link></Menu.Item>
        <Menu.Item name='fav' active={this.props.tab === 'fav'}><Link to={`/@${this.props.profile.username}/favorites`} className='ui text white'>2,542 Followers</Link></Menu.Item>
        <Menu.Item name='fav' active={this.props.tab === 'fav'}><Link to={`/@${this.props.profile.username}/followers`} className='ui text white'>517 Following</Link></Menu.Item>
      </Menu>
    );
  }

  renderList() {
    return (
      <PostList
        fixed='fixed-width'
        columns='1'
        pager={this.props.pager}
        articles={this.props.articles}
        articlesCount={this.props.articlesCount}
        state={this.props.currentPage} />
    )
  }

  render() {
    const profile = this.props.profile;
    if (!profile) {
      return null;
    }

    const isUser = this.props.currentUser &&
      this.props.profile.username === this.props.currentUser.username;

    return (
      <div className="profile-page">
        <Segment
          textAlign='center'
          style={{ minHeight: 320, padding: '7em 0em 7.5rem', backgroundImage: 'url(/images/header-bg.jpg)' }}
          vertical
        >
          <Container text>
            <Segment textAlign='center' padded='very' className='' basic>
              <Header
                as='h2'
                content={profile.username}
                inverted
                style={{ fontSize: '1.7em', fontWeight: 'normal' }}
                shape='rounded'
              >
                <Image
                  src={profile.image}
                  size='massive'
                  shape='rounded'
                /><br />
                <Header.Content>{faker.name.findName()}</Header.Content>
                <Header.Subheader>{faker.name.jobTitle()} working in {faker.address.city()}, {faker.address.stateAbbr()}</Header.Subheader>
              </Header>
              <p>{faker.internet.url()}</p>
              <FollowUserButton
                isUser={isUser}
                user={profile}
                follow={this.props.onFollow}
                unfollow={this.props.onUnfollow}
                />
            </Segment>
          </Container>
        </Segment>
        <Segment style={{ padding: '0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row style={{paddingTop: 0, marginTop: '-42px'}}>
              <Grid.Column>
                <Segment style={{ padding: '0.192em 0em' }} vertical>
                  <Container>
                    <div className="feed-toggle ui text container" style={{padding: '50px auto 5px auto'}}>
                      {this.renderTabs()}
                    </div>
                  </Container>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            {this.renderList()}
          </Grid>
        </Segment>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export { Profile, mapStateToProps };
