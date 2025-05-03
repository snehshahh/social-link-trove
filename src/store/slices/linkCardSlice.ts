import { createSlice } from '@reduxjs/toolkit';

interface LinkCardState {
  isEditing: boolean;
  editedNotes: string;
  isSaving: boolean;
  showFullDescription: boolean;
  isPreviewOpen: boolean;
}

const initialState: LinkCardState = {
  isEditing: false,
  editedNotes: '',
  isSaving: false,
  showFullDescription: false,
  isPreviewOpen: false,
};

export const linkCardSlice = createSlice({
  name: 'linkCard',
  initialState,
  reducers: {
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setEditedNotes: (state, action) => {
      state.editedNotes = action.payload;
    },
    setIsSaving: (state, action) => {
      state.isSaving = action.payload;
    },
    setShowFullDescription: (state, action) => {
      state.showFullDescription = action.payload;
    },
    setIsPreviewOpen: (state, action) => {
      state.isPreviewOpen = action.payload;
    },
  },
});

export const {
  setIsEditing,
  setEditedNotes,
  setIsSaving,
  setShowFullDescription,
  setIsPreviewOpen,
} = linkCardSlice.actions;

export default linkCardSlice.reducer;
