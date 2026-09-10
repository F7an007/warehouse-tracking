import React, { useState, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';

const SearchBar = ({ 
  value, 
  initialValue = '',
  onChange, 
  onSearch,
  onClear, 
  placeholder = 'ค้นหาด้วยเลขพัสดุ, ชื่อผู้ส่ง หรือผู้รับ...', 
  isSearching = false, 
  autoFocus = false, 
  className = '' 
}) => {
  const [internalValue, setInternalValue] = useState(value !== undefined ? value : initialValue);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    } else if (initialValue !== undefined) {
      setInternalValue(initialValue);
    }
  }, [value, initialValue]);

  const handleChange = (e) => {
    const val = e.target.value;
    setInternalValue(val);
    if (onChange) onChange(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(internalValue);
  };

  const handleClear = () => {
    setInternalValue('');
    if (onClear) onClear();
    if (onChange) onChange('');
    if (onSearch) onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className={`relative flex items-center w-full ${className}`}>
      <div className="absolute left-4 text-gray-400">
        {isSearching ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6" />}
      </div>
      
      <input
        type="text"
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full py-4 pl-12 pr-12 text-lg bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow focus:shadow-md min-h-[48px]"
      />
      
      {internalValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
          aria-label="ลบข้อความ"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
