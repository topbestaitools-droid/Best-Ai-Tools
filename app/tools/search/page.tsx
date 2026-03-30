'use client';

import React from 'react';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import ToolCard from '../components/ToolCard';

const SearchPage = () => {
    // State for search query and filters
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedTags, setSelectedTags] = React.useState([]);

    // Dummy data for tools, replace with real data fetching
    const tools = [ /* Your array of tools */ ];

    // Filtered tools based on search query and selected tags
    const filteredTools = tools.filter(tool => {
        const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTags = selectedTags.every(tag => tool.tags.includes(tag));
        return matchesSearch && (selectedTags.length ? matchesTags : true);
    });

    return (
        <div>
            <SiteHeader />
            <div>
                <input
                    type='text'
                    placeholder='Search tools...'
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <div>
                    {filteredTools.map(tool => (
                        <ToolCard key={tool.id} tool={tool} />
                    ))}
                </div>
            </div>
            <SiteFooter />
        </div>
    );
};

export default SearchPage;