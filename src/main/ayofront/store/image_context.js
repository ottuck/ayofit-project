import React, { createContext, useContext, useState } from "react";

const PhotoContext = createContext();

export const PhotoProvider = ({ children }) => {
  const [photoUri, setPhotoUri] = useState();

  return (
    <PhotoContext.Provider value={{ photoUri, setPhotoUri }}>
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotoContext = () => {
  return useContext(PhotoContext);
};
