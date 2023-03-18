import {createPortal} from "react-dom";

import ScaleLoader from "react-spinners/ScaleLoader";
import {LoaderContainer} from "./Loader.styled";

const loadingRoot = document.getElementById("root-loading");

export const Loader = ({onLoad}) => {
  return createPortal(
    <LoaderContainer>
      <ScaleLoader
        color="#fff"
        height={51}
        loading={onLoad}
        margin={6}
        radius={34}
        width={5}
      />
    </LoaderContainer>, loadingRoot
  );
}
