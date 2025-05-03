import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLinks } from '@/store/slices/linksSlice';
import { fetchCollections } from '@/store/slices/collectionsSlice';
import { AppDispatch } from '@/store';

export function DataInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log('DataInitializer: Loading initial data');
    // Dispatch actions to load initial data
    dispatch(fetchLinks());
    dispatch(fetchCollections());
  }, [dispatch]);

  return null; // This component doesn't render anything
}
