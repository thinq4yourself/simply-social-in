import { Link } from 'react-router-dom';
import React from 'react';
import api from '../../services/api';
import { connect } from 'react-redux';
import { DELETE_ARTICLE } from '../../constants/actionTypes';
import {
  Dropdown, Icon, Menu
} from 'semantic-ui-react'

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload =>
    dispatch({ type: DELETE_ARTICLE, payload })
});

const PostActions = props => {
  const article = props.article;
  const del = () => {
    props.onClickDelete(api.Articles.del(article.slug))
  };
  if (props.canModify) {
    return (
      <Menu secondary>
        <Menu.Menu position='right'>
          <Dropdown text='Actions' icon='tasks' floating labeled button className='icon only-child'>
            <Dropdown.Menu>
              <Dropdown.Item><Link to={`/editor/${article.slug}`}><Icon name='edit' /> Edit</Link></Dropdown.Item>
              <Dropdown.Item icon='delete' text='Delete' onClick={del} />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }

  return (
    <span>
    </span>
  );
};

export default connect(() => ({}), mapDispatchToProps)(PostActions);
