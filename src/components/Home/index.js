import Banner from './Banner';
import MainView from './MainView';
import React from 'react'
import Tags from './Tags';
import api from '../../services/api';
import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../constants/actionTypes';

import {
  Grid,
  Segment
} from 'semantic-ui-react'

const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () =>
    dispatch({  type: HOME_PAGE_UNLOADED })
});

class Home extends React.Component {
  componentWillMount() {
    const tab = this.props.token ? 'all' : 'all';
    const articlesPromise = this.props.token ?
      api.Articles.all :
      api.Articles.all;

    this.props.onLoad(tab, articlesPromise, Promise.all([api.Tags.getAll(), articlesPromise()]));
  }
  

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div>  
        <Banner token={this.props.token} appName={this.props.appName} />
          <Segment style={{ padding: '0em' }} vertical>
            <Grid container stackable verticalAlign='middle'>
              <Grid.Row style={{paddingTop: 0, marginTop: '-42px'}}>
                <Grid.Column>
                  <MainView />
                  <Tags
                    tags={this.props.tags}
                    onClickTag={this.props.onClickTag} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
