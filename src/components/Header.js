import _ from 'lodash'
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import faker from 'faker';
import {
  LOGOUT
} from '../constants/actionTypes';
import {
  Button,
  Container,
  Menu,
  Segment,
  Image,
  Search,
  Dropdown,
  Icon,
  Responsive
} from 'semantic-ui-react'

const mapStateToProps = state => ({
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
});

const source = _.times(5, () => ({
  title: faker.lorem.words(),
  description: faker.lorem.sentence(),
  image: faker.internet.avatar(),
  url: faker.lorem.slug(),
}))

const DropDownTrigger = (
  <Image avatar src={faker.internet.avatar()} />
)

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <Menu inverted pointing secondary size='large'>
      <Menu.Item style={{paddingBottom: '1rem'}}><Link to='/'><Image src='/images/logo.png' alt={props.appName} height='30' /></Link></Menu.Item>
      <Menu.Item position='right'>
        <Menu.Item as='div' style={{padding: '3px'}}>
          <Responsive minWidth={768}>
            <Search
              loading={props.isLoading}
              onResultSelect={props.handleResultSelect}
              onSearchChange={props.handleSearchChange}
              results={props.results}
              value={props.value}
              className='search-box'
              {...props}
            />
          </Responsive>
        </Menu.Item>
        <Menu.Item as='div' style={{padding: '3px'}}><Button as='div' inverted style={{ margin: 'auto' }} className='white'><Link to='/login' className='white'>Log in</Link></Button></Menu.Item>
      </Menu.Item>
    </Menu>
    );
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <Menu inverted pointing secondary size='large'>
      <Menu.Item style={{paddingBottom: '1rem'}}><Link to='/'><Image src='/images/logo.png' alt={props.appName} height='30' /></Link></Menu.Item>
      <Menu.Item position='right'>
        <Menu.Item as='div'><Link to='/' className='nav-link'><Image src='/images/create.png' /></Link></Menu.Item>
        <Menu.Item as='div' style={{padding: '3px'}}>
          <Responsive minWidth={768}>
            <Search
              loading={props.isLoading}
              onResultSelect={props.handleResultSelect}
              onSearchChange={props.handleSearchChange}
              results={props.results}
              value={props.value}
              className='search-box'
              {...props}
            />
          </Responsive>
        </Menu.Item>
        <Menu.Item as='div' className=''>
          <Dropdown trigger={DropDownTrigger} pointing='top left' icon={null}>
            <Dropdown.Menu>
              <Dropdown.Item><Link to={`/@${props.currentUser.username}`} className='ui nav-link'><Icon name='user' />Profile</Link></Dropdown.Item>
              <Dropdown.Item><Link to='/settings' className='ui nav-link'><Icon name='settings' />Settings</Link></Dropdown.Item>
              <Dropdown.Item onClick={props.onClickLogout}><Icon name='sign out' /> Sign out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu.Item>
    </Menu>
    );
  }

  return null;
};

class Header extends React.Component {
  componentWillMount() {
    this.resetComponent()
  }
  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })
  
  handleResultSelect = (e, { result }) => this.setState({ value: result.title })
  
  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
  
    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()
  
      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)
  
      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 500)
  }

  render() {
    const { isLoading, value, results } = this.state
    return (
      <Segment
        inverted
        textAlign='center'
        style={{ minHeight: 50, padding: '0em' }}
        vertical
      >
        <Container>
          <LoggedOutView handleSearchChange={this.handleSearchChange} handleResultSelect={this.handleResultSelect} resetComponent={this.resetComponent} isLoading={isLoading} value={value} results={results} currentUser={this.props.currentUser} />
          <LoggedInView onClickLogout={this.props.onClickLogout} handleSearchChange={this.handleSearchChange} handleResultSelect={this.handleResultSelect} isLoading={this.isLoading} value={value} results={results} currentUser={this.props.currentUser} />
        </Container>
      </Segment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
