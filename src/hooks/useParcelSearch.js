import { useState, useEffect, useCallback } from 'react';

export function useParcelSearch(parcels, delay = 300) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), delay);
    return () => clearTimeout(timer);
  }, [query, delay]);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults(parcels);
      return;
    }
    const q = debouncedQuery.toLowerCase();
    const filtered = parcels.filter(p =>
      p.trackingNumber.toLowerCase().includes(q) ||
      p.senderName.toLowerCase().includes(q) ||
      p.recipientName.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [debouncedQuery, parcels]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
    setResults(parcels);
  }, [parcels]);

  return { query, setQuery, results, clearSearch, isSearching: query !== debouncedQuery };
}
