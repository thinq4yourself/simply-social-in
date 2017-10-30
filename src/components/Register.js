import Footer from './Footer';
import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import api from '../services/api';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onSubmit: (username, email, password) => {
    const payload = api.Auth.register(username, email, password);
    dispatch({ type: REGISTER, payload })
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class Register extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
    this.submitForm = (username, email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(username, email, password);
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    const username = this.props.username;

    return (
      <div className="auth-page">
        <div className='login-form'>
          <Grid
            textAlign='center'
            style={{ height: '100%' }}
            verticalAlign='middle'
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                Create your account
              </Header>
              <Form size='large' onSubmit={this.submitForm(username, email, password)}>
                <Segment stacked>
                  <ListErrors errors={this.props.errors} />
                  <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='Username'
                    type="text"
                    value={username}
                    onChange={this.changeUsername}
                  />
                  <Form.Input
                    fluid
                    icon='mail outline'
                    iconPosition='left'
                    placeholder='E-mail address'
                    type="text"
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
                  <Button color='teal' fluid size='large' loading={this.props.inProgress} type="submit">Register</Button>
                </Segment>
              </Form>
              <Message>
                Have an account? <Link to='/login' color='teal' className='ui text teal'>Login</Link>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
