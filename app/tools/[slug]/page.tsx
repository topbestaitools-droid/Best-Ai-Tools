import React from 'react';
import { getToolDetails } from '@/lib/tools';

const ToolDetailPage = ({ tool }) => {
    return (
        <div className="p-4">
            <img src="/path/to/clearbit-logo.png" alt="Clearbit Logo" className="w-20 h-auto" />
            <h1 className="text-2xl font-bold">{tool.name}</h1>
            <div className="flex"> {/* Ratings & Reviews */} </div>
            <div className="bg-green-500 text-white rounded-lg p-2 mt-2">${tool.pricing}</div>
        </div>
    );
};

export default ToolDetailPage;
export async function getServerSideProps(context) {
    const { slug } = context.params;
    const tool = await getToolDetails(slug);
    return { props: { tool } };
}