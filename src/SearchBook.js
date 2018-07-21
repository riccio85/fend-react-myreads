import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import BookItem from './BookItem'
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


class SearchBook extends Component {
  state = {
    results: [],
    query: ''
  }

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

    // let showSearchResult
    // if(query){
    //   const match = new RegExp((this.state.query), 'i')
    //   showSearchResult = results.filter((book) => match.test(book.name) )
    // }else {
    //   showSearchResult = this.props.results
    // }

    //showSearchResult.sort(sortBy('name'))

    return(
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search" >Close</Link>
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
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
                       <BookItem book={book}/>
                     </li>
              )}
            </ol>
          </div>
        </div>
    )
  }
}



export default SearchBook
