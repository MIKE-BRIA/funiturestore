// //!Hook that is for image previewing when one uploads a new image

import { useState } from "react";
import useShowToast from "./useShowToast.js";

const usePreviewImg = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const showToast = useShowToast();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log("Selected file:", file); // Debugging log

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // console.log("FileReader result:", reader.result); // Debugging log
        setImgUrl(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      showToast(
        "Invalid file type",
        "Please select an image file type",
        "error"
      );
      setImgUrl(null);
    }
  };

  // console.log(imgUrl); // Debugging log

  return { handleImageChange, imgUrl, setImgUrl };
};

export default usePreviewImg;
