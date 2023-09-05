import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IUploadImages {
  url: string;
}

export const uploadImageSlice = createSlice({
  name: 'uploadImageSlice',
  initialState: {
    uploadImages: [
      { url: '' },
      { url: '' },
      { url: '' },
    ] as Array<IUploadImages>,
  },
  reducers: {
    setImages(state, action: PayloadAction<{ index: number; url: string }>) {
      // state.uploadImages = [...state.uploadImages, action.payload];
      const { index, url } = action.payload;
      state.uploadImages[index] = { url };
    },
    oldImages(state, action: PayloadAction<{ index: number; url: string }>) {
      // state.uploadImages = [...state.uploadImages, action.payload];
      const { index, url } = action.payload;
      state.uploadImages[index] = { url };
    },
    removeThatImage(state, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload;
      state.uploadImages[index] = { url: '' };
    },
    removeAllImage(state) {
      state.uploadImages = [{ url: '' }, { url: '' }, { url: '' }];
    },
  },
});
