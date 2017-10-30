import React from 'react';
import { connect } from 'react-redux';
import {
  LOGOUT
} from '../constants/actionTypes';
import {
  Container,
  Grid,
  List,
  Header,
  Segment,
  Divider
} from 'semantic-ui-react'

const mapStateToProps = state => ({
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
});

class Footer extends React.Component {
    render() {
        // const { isLoading, value, results } = this.state
        return (
        <Segment vertical style={{ padding: '5em 0em', marginTop: '5em' }}>
            <Divider
                as='h4'
                className='header'
                horizontal
                style={{ margin: '3em 0em', textTransform: 'uppercase' }}
            >
                <a>Simply Social</a>
            </Divider>
            <Container>
            <Grid divided stackable>
                <Grid.Row>
                <Grid.Column width={3}>
                    <Header as='h4' content='About' />
                    <List link>
                    <List.Item as='a'>Company</List.Item>
                    <List.Item as='a'>Customers</List.Item>
                    <List.Item as='a'>Careers</List.Item>
                    <List.Item as='a'>Contact Us</List.Item>
                    </List>
                </Grid.Column>
                <Grid.Column width={3}>
                    <Header as='h4' content='Support' />
                    <List link>
                    <List.Item as='a'>Documentation</List.Item>
                    <List.Item as='a'>FAQ</List.Item>
                    <List.Item as='a'>How To Post</List.Item>
                    <List.Item as='a'>Community</List.Item>
                    </List>
                </Grid.Column>
                <Grid.Column width={7}>
                    <p>
                    An engaging and simple tool to socialize with friends.<br />
                    Simply the easiest way to share messages from friends who care enough to read them. 
                </p>
                </Grid.Column>
                </Grid.Row>
            </Grid>
            </Container>
        </Segment>
        );
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Footer);