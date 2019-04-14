import React from 'react';
import {render} from 'react-dom';
import Cube from '../../src';

function App() {
  return (
      <div>
        <Cube>
          <div>Front</div>
          <div>Back</div>
          <div>Right</div>
          <div>Left</div>
          <div>TOP</div>
          <div>Bottom</div>
        </Cube>
      </div>
  );
}

render(<App/>, document.getElementById('root'));