import React, { createContext, useContext, useState } from "react";

const PhotoContext = createContext();

export const PhotoProvider = ({ children }) => {
  const [photoUri, setPhotoUri] = useState();
  const [photoId, setPhotoId] = useState();
  const [imgResults, setImgResult] = useState([]);

  return (
    <PhotoContext.Provider
      value={{
        photoUri,
        setPhotoUri,
        photoId,
        setPhotoId,
        imgResults,
        setImgResult,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotoContext = () => {
  return useContext(PhotoContext);
};
