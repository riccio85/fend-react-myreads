import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import BookItem from './BookItem'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'


class SearchBook extends Component {
  static propTypes = {
    updateBooks: PropTypes.func.isRequired
  }

  state = {
    results: [],
    query: ''
  }

  changeShelf = (book, newShelf) => {
      console.log('changed shelf on search', newShelf)
      BooksAPI.update(book, newShelf).then(() => {
          book.shelf = newShelf;
          console.log('book shelf on search', book)
          this.props.updateBooks(book);
      })
  }

  handleQueryChange(event) {
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
      books.length > 0 ?  this.setState({results: books}) : this.setState({ results: [] })
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
