import {Component} from "react";
import PropTypes from "prop-types";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {SearchHeader, SearchForma, Input, SearchBtn} from "./SearchForm.styled";
import {BsSearch} from "react-icons/bs";

class SearchForm extends Component {
  state = {
    query: ""
  }
  handleChange = e => {
    this.setState({query: e.currentTarget.value.toLowerCase().trim()})
  }
  handleSubmit = e => {
    e.preventDefault()
    if (!this.state.query) {
      toast.info('Please enter something', {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return
    }
    this.props.onSubmit(this.state.query)
    this.setState({query: ""})
  }

  render() {
    return (
      <SearchHeader>
        <SearchForma onSubmit={this.handleSubmit}>
          <Input type="text" autoComplete='off' autoFocus name='query' value={this.state.query}
                 onChange={this.handleChange}/>
          <SearchBtn type='submit'>{<BsSearch style={{verticalAlign: "middle"}}/>}</SearchBtn>
        </SearchForma>
      </SearchHeader>
    );
  }
}

export default SearchForm;
SearchForm.propTypes = {
  onSubmit: PropTypes.func,
};
