import { H5PContext } from '@context/H5PContext.js';
import React, { useContext, useState } from 'react';
import './Toolbar.scss';
import PropTypes from 'prop-types'; 

const ToolBar = (props) => {
  const { animations, modelViewerInstance } = props;
  const context = useContext(H5PContext);

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
            className='toolbar-btn'
            onClick={handlePlayPause}
            aria-label={buttonState ? context.t('pauseAnimation') : context.t('playAnimation')}
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

ToolBar.propTypes = {
  animations: PropTypes.arrayOf(PropTypes.string).isRequired, 
  modelViewerInstance: PropTypes.shape({
    availableAnimations: PropTypes.arrayOf(PropTypes.string).isRequired,
    paused: PropTypes.bool.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
  }), 
};