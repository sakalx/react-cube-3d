#  React cube3d UI component

> Zero dependency

> Touch support
____________________________________________________
 
## Install
```
npm install --save react-3d-cube
```

____________________________________________________
## Usage

[DEMO](https://sakalx.github.io/react-cube-3d/)

```javascript
import React from 'react';
import Cube from 'react-cube3d-component';

function App() {
  return (
        <Cube cubeSize='300px' viewportSize='500px'>
          <div>Front</div>
          <div>Back</div>
          <div>Right</div>
          <div>Left</div>
          <div>TOP</div>
          <div>Bottom</div>
        </Cube>
  );
}
```