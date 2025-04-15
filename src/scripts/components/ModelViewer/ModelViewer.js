import '@components/ModelViewer/ModelViewer.scss';
import { H5PContext } from '@context/H5PContext.js';
import { purifyHTML } from '@utils/utils';
import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';

/** @constant {number} FILE_PATH_TIMEOUT_MS File path setting timeout. */
const FILE_PATH_TIMEOUT_MS = 500;

const ModelViewer = (props) => {
  const {
    handleClick,
    hotspots,
    modelPath,
    id,
    showContentModal,
    modelDescriptionARIA,
    modelViewerInstance,
    exposureValue,
  } = props;

  const openModalByType = (hotspot, index) => {
    showContentModal(hotspot, index);
  };
  const context = useContext(H5PContext);

  useEffect(() => {
    if (!window.modelViewerLoaded) {
      import(/* webpackMode: "eager" */ '@google/model-viewer').then(() => {
        window.modelViewerLoaded = true;
      });
    }
  }, []);

  const handleExposureChange = (e) => {
    const exposure = parseFloat(e.target.value);
    if (modelViewerInstance) {
      modelViewerInstance.exposure = exposure;
      context.params.exposureValue = exposure;
      context.setValue(context.field, context.params);
    }
  };

  return (
    <model-viewer
      class="modelViewer"
      id={id}
      onClick={handleClick}
      src={modelPath}
      exposure={exposureValue ?? '1.0'}
      auto-rotate
      alt={modelDescriptionARIA}
      camera-controls
    >
      <input
        type="range"
        min="0.0"
        max="2.0"
        step="0.01"
        defaultValue={exposureValue ?? '1.0'}
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
        aria-labelledby="exposure-label"
        aria-valuemin="0.0"
        aria-valuemax="2.0"
        aria-valuenow="1.0"
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
  exposureValue: PropTypes.number.isRequired,
};
