import React from 'react';
import PostArticle from './components/PostArticle'; // Adjust the import path if necessary

function News() {
    return (
        <div className="flex flex-col h-full">
            <PostArticle />
        </div>
    );
}

export default News;