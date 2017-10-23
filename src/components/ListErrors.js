import React from 'react';
import { Message } from 'semantic-ui-react'

const handleDismiss = () => {
  this.setState({ visible: false })
}

class ListErrors extends React.Component {
  render() {
    const errors = this.props.errors;
    if (errors) {
      return (
        <Message
          negative
          header='Whoops! Could you check something?!'
          content={this.props.errors}
          onDismiss={handleDismiss}
        >
          <div>
            {
              Object.keys(errors).map(key => {
                return (
                  <p key={key}>
                    {key} {errors[key]}
                  </p>
                );
              })
            }
          </div>
        </Message>
      );
    } else {
      return null;
    }
  }
}

export default ListErrors;
