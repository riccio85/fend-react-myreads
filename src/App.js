import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'
import * as BooksAPI from './BooksAPI'
import './App.css'


class BooksApp extends React.Component {
  state = {
    books: []
  }

  updateBooks = (book) => {
    this.setState(state => ({
      books: this.state.books.filter(b => b.id !== book.id).concat([ book ])
    }));
  }

  componentDidMount(){
    BooksAPI.getAll().then(
      (books)=> {
        console.log('books',books);
        this.setState({books})
      }
    );
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
              <ListBooks books={this.state.books} updateBooks={this.updateBooks}/>
           )}
        />
        <Route path="/search" render={({ history })=>(
              <SearchBook books={this.state.books} updateBooks={this.updateBooks} />
            )}
        />
      </div>
    )
  }
}

export default BooksApp
