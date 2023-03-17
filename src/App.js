import { useState } from 'react';
import { prompts } from './prompts';

function App() {
  const [generatedPrompts, setGeneratedPrompts] = useState([]);

  const handleGeneratePrompts = () => {
    const promptsArray = prompts("pr1.txt", 10, 2);
    setGeneratedPrompts(promptsArray);
  };

  return (
    <div>
      <button onClick={handleGeneratePrompts}>Generate Prompts</button>
      <ul>
        {generatedPrompts.map((prompt, index) => (
          <li key={index}>{prompt}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
