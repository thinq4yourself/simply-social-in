import ArticleList from '../ArticleList';
import React from 'react';
import api from '../../services/api';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';
import {
  Container,
  Segment,
  Menu
} from 'semantic-ui-react'

const YourFeedTab = props => {
  if (props.token) {
    const clickHandler = ev => {
      ev.preventDefault();
      props.onTabClick(props.fixed, props.columns, 'feed', api.Articles.feed, api.Articles.feed());
    }

    return (
      <Menu.Item name='photos' active={props.tab === 'feed'} onClick={clickHandler} />
    );
  }
  return null;
};

const GlobalFeedTab = props => {
  const clickHandler = ev => {
    ev.preventDefault();
    props.onTabClick(props.fixed, props.columns, 'all', api.Articles.all, api.Articles.all());
  };
  return (
    <Menu.Item name='All Posts' active={props.tab === 'all'} onClick={clickHandler} />
  );
};

const TagFilterTab = props => {
  const clickHandler = ev => {
    ev.preventDefault();
    // props.onTabClick('video', page => api.Articles.byTag('video', page), api.Articles.byTag('video'));
    props.onTabClick(props.fixed, props.columns, props.tag, page => api.Articles.byTag('video', page), api.Articles.byTag('video'));
  };
  return (
    <Menu.Item name='Video' active={props.tab === 'video'} onClick={clickHandler} />
  );
};

const mapStateToProps = state => ({
  ...state.articleList,
  tags: state.home.tags,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (fixed, columns, tab, pager, payload) => dispatch({ type: CHANGE_TAB, fixed, columns, tab, pager, payload })
});

const MainView = props => {
  return (
    <Segment style={{ padding: '0.292em 0em' }} vertical>
      <Container>
        <div className="feed-toggle ui text container" style={{paddingBottom: '50px'}}>
          <Menu pointing inverted secondary borderless size='massive' style={{ margin: '0 auto 0 30%', borderTop: 'none', borderRight: 'none', borderLeft: 'none' }}>

            <GlobalFeedTab 
              fixed='fixed-width' 
              columns='1' 
              tab={props.tab} 
              onTabClick={props.onTabClick} />
            <YourFeedTab
              fixed='variable'
              columns='3'
              token={props.token}
              tab={props.tab}
              onTabClick={props.onTabClick} />
            <TagFilterTab 
              fixed='variable' 
              columns='3' 
              tab={props.tab} 
              tag="video" 
              onTabClick={props.onTabClick} />

          </Menu>
        </div>

        <ArticleList
          fixed={props.fixed || 'fixed-width'}
          columns={props.columns || 1}
          pager={props.pager}
          articles={props.articles}
          loading={props.loading}
          articlesCount={props.articlesCount}
          currentPage={props.currentPage} />
      </Container>
    </Segment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
