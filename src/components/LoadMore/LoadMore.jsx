import PropTypes from "prop-types";

import {Btn} from "./LoadMore.styled";

export const LoadMore = ({onClick}) => {
  return (
    <Btn type='button' onClick={onClick}>Load More</Btn>
  )
}
LoadMore.propTypes = {
  onClick: PropTypes.func
}
