import React, { Component } from 'react'
import PropTypes from "prop-types"
import ShelfChanger from './ShelfChanger'

class BookItem extends Component{
  static propTypes = {
      book: PropTypes.object.isRequired,
      changeShelf: PropTypes.func.isRequired
  };
  render(){
    const { book,changeShelf } = this.props
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
          <ShelfChanger
                          book={book}
                          changeShelf={this.props.changeShelf}/>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    )
  }

}

export default BookItem
