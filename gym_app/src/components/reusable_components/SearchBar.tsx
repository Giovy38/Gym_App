import React from 'react';

interface SearchBarProps {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = "Cerca...",
    value,
    onChange,
    className = ""
}) => {
    return (
        <div className={`relative ${className}`}>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 pr-10 py-2 rounded-full bg-bg-primary text-text-primary border border-border-primary focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
        </div>
    );
};

export default SearchBar; 