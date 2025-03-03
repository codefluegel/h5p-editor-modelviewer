import '@google/model-viewer';
import React from 'react';

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
                {`${index + 1}. ${hotspot.labelText}`}
              </span>
            </div>
          )
        );
      })}
    </model-viewer>
  );
};

export default ModelViewer;
