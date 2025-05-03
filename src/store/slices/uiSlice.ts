import { createSlice } from '@reduxjs/toolkit';

interface UISlice {
  showSharePopup: boolean;
  showPublicConfirmation: boolean;
  showCollectionDialog: boolean;
  selectedLinkId: string | null;
}

const initialState: UISlice = {
  showSharePopup: false,
  showPublicConfirmation: false,
  showCollectionDialog: false,
  selectedLinkId: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setShowSharePopup: (state, action) => {
      state.showSharePopup = action.payload;
    },
    setShowPublicConfirmation: (state, action) => {
      state.showPublicConfirmation = action.payload;
    },
    setShowCollectionDialog: (state, action) => {
      state.showCollectionDialog = action.payload;
    },
    setSelectedLinkId: (state, action) => {
      state.selectedLinkId = action.payload;
    },
  },
});

export const {
  setShowSharePopup,
  setShowPublicConfirmation,
  setShowCollectionDialog,
  setSelectedLinkId,
} = uiSlice.actions;

export default uiSlice.reducer;
