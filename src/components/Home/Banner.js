import React from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Segment,
  Header,
  Form,
  Input,
  Menu,
  Modal,
  Button,
  Icon,
  Portal,
  Responsive
} from 'semantic-ui-react'
import faker from 'faker';
import ReactFilepicker from 'react-filepicker';
import api from '../../services/api';
import { connect } from 'react-redux';
import {
  ADD_TAG,
  EDITOR_PAGE_LOADED,
  REMOVE_TAG,
  HOME_ARTICLE_SUBMITTED,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR
} from '../../constants/actionTypes';
import ListErrors from '../ListErrors';

const mapStateToProps = state => ({
  ...state.editor,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onAddTag: () =>
    dispatch({ type: ADD_TAG }),
  onLoad: payload =>
    dispatch({ type: EDITOR_PAGE_LOADED, payload }),
  onRemoveTag: tag =>
    dispatch({ type: REMOVE_TAG, tag }),
  onSubmit: payload =>
    dispatch({ type: HOME_ARTICLE_SUBMITTED, payload }),
  onUnload: payload =>
    dispatch({ type: EDITOR_PAGE_UNLOADED }),
  onUpdateField: (key, value) =>
    dispatch({ type: UPDATE_FIELD_EDITOR, key, value })
});

const options = {
  buttonText: 'Upload media here',
  buttonClass: 'ui button inverted',
  mimetype: 'image/*',
  container: 'window',
};

const timeoutLength = 1100

class Banner extends React.Component {
  constructor() {
    super();

    this.state = { isOpen: false, modalOpen: false, modal2Open: false }

    this.handleOpen = message => {
      this.setState({ isOpen: true, message: message })
  
      this.timeout = setTimeout(() => {
        this.setState({ isOpen: false, message: message })
      }, timeoutLength)
    }
  
    this.handleClose = () => {
      this.setState({ isOpen: false, message: 'Hi there :)' })
      clearTimeout(this.timeout)
    }

    this.handleModalOpen = message => {
      this.setState({ modalOpen: true })
    }
  
    this.handleModalClose = () => {
      this.setState({ modalOpen: false})
    }

    this.handleModal2Open = message => {
      this.setState({ modal2Open: true })
    }
  
    this.handleModal2Close = () => {
      this.setState({ modal2Open: false})
    }

    this.afterUpload = fpfiles => {
      this.setState({ modalOpen: false })
      this.setState({ modal2Open: false })
    }

    const updateFieldEvent =
      key => ev => this.props.onUpdateField(key, ev.target.value);
    this.changeTitle = updateFieldEvent('title');

    this.watchForEnter = ev => {
      if (ev.keyCode === 13) {
        ev.preventDefault();
        this.props.onAddTag();
      }
    };

    this.removeTagHandler = tag => () => {
      this.props.onRemoveTag(tag);
    };

    this.submitForm = ev => {
      ev.preventDefault();
      if (this.props.title) {
        const article = {
          title: this.props.title,
          description: faker.lorem.sentence(),
          body: faker.image.image(),
          tagList: ['video', 'video']
        };

        const promise = api.Articles.create(article);

        this.props.onSubmit(promise);
        this.handleOpen('Great post!');
        this.setState({
          title: '',
        });
      } else {
        this.handleOpen('Whoops! You will need to enter a message.');
      }
    };
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillMount() {
    this.props.onLoad(null);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { isOpen, message } = this.state

    return (
      <div style={{ backgroundImage: 'url(/images/header-bg.jpg)' }}>
        <Segment
          textAlign='center'
          style={{ minHeight: 320, padding: '7em 0em 6.2rem' }}
          vertical
        >
        <Container text>
          <Segment textAlign='center' padded='very' inverted color='teal' className='new-post'>
            <Form className={this.props.currentUser ? 'let' : 'hide'} id='PostForm'>
              <Form.Field>
                <Input value={this.props.title} onChange={this.changeTitle} inverted fluid icon='comment outline' iconPosition='left' placeholder="What's on your mind?" className='start-post' />
              </Form.Field>
              <Menu secondary inverted>
                <Responsive minWidth={768}>
                  <Modal open={this.state.modalOpen} onClose={this.handleModalClose} trigger={<Menu.Item name='Add image' as='a' icon='image' onClick={this.handleModalOpen} />} basic size='small' style={{marginTop: '-1rem'}} closeIcon>
                    <Header icon='image' content='Add media' />
                    <Modal.Actions>
                      <ReactFilepicker apikey='AtgHjDJ9wQb6bX0hLp1ILz' defaultWidget={true} options={options} onSuccess={this.afterUpload} />
                    </Modal.Actions>
                  </Modal>
                </Responsive>
                <Modal open={this.state.modal2Open} onClose={this.handleModal2Close} trigger={<Menu.Item name='Add video' as='a' icon='video' onClick={this.handleModalOpen} />} basic size='small' style={{marginTop: '-1rem'}} closeIcon>
                  <Header icon='video' content='Add video' />
                  <Modal.Actions>
                    <ReactFilepicker apikey='AtgHjDJ9wQb6bX0hLp1ILz' defaultWidget={false} options={options} onSuccess={this.afterUpload} />
                  </Modal.Actions>
                </Modal>
                <Menu.Item>
                  <Button inverted color='grey' onClick={this.submitForm} icon='plus circle' labelPosition='left' content='Post' />
                </Menu.Item>
              </Menu>
              <Portal onClose={this.handleClose} open={isOpen}>
                <Segment style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}>
                  <p>{message}</p>
                  <ListErrors errors={this.props.errors}></ListErrors>
                </Segment>
              </Portal>
            </Form>
            <div className={!this.props.currentUser ? 'let' : 'hide'}>
              <Header
                as='h1'
                content='Simply Social'
                inverted
                style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0 }}
                />
              <Header
                as='h2'
                content='Once you login you can join the conversation.'
                style={{ fontSize: '1.7em', fontWeight: 'normal' }}
                className={this.props.currentUser ? 'hide' : 'let'}
              />
              <Button color='teal' size='huge'>
                <Link to='/login' className='white'>
                  Get Started <Icon name='right arrow' />
                </Link>
              </Button>
            </div>

          </Segment>
        </Container>
        </Segment>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
