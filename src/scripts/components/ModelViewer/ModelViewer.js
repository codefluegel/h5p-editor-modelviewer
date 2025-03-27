import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import './ModelViewer.scss';

const ModelViewer = (props) => {
  const { handleClick, hotspots, modelPath, id, showContentModal } = props;

  const openModalByType = (hotspot, index) => {
    showContentModal(hotspot, index);
  };

  return (
    <model-viewer
      style={{ width: '100%', height: '100%' }}
      id={id}
      onClick={handleClick}
      src={modelPath}
      auto-rotate
      alt={modelPath.split('/').pop().split('.').slice(0, -1).join('.')}
      camera-controls
    >
      {hotspots.map((hotspot, index) => {
        return (
          hotspot.interactionpos && (
            <div
              className={`hotspot h5p_${hotspot.action.metadata.contentType
                .replace(/[ ,]+/g, '_')
                .toLowerCase()}`}
              key={index}
              slot={`hotspot-${index}`}
              data-surface={hotspot.interactionpos}
              onClick={() => openModalByType(hotspot, index)}
            >
              <span className='hotspot-label' onClick={() => openModalByType(hotspot, index)}>
                {`${hotspot.labelText}`}
              </span>
            </div>
          )
        );
      })}
    </model-viewer>
  );
};

ModelViewer.propTypes = {
  handleClick: PropTypes.func.isRequired, // Function to handle clicks on the model
  hotspots: PropTypes.arrayOf(
    PropTypes.shape({
      interactionpos: PropTypes.string, // Position of the interaction
      action: PropTypes.shape({
        metadata: PropTypes.shape({
          contentType: PropTypes.string.isRequired, // Content type metadata
        }).isRequired,
      }).isRequired,
      labelText: PropTypes.string.isRequired, // Label text for the hotspot
    })
  ).isRequired, // Array of hotspot objects
  modelPath: PropTypes.string.isRequired, // Path to the 3D model
  id: PropTypes.string.isRequired, // ID for the model-viewer element
  showContentModal: PropTypes.func.isRequired, // Function to show the content modal
};

export default ModelViewer;