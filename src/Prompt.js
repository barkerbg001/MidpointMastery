function prompts(prompts = "pr1.txt", num = 10, artists = 2) {
    let prompt = [];
    if (prompts === "pr1.txt") {
      fetch("pr1.txt")
        .then((response) => response.text())
        .then((text) => {
          prompt = text.split("\n");
          generate(prompt, num, artists);
        });
    } else if (prompts === "pr2.txt") {
      fetch("pr2.txt")
        .then((response) => response.text())
        .then((text) => {
          prompt = text.split("\n");
          generate(prompt, num, artists);
        });
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
  
      console.log([...new Set(generated)].join(", "));
    }
  }
export default prompts;  