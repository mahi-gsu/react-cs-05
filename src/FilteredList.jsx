import React, { Component } from 'react'; 
import { DropdownButton, Dropdown } from 'react-bootstrap';
import List from './List';

class FilteredList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      search: "",
      type: "All"
    };
  }

  // Sets the state whenever the user types on the search bar  
  onSearch = (event) => {
    this.setState({search: event.target.value.toLowerCase()});
  }

  // Sets the state whenever the user selects from dropdown
  onFilter = (eventKey) => {
    this.setState({
      type: eventKey
    });
  }

  filterItem = (item) => {
    // Checks if the current search term is contained in this item
    // Check both search and type filters
    const matchesSearch = item.name.toLowerCase().search(this.state.search) !== -1;
    const matchesType = this.state.type === "All" || item.type === this.state.type;
    
    return matchesSearch && matchesType;
  }

  render() {
    return (
      <div className="filter-list">
        <h1>Produce Search</h1>
        
        {/* Dropdown for filtering by type */}
        <DropdownButton 
          id="typeDropdown" 
          title={this.state.type}
          onSelect={this.onFilter}
        >
          <Dropdown.Item eventKey="All">All</Dropdown.Item>
          <Dropdown.Item eventKey="Fruit">Fruit</Dropdown.Item>
          <Dropdown.Item eventKey="Vegetable">Vegetable</Dropdown.Item>
        </DropdownButton>
        
        {/* Search input */}
        <input 
          type="text" 
          placeholder="Search" 
          onChange={this.onSearch} 
        />
        
        {/* Filtered list */}
        <List items={this.props.items.filter(this.filterItem)} />
      </div>
    );
  }
}

export default FilteredList;