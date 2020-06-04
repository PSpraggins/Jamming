import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            searchTerm: ''
        }

        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    search(){
        this.props.onSearch(this.state.searchTerm);
    }

    handleTermChange(event){
        this.setState({searchTerm: event.target.value});
    }
    handleEnter(event){
        if(event.keyCode === 13){
            event.preventDefault();
            this.search();
        }
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange = {this.handleTermChange} onKeyUp = {this.handleEnter}/>
                <button className="SearchButton" onClick={this.search} >SEARCH</button>
            </div>
        );
    }
}

export default SearchBar;