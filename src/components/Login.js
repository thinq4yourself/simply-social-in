import Footer from './Footer';
import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import api from '../services/api';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: api.Auth.login(email, password) }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class Login extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    return (
      <div style={{ marginTop: '5rem' }}>
        <div className='login-form'>
          <Grid
            textAlign='center'
            style={{ height: '100%' }}
            verticalAlign='middle'
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                Log-in to your account
              </Header>
              <Form size='large' onSubmit={this.submitForm(email, password)}>
                <Segment stacked>
                  <ListErrors errors={this.props.errors} />
                  <Form.Input
                    fluid
                    icon='mail outline'
                    iconPosition='left'
                    placeholder='E-mail address'
                    type="email"
                    value={email}
                    onChange={this.changeEmail}
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    value={password}
                    onChange={this.changePassword}
                  />
      
                  <Button color='teal' fluid size='large' loading={this.props.inProgress}>Login</Button>
                </Segment>
              </Form>
              <Message>
                New to us? <Link to='/register' color='teal'>Sign Up</Link>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
