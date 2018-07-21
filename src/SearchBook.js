import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import BookItem from './BookItem'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


class SearchBook extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    // changeShelf: PropTypes.func.isRequired
  }

  state = {
    results: [],
    query: ''
  }

  changeShelf = (book, newShelf) => {
      console.log('changed shelf', newShelf)
      BooksAPI.update(book, newShelf).then(() => {
          // Update the local copy of the book
          book.shelf = newShelf;
          // Filter out the book and append it to the end of the list
          this.setState(state => ({
            books: this.props.books.filter(b => b.id !== book.id).concat([ book ])
              // books: books
          }));
      });
    };

  handleQueryChange(event) {
     const query = event.target.value
     // this.setState({ query: query.trim() })
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
