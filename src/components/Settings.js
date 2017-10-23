import ListErrors from './ListErrors';
import React from 'react';
import api from '../services/api';
import { connect } from 'react-redux';
import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  LOGOUT
} from '../constants/actionTypes';
import { Form, TextArea, Button, Header, Segment, Container } from 'semantic-ui-react'

class SettingsForm extends React.Component {
  constructor() {
    super();

    this.state = {
      image: '',
      username: '',
      bio: '',
      email: '',
      password: ''
    };

    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };

    this.submitForm = ev => {
      ev.preventDefault();

      const user = Object.assign({}, this.state);
      if (!user.password) {
        delete user.password;
      }

      this.props.onSubmitForm(user);
    };
  }

  componentWillMount() {
    if (this.props.currentUser) {
      Object.assign(this.state, {
        image: this.props.currentUser.image || '',
        username: this.props.currentUser.username,
        bio: this.props.currentUser.bio,
        email: this.props.currentUser.email
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState(Object.assign({}, this.state, {
        image: nextProps.currentUser.image || '',
        username: nextProps.currentUser.username,
        bio: nextProps.currentUser.bio,
        email: nextProps.currentUser.email
      }));
    }
  }

  render() {
    return (
      <div>
        <Segment
          textAlign='center'
          style={{ minHeight: 275, padding: '4em 0em 3.5rem', backgroundImage: 'url(/images/header-bg.jpg)' }}
          vertical
        >
          <Container>
            <Segment textAlign='left' basic>
              <Header
                as='h1'
                inverted
                style={{ fontSize: '2.8em', fontWeight: 'normal' }}
                shape='rounded'
              >
                <Header.Content>
                  {this.props.title}
                </Header.Content>
                <Header.Subheader></Header.Subheader>
              </Header>
            </Segment>
          </Container>
        </Segment>

        <Segment style={{ padding: '3.292em 0em' }} vertical>
          <Container>
            <div className="feed-toggle ui text container" style={{paddingBottom: '50px'}}>
              <ListErrors errors={this.props.errors} />
              <Form size='large' onSubmit={this.submitForm}>
                <Segment attached='top'>
                  <Form.Input
                    fluid
                    icon='edit'
                    iconPosition='left'
                    placeholder='Enter the URL of your profile picture'
                    type="text"
                    content={this.props.image}
                    onChange={this.updateState('image')}
                    label='URL of profile picture'
                  >
                    <input
                      type="text"
                      placeholder="URL of profile picture"
                      value={this.state.image}
                      onChange={this.updateState('image')} />
                  </Form.Input>
                  <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='Enter your username'
                    type="text"
                    content={this.props.username}
                    onChange={this.updateState('username')}
                    label='Username'
                  >
                    <input
                      type="text"
                      placeholder="Username"
                      value={this.state.username}
                      onChange={this.updateState('username')} />
                  </Form.Input>
                  <Form.Field>
                    <label>Bio</label>
                    <TextArea
                      fluid
                      icon='page'
                      iconPosition='left'
                      placeholder='A short bio about you'
                      type="text"
                      content={this.props.bio}
                      onChange={this.updateState('bio')}
                      label='Bio'
                    />
                  </Form.Field>
                  <Form.Input
                    fluid
                    icon='mail'
                    iconPosition='left'
                    placeholder='Enter your email address'
                    type="email"
                    content={this.props.email}
                    onChange={this.updateState('email')}
                    label='Email'
                  >
                    <input
                      type="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.updateState('email')} />
                  </Form.Input>
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Enter your password'
                    type="password"
                    content={this.props.password}
                    onChange={this.updateState('password')}
                    label='Password'
                  >
                    <input
                      type="password"
                      value={this.state.password}
                      onChange={this.updateState('password')} />
                  </Form.Input>
                </Segment>
                <Segment attached='bottom'>
                  <Form.Field control={Button} disabled={this.props.inProgress} onClick={this.submitForm} color='teal'>
                    Save
                  </Form.Field>
                </Segment>
              </Form>
            </div>
          </Container>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
  onSubmitForm: user =>
    dispatch({ type: SETTINGS_SAVED, payload: api.Auth.save(user) }),
  onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED })
});

class Settings extends React.Component {
  render() {
    return (
      <div className="settings-page">
        <ListErrors errors={this.props.errors}></ListErrors>

        <SettingsForm
          currentUser={this.props.currentUser}
          onSubmitForm={this.props.onSubmitForm} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
