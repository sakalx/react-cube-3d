import React, {useState} from 'react';
import {render} from 'react-dom';
import Cube from '../../src';

import './style.css';

function App() {
  const bodyStyle = document.body.style;
  const [selected, setSelected] = useState('');
  const [reveal, setReveal] = useState(false);

  const handleMouseDown = () => {
    bodyStyle.setProperty('--cursor', 'grabbing');
  };

  const handleMouseUp = () => {
    bodyStyle.setProperty('--cursor', 'grab');
  };

  const handleClick = ({target}) => {
    setSelected(target.textContent);
  };

  const handleToggleReveal = () => {
    setReveal(reveal => !reveal);
  };

  return (
      <main>
        <header>
          <h2>Selected: {selected}</h2>
          <button onClick={handleToggleReveal}>REVEAL CUBE</button>
        </header>
        <span>Viewport size: 500px</span>
        <Cube
            className='cube-viewport'
            cubeSize='300px'
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            reveal={reveal}
            viewportSize='500px'
        >
          <section onClick={handleClick} style={{background: '#b1e6f0'}}>
            <h1>Front</h1>
          </section>
          <section onClick={handleClick} style={{background: '#ff7473'}}>
            <h1>Back</h1>
          </section>
          <section onClick={handleClick} style={{background: '#9b59b6'}}>
            <h1>Right</h1>
          </section>
          <section onClick={handleClick} style={{background: '#58c890'}}>
            <h1>Left</h1>
          </section>
          <section onClick={handleClick} style={{background: '#3393fd'}}>
            <h1>TOP</h1>
          </section>
          <section onClick={handleClick} style={{background: '#5e548e'}}>
            <h1>Bottom</h1>
          </section>
        </Cube>
      </main>
  );
}

render(<App/>, document.getElementById('root'));