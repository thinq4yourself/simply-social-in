import React from 'react';
import api from '../services/api';
import { connect } from 'react-redux';
import { SET_PAGE } from '../constants/actionTypes';
import { Container, Grid, Segment, Menu } from 'semantic-ui-react'

const mapDispatchToProps = dispatch => ({
  onSetPage: (page, payload) =>
    dispatch({ type: SET_PAGE, page, payload })
});

const ListPagination = props => {
  if (props.articlesCount <= 9) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil((props.articlesCount / 9) / 4); ++i) {
    range.push(i);
  }

  const setPage = page => {
    if(props.pager) {
      props.onSetPage(page, props.pager(page));
    }else {
      props.onSetPage(page, api.Articles.all(page))
    }
  };

  return (
    <Segment style={{ margin: '3em 0em 0em', padding: '2em 0em' }} vertical>
      <Container textAlign='center'>
        <Grid columns={4} divided stackable inverted>
          <Grid.Row>
            <Menu pagination borderless style={{margin: 'auto'}}>
                {
                  range.map(v => {
                    const isCurrent = v === props.currentPage;
                    const onClick = ev => {
                      ev.preventDefault();
                      setPage(v);
                    };
                    return (
                      <Menu.Item
                        name='1' 
                        active={isCurrent} 
                        onClick={onClick}
                        key={v.toString()}
                      >
                        {v + 1}
                      </Menu.Item>
                    );
                  })
                }
            </Menu>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};

export default connect(() => ({}), mapDispatchToProps)(ListPagination);
