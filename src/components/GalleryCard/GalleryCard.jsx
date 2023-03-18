import PropTypes from "prop-types";

import {Card, Img} from "./GalleryCard.styled";

export const GalleryCard = ({tags, previewImg, selectedImg}) => {
  return (
    <Card>
      <Img src={previewImg} alt={tags} onClick={selectedImg}/>
    </Card>
  )
}
GalleryCard.propTypes = {
  tags: PropTypes.string.isRequired,
  previewImg: PropTypes.string.isRequired,
  selectedImage: PropTypes.func,
}
