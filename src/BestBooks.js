import React from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Carousel from 'react-bootstrap/Carousel';
import AddBook from './AddBook'

class BestBooks extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      books: [],
      search: '',
      showAddModal: false
    }
  }
  handleDisplayModal = () => {
    this.setState({ showAddModal: true })
  }

  hideModal = () => {
    this.setState({ showAddModal: false })
  }

  // handelAddModal = e => {
  //   e.preventDefault()
  //   const addResult = {
  //     title: e.target.title.value,
  //     description: e.target.description.value,
  //     status: e.target.status.value
  //   }
  // }

  componentDidMount = () => {
    this.fetchBooks()
  }
  handleChange = event => {
    this.setState({ search: event.target.value })
  }
  fetchBooks = async bookTitle => {
    console.log('fetching book')
    console.log(bookTitle)
    let request = {
      method: 'GET',
      url: `${process.env.REACT_APP_SERVER_URL}/books`
    }
    if (bookTitle) {
      request.url += `?title=${bookTitle}`
    }
    let response = await axios(request)
    console.log(response)
    this.setState({
      books: response.data
    })
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  handleAddBook = () => {}

  render () {
    console.log(this.state)

    /* TODO: render all the books in a Carousel */

    return (
      <>
      <input onChange={this.handleChange} type='text' />
        <button onClick={() => this.fetchBooks(this.state.search)}>
          Search
        </button>
        {this.state.showAddModal && (
          <>
            <AddBook
              show={this.state.showAddModal}
              hideModal={this.hideModal}
              handelAddModal={this.handelAddModal}
            />
          </>
        )}
        <button onClick={this.handleDisplayModal}>Add a book</button>

        
        {this.state.books.length
          ? this.state.books.map(book => {
              return (
                
                <div style={{ height: '50%', width: '100%' }}>
                  <Carousel>
                    <img
                      className='d-block w-100'
                      src='https://via.placeholder.com/800x400'
                      alt={book.title}
                    />
                    <Carousel.Item>
                      <h3>{book.title}</h3>
                      <p>{book.description}</p>
                      <p>{book.status}</p>
                    </Carousel.Item>
                  </Carousel>
                 
                </div>
              )
            })
          : null}
      </>
    )
  }
}

export default BestBooks
