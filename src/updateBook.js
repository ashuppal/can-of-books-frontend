import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

class UpdateBook extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      _id: props.book._id,
      title: props.book.title,
      description: props.book.description,
      status: props.book.status
    }
  }

  handleTitle = e => {
    this.setState({ title: e.target.value })
  }
  handleDescription = e => {
    this.setState({ description: e.target.value })
  }
  handleStatus = e => {
    this.setState({ status: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.handleUpdate(this.state)
    this.props.closeModal()
  }

  render () {
    return (
      <Modal show={this.props.showModal} onHide={this.props.hideUpdateModal}>
        <form onSubmit={this.handleSubmit}>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            name='description'
            onChange={this.handleTitle}
            value={this.state.title}
          />

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              name='description'
              onChange={this.handleDescription}
              value={this.state.description}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Control
              type='text'
              name='status'
              onChange={this.handleStatus}
              value={this.state.status}
            />
          </Form.Group>

          <Button type='submit'>Let's Update!</Button>
        </form>
      </Modal>
    )
  }
}

export default UpdateBook
