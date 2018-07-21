import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import BookItem from './BookItem.js'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component{
  static propTypes = {
    books: PropTypes.array.isRequired,
    // changeShelf: PropTypes.func.isRequired
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

  render(){
    const { books } = this.props
    const shelfTypes = [{ type: 'currentlyReading', title: 'Currently Reading' },
                    { type: 'wantToRead',  title: 'Want to Read' },
                    { type: 'read', title: 'Read'}]

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
              {shelfTypes.map((shelf, index) =>  {
                return (
                  <div className="bookshelf" key={index}>
                    <h2 className="bookshelf-title">{ shelf.title }</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        { books.filter( (book) => book.shelf === shelf.type ).map(
                          (book) =>
                               <li key={book.id} >
                                 <BookItem book={book} changeShelf={this.changeShelf} />
                               </li>
                        )}
                       </ol>
                    </div>
                  </div> )
              })}
        </div>
        <div className="open-search">
           <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }

}

export default ListBooks
