// component to render hotspots from main a functional component
import React, { useState } from 'react';

const ToolBar = (props) => {
  const { animations, modelViewerInstance } = props;

  // buttonstate
  const [buttonState, setButtonState] = useState(false);

  const handlePlayPause = () => {
    setButtonState(!buttonState);

    if (!modelViewerInstance || !modelViewerInstance.availableAnimations.length) {
      return;
    }

    modelViewerInstance.paused ? modelViewerInstance.play() : modelViewerInstance.pause();
  };

  return (
    <div className='tool-bar'>
      <div>
        {animations.length > 0 && (
          <button
            className='button'
            onClick={handlePlayPause}
            aria-label={buttonState ? 'Pause animation' : 'Play animation'}
            aria-pressed={buttonState}
            role='button'
          >
            {buttonState ? 'Pause' : 'Play'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ToolBar;
