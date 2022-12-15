import React from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Carousel from 'react-bootstrap/Carousel'
import AddBook from './AddBook'
import Button from 'react-bootstrap/Button';
import UpdateBook from './updateBook'

class BestBooks extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      books: [],
      search: '',
      showAddModal: false,
      selectedBook: null,
      showUpdateModal: false
    }
  }
  showModal = () => {
    this.setState({ showAddModal: true })
  }

  hideModal = () => {
    this.setState({ showAddModal: false })
  }

  hideUpdateModal =()=> this.setState({showUpdateModal:false})
  handelAddModal = async book => {
    console.log(book)
    const addResult = await axios.post(
      process.env.REACT_APP_SERVER_URL + '/books', book)
      // {
      //   title: book.title,
      //   description: book.description,
      //   status: book.status
      // }


    this.setState({ books: [...this.state.books, addResult.data] })
  }

  deleteBook = async id => {
    try {
      let url = `${process.env.REACT_APP_SERVER_URL}/books/${id}`
      await axios.delete(url)
      let deletedBooks = this.state.books.filter(book => book._id !== id)
      this.setState({
        books: deletedBooks
      })
    } catch (err) {
      console.log('An error has occured ', err)
    }
  }


  updateRequest = async (book) => {
    // make our request
    console.log(book);
    let response = await axios.put(process.env.REACT_APP_SERVER_URL + `/cats/${book._id}`, {
      title: book.title,
      description: book.description,
      status: book.status,
    
    });
    let updatedBook = response.data;
    console.log(this.state.cats, updatedBook);
    // set our components state with our updated cat.
    // this.setState({ cats: this.state.cats.map(cat => {
    //   if (cat._id === updatedCat._id) {
    //     return updatedCat;
    //   } else {
    //     return cat;
    //   }
    // })
    // });
    this.fetchCats();
  }

  componentDidMount = () => {
    this.fetchBooks()
  }
  handleChange = event => {
    this.setState({ search: event.target.value })
  }
  fetchBooks = async bookTitle => {
    let request = {
      method: 'GET',
      url: `${process.env.REACT_APP_SERVER_URL}/books`
    }
    if (bookTitle) {
      request.url += `?title=${bookTitle}`
    }
    let response = await axios(request)
    this.setState({
      books: response.data
    })
  }

  handleAddBook = () => {}

  render () {
    console.log(this.state)
    return (
      <>
        <input onChange={this.handleChange} type='text' />
        <button onClick={() => this.fetchBooks(this.state.search)}>
          Search
        </button>

        <AddBook
          show={this.state.showAddModal}
          hideModal={this.hideModal}
          handelAddModal={this.handelAddModal}
        />

        <button onClick={this.showModal}>Add a book</button>
        <div
          class='carousel slide mx-auto'
          style={{ height: '55%', width: '60%' }}
        >
          {this.state.books.length ? (
            <Carousel >
              {this.state.books.map(book => {
                return (
                  <Carousel.Item interval={3000}>
                    <div>
                      <img
                        className='d-block w-100'
                        src='https://images.unsplash.com/photo-1568301956237-25a54f5f0d21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80'
                        alt={book.title}
                        class='img-fluid'
                      />
                    </div>
                    <Carousel.Caption>
                      <h3>{book.title}</h3>
                      <p>{book.description}</p>
                      <p>{book.status}</p>
                      <Button
                      variant="danger"
                      onClick={() => this.deleteBook(book._id)}
                    >
                      Delete? ok! if you say so!
                    </Button>
                    <Button 
                    onClick={()=> this.setState({selectedBook : book, showUpdateModal: true })}>
                    Update this book</Button>
                    </Carousel.Caption>
                  </Carousel.Item>
                )
              })}
            </Carousel>
          ) : (
            <p>There are no books</p>
          )}
          {this.state.showUpdateModal
          ? <UpdateBook
              book={this.state.selectedBook}
              handleUpdate={this.updateRequest}
              showModal = {this.state.showUpdateModal}
              hideUpdateModal ={this.hideUpdateModal}
            />
          : null
        }
      </div>
  
      </>
    )
  }
}

export default BestBooks
