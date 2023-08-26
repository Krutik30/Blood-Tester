import { useState } from 'react';

function App() {

  async function submitPrompt (){
    // const prompt = form.prompt.value;
    // const response = await fetch(`http://localhost:3000/generate/`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ prompt }),
    // });
    axios.post('http://localhost:3000/generate/',{
      prompt: 'what is blood group'
    })
    .then((Response) => {
      console.log(Response)
    }, (err) => console.log(err))
    
  }

  return (
    <div className="App">
      <h1>OpenAI API Demo</h1>
        <form id="promptForm">
            <label for="prompt">Enter a prompt:</label>
            <input type="text" id="prompt" name="prompt" required />
            <button type="submit" onClick={()=>{submitPrompt()}}>Generate Text</button>
        </form>
      <div id="output"></div>    
    </div>
  )
}

export default App
