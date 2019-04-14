import React, {useEffect, useRef} from 'react';

import './style.css';

function Cube({
                children,
                cubeSize = '300px',
                viewportSize = '350px',
                ...rest
              }) {
  const viewportEl = useRef(null);
  let isUpperSideDown = false;

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
    const viewport = viewportEl.current.style;
    const cubeSizeSplitted = cubeSize.split(/(\d+)/);
    const translateZ = (cubeSizeSplitted[1] / 2) + cubeSizeSplitted[2];

    viewport.setProperty('--cube-size', cubeSize);
    viewport.setProperty('--viewport-size', viewportSize);
    viewport.setProperty('--translateZ', translateZ);
  }, []);

  const rotate = (x, y) => {
    const viewport = viewportEl.current.style;
    viewport.setProperty('--x', x + 'deg');
    viewport.setProperty('--y', y + 'deg');
  };

  const handleStartMoving = e => {
    e.preventDefault();
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
    if (x.startPosition || y.startPosition) {
      const distanceX = e.clientX - x.startPosition;
      const distanceY = e.clientY - y.startPosition;

      const nextX = isUpperSideDown
          ? x.prevPosition - distanceX
          : x.prevPosition + distanceX;
      const nextY = y.prevPosition - distanceY;

      const isXChanged = nextX > x.current + 10 || nextX < x.current - 10;
      const isYChanged = nextY > y.current + 10 || nextY < y.current - 10;

      if (isXChanged || isYChanged) {
        x.current = nextX;
        y.current = nextY;
        rotate(nextX, nextY);
      }
    }
  };

  return (
      <div {...rest}>
        <div
            id='-cube-viewport'
            onMouseDown={handleStartMoving}
            onMouseMove={handleMove}
            onMouseUp={handleStopMoving}
            onMouseOut={handleStopMoving}
            onTouchStart={e => handleStartMoving(e.changedTouches[0])}
            onTouchMove={e => handleMove(e.changedTouches[0])}
            onTouchEnd={handleStopMoving}
            ref={viewportEl}
        >
          <div id='-cube-axis'>
            {children.map((component, i) =>
                <div
                    className='-cube-side'
                    id={`-cube-side-${i}`}
                    key={String(i)}
                >
                  {component}
                </div>,
            )}
          </div>
        </div>
      </div>
  );
}

export default Cube;
