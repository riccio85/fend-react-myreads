import React, { Component } from "react"
import PropTypes from 'prop-types'


class ShelfChanger extends Component{
    static propTypes = {
        book: PropTypes.object.isRequired,
        changeShelf: PropTypes.func.isRequired
    }

    state = {
       currentShelf: this.props.book.shelf
    }

    changeShelf = (event) => {
      // console.log();
        this.props.changeShelf(this.props.book, event.target.value);
        this.setState({
            currentShelf: event.target.value
        });
    };

    componentWillUnMount(){
    // componentWillReceiveProps(){
        this.props.changeShelf(this.props.book,this.state.currentShelf)
    }

    render(){
        return(
            <div className="book-shelf-changer">
                <select
                    value={this.state.currentShelf}
                    onChange={this.changeShelf}
                >
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default ShelfChanger;
