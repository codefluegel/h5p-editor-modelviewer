import '@components/ModelViewer/ModelViewer.scss';
import PropTypes from 'prop-types';
import React from 'react';
import { purifyHTML } from '../../utils/utils';

const ModelViewer = (props) => {
  const { handleClick, hotspots, modelPath, id, showContentModal, modelDescriptionARIA } = props;

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
      alt={modelDescriptionARIA}
      camera-controls
    >
      {hotspots.map((hotspot, index) => {
        return (
          hotspot.interactionpos && (
            <div
              className='hotspot'
              key={index}
              slot={`hotspot-${index}`}
              data-surface={hotspot.interactionpos}
            >
              <button
                className={`hotspot h5p_${hotspot.action.metadata.contentType
                  .replace(/[ ,]+/g, '_')
                  .toLowerCase()}`}
                aria-label={purifyHTML(hotspot.labelText)}
                onClick={() => openModalByType(hotspot, index)}
                onKeyDown={(event) => handleKeyDown(event, hotspot, index)}
              />
              <div className='hotspot-label'>{purifyHTML(hotspot.labelText)}</div>
            </div>
          )
        );
      })}
    </model-viewer>
  );
};

export default ModelViewer;

ModelViewer.propTypes = {
  handleClick: PropTypes.func.isRequired,
  hotspots: PropTypes.arrayOf(
    PropTypes.shape({
      interactionpos: PropTypes.string,
      action: PropTypes.shape({
        metadata: PropTypes.shape({
          contentType: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      labelText: PropTypes.string,
    })
  ).isRequired,
  modelPath: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  showContentModal: PropTypes.func.isRequired,
  modelDescriptionARIA: PropTypes.string.isRequired,
};
