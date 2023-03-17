import './App.css';
import { useState } from 'react';

function prompts(prompts = "pr1.txt", num = 10, artists = 2) {
  return new Promise((resolve, reject) => {
    let prompt = [];
    if (prompts === "pr1.txt") {
      fetch("pr1.txt")
        .then((response) => response.text())
        .then((text) => {
          prompt = text.split("\n");
          const generatedPrompts = generate(prompt, num, artists);
          resolve(generatedPrompts);
        })
        .catch(reject);
    } else if (prompts === "pr2.txt") {
      fetch("pr2.txt")
        .then((response) => response.text())
        .then((text) => {
          prompt = text.split("\n");
          const generatedPrompts = generate(prompt, num, artists);
          resolve(generatedPrompts);
        })
        .catch(reject);
    }

    function generate(prompt, num_word, artists) {
      let vocab = prompt.length;
      let generated = [];
      let artists_num = 0;

      while (
        [...new Set(generated)].length < num_word &&
        generated.length < vocab
      ) {
        let rand = Math.floor(Math.random() * vocab);
        if (
          prompt[rand].startsWith("art by") &&
          artists_num < artists &&
          !generated.includes(prompt[rand])
        ) {
          artists_num += 1;
          generated.push(prompt[rand]);
        } else if (
          !prompt[rand].startsWith("art by") &&
          !generated.includes(prompt[rand])
        ) {
          generated.push(prompt[rand]);
        }
      }

      return [...new Set(generated)];
    }
  });
}

function App() {
  const [generatedPrompts, setGeneratedPrompts] = useState([]);

  const handleGeneratePrompts = () => {
    prompts("pr1.txt", 20, 2)
      .then((promptsArray) => {
        setGeneratedPrompts([...promptsArray]); // add spread operator here
      })
      .catch((error) => {
        console.error(error);
      });

    const textToCopy = generatedPrompts.join(', ');
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img onClick={handleGeneratePrompts} src={logo} className="App-logo" alt="logo" />
        {/* <p>
        {generatedPrompts.join(', ')}
        </p> */}
      </header>
    </div>
  );
}


export default App;
