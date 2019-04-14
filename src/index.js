import React, {useEffect} from 'react';

import './style.css';

function Cube({
                children,
                cubeSize = '300px',
                viewportSize = '350px',
              }) {
  let isUpperSideDown = false;
  const bodyStyle = document.body.style;

  const x = {
    current: 0,
    prevPosition: 0,
    startPosition: 0,
  };
  const y = {
    current: 0,
    prevPosition: 0,
    startPosition: 0,
  };

  useEffect(() => {
    const cubeSizeSplitted = cubeSize.split(/(\d+)/);
    const translateZ = (cubeSizeSplitted[1] / 2)+ cubeSizeSplitted[2];

    bodyStyle.setProperty('--cube-size', cubeSize);
    bodyStyle.setProperty('--viewport-size', viewportSize);
    bodyStyle.setProperty('--translateZ', translateZ);
  }, []);

  const rotate = (x, y) => {
    bodyStyle.setProperty('--x', x + 'deg');
    bodyStyle.setProperty('--y', y + 'deg');
  };

  const handleStartMoving = e => {
    x.startPosition = e.clientX;
    y.startPosition = e.clientY;
  };

  const handleStopMoving = () => {
    if (x.startPosition) {
      const normalizeY = Math.abs(y.current % 360);
      isUpperSideDown = normalizeY >= 90 && normalizeY <= 270;
      x.startPosition = y.startPosition = 0;
      x.prevPosition = x.current;
      y.prevPosition = y.current;
    }
  };

  const handleMove = e => {
    if (x.startPosition) {
      const distanceX = e.clientX - x.startPosition;
      const distanceY = e.clientY - y.startPosition;

      const nextX = isUpperSideDown
          ? x.prevPosition - distanceX
          : x.prevPosition + distanceX;
      const nextY = y.prevPosition - distanceY;

      const isXChanged = nextX > x.current + 20 || nextX < x.current - 20;
      const isYChanged = nextY > y.current + 20 || nextY < y.current - 20;

      if (isXChanged || isYChanged) {
        x.current = nextX;
        y.current = nextY;
        rotate(nextX, nextY);
      }
    }
  };

  return (
      <div
          id='cube-viewport'
          onMouseDown={handleStartMoving}
          onMouseMove={handleMove}
          onMouseUp={handleStopMoving}
          onMouseOut={handleStopMoving}
          onTouchStart={e => handleStartMoving(e.changedTouches[0])}
          onTouchMove={e => handleMove(e.changedTouches[0])}
          onTouchEnd={handleStopMoving}>
        <div id='cube-axis'>
          {children.map((component, i) =>
              <div
                  className='cube-side'
                  id={`cube-side-${i}`}
                  key={String(i)}
              >
                {component}
              </div>,
          )}
        </div>
      </div>
  );
}

export default Cube;
