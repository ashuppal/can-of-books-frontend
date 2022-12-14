import React from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Carousel from 'react-bootstrap/Carousel'
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
  showModal = () => {
    this.setState({ showAddModal: true })
  }

  hideModal = () => {
    this.setState({ showAddModal: false })
  }

  handelAddModal = async (book) => {
   console.log(book);
    const addResult = await axios.post(process.env.REACT_APP_SERVER_URL +"/books", {
      title: book.title,
      description: book.description,
      status: book.status
    })

    this.setState({books:[...this.state.books, addResult.data]})
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
<div class="carousel slide mx-auto" style={{ height: '55%', width: '60%'}}>
        {this.state.books.length
          ? <Carousel showBooks = {this.state.books.length}>
          {this.state.books.map(book => {
              return (
                 
                    <Carousel.Item interval ={3000}>
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
                    </Carousel.Caption>
                    </Carousel.Item>
                 
                
              );
               
            })}
            
            </Carousel> 
            
          : <p>There are no books</p>}
          </div>
      </>
      
    )
    
  }

  
}
        

export default BestBooks
