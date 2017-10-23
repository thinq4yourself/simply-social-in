import ArticleList from './ArticleList';
import { Profile, mapStateToProps } from './Profile';
import React from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import faker from 'faker';
import { connect } from 'react-redux';
import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED
} from '../constants/actionTypes';
import {
  Menu
} from 'semantic-ui-react'

const mapDispatchToProps = dispatch => ({
  onLoad: (pager, payload) =>
    dispatch({ type: PROFILE_PAGE_LOADED, pager, payload }),
  onUnload: () =>
    dispatch({ type: PROFILE_PAGE_UNLOADED })
});

class ProfileFavorites extends Profile {
  componentWillMount() {
    this.props.onLoad(page => api.Articles.favoritedBy(this.props.match.params.username, page), Promise.all([
      api.Profile.get(this.props.match.params.username),
      api.Articles.favoritedBy(this.props.match.params.username)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  renderTabs() {
    return (
      <Menu pointing inverted secondary borderless size='massive' style={{ margin: '0 auto 0 30%', border: 'none' }}>
        <Menu.Item name='my'><Link to={`/@${this.props.profile.username}`} className='ui text white'>{faker.name.firstName()}'s' Feed</Link></Menu.Item>
        <Menu.Item name='fav' active><Link to='#' className='ui text white'>2,542 Followers</Link></Menu.Item>
        <Menu.Item name='fav'><Link to={`/@${this.props.profile.username}/followers`} className='ui text white'>517 Following</Link></Menu.Item>
      </Menu>
    );
  }

  renderList() {
    return (
      <ArticleList
        fixed='variable'
        columns='3'
        pager={this.props.pager}
        articles={this.props.articles}
        articlesCount={this.props.articlesCount}
        state={this.props.currentPage} />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFavorites);
