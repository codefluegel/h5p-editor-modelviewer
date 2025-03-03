import Main from '@components/Main';
import { H5PContext } from '@context/H5PContext.js';
import React from 'react';
import { createRoot } from 'react-dom/client';

export default class ModelViewerWidget {
  constructor(parent, field, params, setValue) {
    const customParams = parent.params.params || parent.params || {};

    this.customParams = customParams;
    this.params = Object.assign(
      {
        glbModel: customParams.glbModel || {},
        interactions: [],
      },
      params || {}
    );

    this.parent = parent;
    this.field = field;
    this.setValue = setValue;
    this.wrapper = null;
    this.glbModelInput = H5PEditor.findField('glbModel', this.parent);
    this.root = null;

    this.glbModelInput.changes.push((changes) => {
      if (changes?.path) {
        if (this.root) this.root.unmount();
        this.root = createRoot(this.wrapper);
        this.root.render(
          <H5PContext.Provider value={this}>
            <Main initialModelPath={changes.path} />
          </H5PContext.Provider>
        );
      } else if (this.root) {
        this.root.unmount();
      }
    });
  }

  t(...args) {
    const translations = ['H5PEditor.ModelViewer', ...args];
    return H5PEditor.t.apply(window, translations);
  }

  appendTo($container) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('h5p-editor-react-modelviewer-wrapper');
    this.wrapper = wrapper;

    $container[0].appendChild(wrapper);
    this.setValue(this.field, this.params);

    if (!this.customParams.glbModel?.path) {
      return console.error('No glbModel path provided');
    }

    this.root = createRoot(wrapper);
    this.root.render(
      <H5PContext.Provider value={this}>
        <Main
          initialModelPath={this.customParams.glbModel.path}
          paramInteractions={this.params.interactions}
        />
      </H5PContext.Provider>
    );
  }

  resize = () => {
    if (!this.wrapper) return;
    const mobileThreshold = 815;
    const wrapperSize = this.wrapper.getBoundingClientRect();
    if (wrapperSize.width < mobileThreshold) {
      this.wrapper.classList.add('mobile');
    } else {
      this.wrapper.classList.remove('mobile');
    }
  };

  ready = (ready) => {
    if (this.passReadies) {
      this.parent.ready(ready);
    } else {
      this.readies.push(ready);
    }
  };

  validate = () => true;
}

H5PEditor.widgets.modelViewerWidget = H5PEditor.modelViewerWidget = ModelViewerWidget;
