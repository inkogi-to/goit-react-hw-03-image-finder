import {Component} from 'react'
import PropTypes from 'prop-types';
import {ToastContainer, toast} from 'react-toastify';
import {Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as API from '../service/api.js'

import SearchForm from "./searchForm/searchForm";
import Modal from "./modal/Modal";
import {GalleryList} from "./GalleryList/GalleryList";
import {LoadMore} from "./LoadMore/LoadMore";
import {GlobalStyle} from "./GlobalStyle.styled";
import {Container} from "./Container.styled";
import {Loader} from "./loader/Loader";


class App extends Component {
  static propTypes = {searchQuery: PropTypes.string.isRequired}
  state = {
    query: '',
    images: [],
    page: 1,
    selectedImage: null,
    alt: '',
    loading: false,
    error: null
  }
  totalHits = null

  async componentDidUpdate(_, prevState) {
    const {query, page} = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({loading: true})

      try {
        const getImages = await API.fetchImages(page, query);
        this.totalHits = getImages.total
        const imageHits = getImages.hits

        if (!imageHits.length) {
          toast.warning(
            'No results were found for your search, please try something else.',
            {transition: Zoom, position: 'top-left'}
          );
        }

        this.setState(({images}) => ({
          images: [...images, ...imageHits],
          loading: false,
        }))
        if (page > 1) {
          const CARD_HEIGHT = 300;
          window.scrollBy({
            top: CARD_HEIGHT * 2,
            behavior: 'smooth',
          });
        }

      } catch (error) {
        this.setState({loading: false, error: error})
        console.log(error)
      }
    }

  }

  resetState = () => {
    this.setState({
      query: '',
      page: 1,
      images: []
    })
  }

  handleFormSubmit = query => {
    if (this.state.query === query) {
      return
    }

    this.resetState()
    this.setState({query})
  }
  handleImageSelect = (largeImageUrl, tags) => {
    this.setState({selectedImage: largeImageUrl, alt: tags,})
  }
  closeModal = () => {
    this.setState({selectedImage: null})
  }
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }

  render() {
    const {images, selectedImage, alt, loading, error} = this.state
    return (
      <Container>
        <SearchForm onSubmit={this.handleFormSubmit}/>
        <ToastContainer autoClose={3000} theme="colored" pauseOnHover/>
        {error && (
          <h1 style={{color: 'orangered', textAlign: 'center'}}>
            {error.message}
          </h1>
        )}
        {images.length > 0 && (
          <GalleryList images={images} selectedImage={this.handleImageSelect}/>)}
        {images.length > 0 && images.length !== this.totalHits && (<LoadMore onClick={this.loadMore}/>)}
        {this.state.selectedImage && (
          <Modal selectedImage={selectedImage} tags={alt} onClose={this.closeModal}/>)}
        {loading && (<Loader onLoad={loading}/>)}
        <GlobalStyle/>
      </Container>
    )
  }
}

export default App
