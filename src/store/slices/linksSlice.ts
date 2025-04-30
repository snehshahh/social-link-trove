import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Using the Link interface from types
import { Link } from '@/types/link';

interface LinksState {
  links: Link[];
  loading: boolean;
  error: string | null;
  selectedLink: string | null;
}

// Dummy data for development purposes
const dummyLinks: Link[] = [
  {
    id: '1',
    user_id: 'user123',
    url: 'https://github.com',
    title: 'GitHub - Where the world builds software',
    description: 'GitHub is where over 100 million developers shape the future of software.',
    tags: ['development', 'code'],
    bool_imp: true,
    isPublic: true,
    upvote: 42,
    downvote: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    user_id: 'user123',
    url: 'https://react.dev',
    title: 'React - A JavaScript library for building user interfaces',
    description: 'React makes it painless to create interactive UIs.',
    tags: ['frontend', 'javascript'],
    bool_imp: false,
    isPublic: true,
    upvote: 28,
    downvote: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    user_id: 'user123',
    url: 'https://redux.js.org',
    title: 'Redux - A Predictable State Container for JS Apps',
    description: 'Redux helps you write applications that behave consistently.',
    tags: ['state-management', 'javascript'],
    bool_imp: true,
    isPublic: false,
    upvote: 15,
    downvote: 0,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    user_id: 'user123',
    url: 'https://tailwindcss.com',
    title: 'Tailwind CSS - Rapidly build modern websites',
    description: 'A utility-first CSS framework packed with classes.',
    tags: ['css', 'design'],
    bool_imp: false,
    isPublic: true,
    upvote: 33,
    downvote: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    user_id: 'user123',
    url: 'https://nextjs.org',
    title: 'Next.js - The React Framework for the Web',
    description: 'Used by some of the world\'s largest companies, Next.js enables you to create full-stack web applications.',
    tags: ['react', 'framework'],
    bool_imp: true,
    isPublic: true,
    upvote: 50,
    downvote: 1,
    created_at: new Date().toISOString(),
  }
];

const initialState: LinksState = {
  links: dummyLinks, // Use dummy data instead of empty array
  loading: false,
  error: null,
  selectedLink: null,
};

export const fetchLinks = createAsyncThunk('links/fetchLinks', async () => {
  // Implement your API call here
  // For now, return dummy data
  return dummyLinks;
});

export const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    addLink: (state, action) => {
      state.links.push(action.payload);
    },
    updateLink: (state, action) => {
      const index = state.links.findIndex(link => link.id === action.payload.id);
      if (index !== -1) {
        state.links[index] = action.payload;
      }
    },
    deleteLink: (state, action) => {
      state.links = state.links.filter(link => link.id !== action.payload);
    },
    toggleImportant: (state, action) => {
      const link = state.links.find(link => link.id === action.payload);
      if (link) {
        link.bool_imp = !link.bool_imp;
      }
    },
    togglePublic: (state, action) => {
      const link = state.links.find(link => link.id === action.payload);
      if (link) {
        link.isPublic = !link.isPublic;
      }
    },
    setSelectedLink: (state, action: PayloadAction<string | null>) => {
      state.selectedLink = action.payload;
    },
    removeFromCollection: (state, action: PayloadAction<string>) => {
      const link = state.links.find(l => l.id === action.payload);
      if (link) {
        link.shared_with = link.shared_with?.filter(id => id !== state.selectedLink) || [];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLinks.fulfilled, (state, action) => {
        state.loading = false;
        state.links = action.payload;
      })
      .addCase(fetchLinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch links';
      });
  },
});

export const {
  addLink,
  updateLink,
  deleteLink,
  toggleImportant,
  togglePublic,
  setSelectedLink,
  removeFromCollection,
} = linksSlice.actions;

export default linksSlice.reducer;
