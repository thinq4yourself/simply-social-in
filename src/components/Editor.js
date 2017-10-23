import ListErrors from './ListErrors';
import React from 'react';
import api from '../services/api';
import { connect } from 'react-redux';
import {
  ADD_TAG,
  EDITOR_PAGE_LOADED,
  REMOVE_TAG,
  ARTICLE_SUBMITTED,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR
} from '../constants/actionTypes';
import ReactFilepicker from 'react-filepicker';
import { Form, TextArea, Button, Header, Dropdown, Segment, Container } from 'semantic-ui-react'

const mapStateToProps = state => ({
  ...state.editor
});

const mapDispatchToProps = dispatch => ({
  onAddTag: () =>
    dispatch({ type: ADD_TAG }),
  onLoad: payload =>
    dispatch({ type: EDITOR_PAGE_LOADED, payload }),
  onRemoveTag: tag =>
    dispatch({ type: REMOVE_TAG, tag }),
  onSubmit: payload =>
    dispatch({ type: ARTICLE_SUBMITTED, payload }),
  onUnload: payload =>
    dispatch({ type: EDITOR_PAGE_UNLOADED }),
  onUpdateField: (key, value) =>
    dispatch({ type: UPDATE_FIELD_EDITOR, key, value })
});

const options = {
  buttonText: 'Upload media',
  buttonClass: 'ui button',
  mimetype: 'image/*',
  container: 'window',
};

const TagOptions = [
  { key: 'video', text: 'Video', value: 'video' },
  { key: 'image', text: 'Image', value: 'image' },
]

class Editor extends React.Component {
  constructor() {
    super();

    const updateFieldEvent =
      key => ev => this.props.onUpdateField(key, ev.target.value);
    this.changeTitle = updateFieldEvent('title');
    this.changeDescription = updateFieldEvent('description');
    this.changeBody = updateFieldEvent('body');
    this.changeTagInput = updateFieldEvent('tagInput');

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
      const article = {
        title: this.props.title,
        description: this.props.description,
        body: this.props.body,
        tagList: this.props.tagList
      };

      const slug = { slug: this.props.articleSlug };
      const promise = this.props.articleSlug ?
        api.Articles.update(Object.assign(article, slug)) :
        api.Articles.create(article);

      this.props.onSubmit(promise);
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.slug !== nextProps.match.params.slug) {
      if (nextProps.match.params.slug) {
        this.props.onUnload();
        return this.props.onLoad(api.Articles.get(this.props.match.params.slug));
      }
      this.props.onLoad(null);
    }
  }

  componentWillMount() {
    if (this.props.match.params.slug) {
      return this.props.onLoad(api.Articles.get(this.props.match.params.slug));
    }
    this.props.onLoad(null);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="editor-page">

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
              <Form size='large'>
                <Segment attached='top'>
                  <Form.Input
                    fluid
                    icon='edit'
                    iconPosition='left'
                    placeholder='Title'
                    type="text"
                    value={this.props.title}
                    onChange={this.changeTitle}
                    label='Post title'
                  />
                  <Form.Input
                    fluid
                    icon='edit'
                    iconPosition='left'
                    placeholder=''
                    type="text"
                    value={this.props.description}
                    onChange={this.changeDescription}
                    label='Post description'
                  />
                  <Form.Field
                    control={TextArea}
                    label='Post body (Markdown)'
                    placeholder='Write your post using Markdown'
                    value={this.props.body}
                    onChange={this.changeBody}
                    rows={10}
                    icon='page'
                    iconPosition='left'
                  />
                  <Form.Field
                    control={TextArea}
                    label='Tags (video, image)'
                    placeholder="Add either 'video' or 'image'"
                    value={this.props.tagInput}
                    onChange={this.changeTagInput}
                    onKeyUp={this.watchForEnter}
                    rows={2}
                    icon='tag'
                    iconPosition='left'
                  />
                  <Dropdown
                    placeholder='Tags' fluid multiple selection
                    options={TagOptions}
                    value={this.props.tagInput}
                    onChange={this.changeTagInput} 
                  /><br /><br />
                  <ReactFilepicker apikey='AtgHjDJ9wQb6bX0hLp1ILz' defaultWidget={true} options={options} /><br />
                </Segment>
                <Segment attached='bottom'>
                  <Form.Field control={Button} disabled={this.props.inProgress} onClick={this.submitForm} color='teal'>
                    Publish
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

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
