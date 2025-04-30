import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Collection {
  id: string;
  name: string;
  description?: string;
  links: string[];
  createdAt: string;
  updatedAt: string;
}

interface CollectionsState {
  collections: Collection[];
  loading: boolean;
  error: string | null;
}

// Dummy collections for development purposes
const dummyCollections: Collection[] = [
  {
    id: '1',
    name: 'Web Development',
    description: 'Resources for web development',
    links: ['1', '2', '5'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Design Inspiration',
    description: 'UI/UX design resources',
    links: ['4'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'JavaScript Frameworks',
    description: 'Modern JS frameworks and libraries',
    links: ['2', '3', '5'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const initialState: CollectionsState = {
  collections: dummyCollections,
  loading: false,
  error: null,
};

export const fetchCollections = createAsyncThunk('collections/fetchCollections', async () => {
  // Implement your API call here
  // For now, return dummy data
  return dummyCollections;
});

export const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    addCollection: (state, action) => {
      state.collections.push(action.payload);
    },
    updateCollection: (state, action) => {
      const index = state.collections.findIndex(collection => collection.id === action.payload.id);
      if (index !== -1) {
        state.collections[index] = action.payload;
      }
    },
    deleteCollection: (state, action) => {
      state.collections = state.collections.filter(collection => collection.id !== action.payload);
    },
    addLinkToCollection: (state, action) => {
      const collection = state.collections.find(collection => collection.id === action.payload.collectionId);
      if (collection) {
        collection.links.push(action.payload.linkId);
      }
    },
    removeLinkFromCollection: (state, action) => {
      const collection = state.collections.find(collection => collection.id === action.payload.collectionId);
      if (collection) {
        collection.links = collection.links.filter(linkId => linkId !== action.payload.linkId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.loading = false;
        state.collections = action.payload;
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch collections';
      });
  },
});

export const {
  addCollection,
  updateCollection,
  deleteCollection,
  addLinkToCollection,
  removeLinkFromCollection,
} = collectionsSlice.actions;

export default collectionsSlice.reducer;
