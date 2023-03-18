import PropTypes from "prop-types";

import {List} from "./GalleryList.styled";
import {GalleryCard} from "../GalleryCard/GalleryCard";

export const GalleryList = ({images, selectedImage}) => {
  return (
    <List>
      {
        images.map(({id, webformatURL, tags, largeImageURL}) => (
          <GalleryCard key={id} previewImg={webformatURL} tags={tags}
                       selectedImg={() => selectedImage(largeImageURL, tags)}/>
        ))
      }
    </List>
  )
}
GalleryList.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  selectedImage: PropTypes.func,
}
