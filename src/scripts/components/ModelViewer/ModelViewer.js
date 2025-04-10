import '@components/ModelViewer/ModelViewer.scss';
import { H5PContext } from '@context/H5PContext.js';
import { purifyHTML } from '@utils/utils';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

const ModelViewer = (props) => {
  const {
    handleClick,
    hotspots,
    modelPath,
    id,
    showContentModal,
    modelDescriptionARIA,
    modelViewerInstance,
  } = props;

  const openModalByType = (hotspot, index) => {
    showContentModal(hotspot, index);
  };
  const context = useContext(H5PContext);

  const handleExposureChange = (e) => {
    const exposureValue = parseFloat(e.target.value);
    if (modelViewerInstance) {
      modelViewerInstance.exposure = exposureValue;
      context.params.exposureValue = exposureValue;
      context.setValue(context.field, context.params);
    }
  };

  return (
    <model-viewer
      class="modelViewer"
      id={id}
      onClick={handleClick}
      src={modelPath}
      auto-rotate
      alt={modelDescriptionARIA}
      camera-controls
    >
      <input
        type="range"
        min="0.0"
        max="2.0"
        step="0.01"
        defaultValue="1.0"
        onChange={handleExposureChange}
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          writingMode: 'bt-lr',
          WebkitAppearance: 'slider-vertical',
          width: '30px',
          height: '200px',
        }}
      />
      {hotspots.map((hotspot, index) => {
        return (
          hotspot.interactionpos && (
            <div
              className="hotspot"
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
              <div className="hotspot-label">
                {purifyHTML(hotspot.labelText)}
              </div>
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
  modelViewerInstance: PropTypes.any.isRequired,
};
