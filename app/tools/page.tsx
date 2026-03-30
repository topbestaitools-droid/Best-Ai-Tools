import React from 'react';
import ToolCard from '../components/ToolCard';

const Page = () => {
  const [tools, setTools] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/tools') // Adjust the API route as necessary
      .then(response => response.json())
      .then(data => setTools(data));
  }, []);

  return (
    <div>
      <h1>All AI Tools</h1>
      <div className="tool-list">
        {tools.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
};

export default Page;