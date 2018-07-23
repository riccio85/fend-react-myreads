import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import BookItem from './BookItem'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'


class SearchBook extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBooks: PropTypes.func.isRequired
  }

  state = {
    results: [],
    noBookFound: false,
    query: ''
  }

  whichShelf = (book) => {
    const matchBook = this.props.books.filter( (bookOnShelf) => book.id === bookOnShelf.id)
    if(matchBook.length>0)
      return matchBook[0].shelf
    else
      return 'none'
  }

  changeShelf = (book, newShelf) => {
      BooksAPI.update(book, newShelf).then(() => {
          book.shelf = newShelf;
          this.props.updateBooks(book);
      })
  }

  handleQueryChange = (event) => {
     const query = event.target.value
     this.setState({ query: query })

     if( query || 0 !== query.length )
      this.performSearch(query)
     else
      this.setState({ results: [] })
 }

  clearQuery = () => {
    this.setState({ query: '',results: [] })
  }

  performSearch = (query) => {
    BooksAPI.search(query, 20).then((books) => {
      if(books.length > 0){
        books.forEach( (book) => { book.shelf = this.whichShelf(book)  })
        this.setState({results: books, noBookFound:false })
      } else {
        this.setState({ results: [],noBookFound:true })
      }
    })
  }

  render(){
    const { results,query } = this.state

    return(
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search" >Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author"
                    value={query}
                    onChange={event => this.handleQueryChange(event)}
              />
            </div>
          </div>
          { this.state.noBookFound &&
            <h2 className="search-books-info">
              Sorry no result found :( !!!!
            </h2>
          }
          <div className="search-books-results">
            <ol className="books-grid">
              { results.map(
                (book) =>
                  <li key={book.id} >
                    <BookItem book={book} changeShelf={this.changeShelf} />
                  </li>
              )}
            </ol>
          </div>
        </div>
    )
  }
}



export default SearchBook
