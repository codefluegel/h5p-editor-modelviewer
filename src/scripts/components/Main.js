import React from 'react';
import PropTypes from 'prop-types';
import '@components/Main.scss';
import ToolBar from '@components/Toolbar/Toolbar';
import ModelViewer from '@components/ModelViewer/ModelViewer';
import InteractionsBar from '@components/InteractionsBar/InteractionsBar.js';
import InteractionEditor, {
  InteractionEditingType,
} from '@components/EditingDialog/InteractionEditor.js';
import { H5PContext } from '@context/H5PContext.js';
import { getSource } from '../context/H5PContext';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modelPath: getSource(this.props.initialModelPath),
      modelViewerInstance: null,
      editingInteraction: InteractionEditingType.NOT_EDITING,
      listeningForClicks: false,
      animations: [],
      interactions: [],
      currentClickPosition: 0,
      editingHotspotIndex: -1,
      activeElement: null,
    };
  }

  componentDidMount() {
    // get model viewer dom element by id
    const modelViewer = document.getElementById(
      this.context.parent.params.subContentId || 'model-viewer'
    );

    if (!modelViewer) {
      return;
    }
    modelViewer.autoRotate = false;

    modelViewer.addEventListener('load', () => {
      // create hotspots and set model viewer instance
      this.setState({
        interactions: this.context.params.interactions,
        modelViewerInstance: modelViewer,
        animations: modelViewer.availableAnimations,
      });
    });
  }

  componentWillUnmount() {
    // remove event listener
    this.state.modelViewerInstance.removeEventListener('load');
  }

  handleLibraryChange = (library) => {
    this.setState({
      activeElement: library,
    });
  };

  handleModelClick = (event) => {
    // retrieve clicked point on 3D Model from model-viewer instance
    const clickedPoint = this.state.modelViewerInstance.surfaceFromPoint(
      event.clientX,
      event.clientY
    );

    // check if listening for clicks
    let editingInteraction = InteractionEditingType.NOT_EDITING;
    if (this.state.activeElement) {
      editingInteraction = InteractionEditingType.NEW_INTERACTION;
    } else {
      editingInteraction = InteractionEditingType.EDITING;
    }
    if (this.state.editingLibrary) {
      this.setState({
        currentClickPosition: clickedPoint,
        editingInteraction,
      });
    }
  };

  createInteraction(library) {
    if (library === null) {
      this.setState({
        listeningForClicks: false,
      });
    } else {
      this.setState({
        listeningForClicks: true,
      });
    }
    this.setState({
      editingLibrary: library,
    });
  }

  removeInteraction() {
    if (this.state.editingInteraction === InteractionEditingType.NEW_INTERACTION) {
      this.setState({
        editingInteraction: InteractionEditingType.NOT_EDITING,
        editingHotspotIndex: -1,
        listeningForClicks: false,
        editingLibrary: null,
        activeElement: null,
      });
      return;
    }

    let interactions = [...this.state.interactions];
    interactions.splice(this.state.editingHotspotIndex, 1);
    this.setState({
      interactions: interactions,
      editingInteraction: InteractionEditingType.NOT_EDITING,
      editingHotspotIndex: -1,
      listeningForClicks: false,
      editingLibrary: null,
    });

    this.context.params.interactions = interactions;
    this.context.setValue(this.context.field, this.context.params);
  }

  editInteraction(params) {
    const newInteraction = params;
    newInteraction.interactionpos = params.interactionpos ?? this.state.currentClickPosition;

    if (this.state.editingInteraction === InteractionEditingType.EDITING) {
      let interactions = [...this.state.interactions];
      interactions[this.state.editingHotspotIndex] = params;
      this.setState({
        interactions: interactions,
        editingInteraction: InteractionEditingType.NOT_EDITING,
        editingHotspotIndex: -1,
        listeningForClicks: false,
        editingLibrary: null,
      });
    } else {
      this.setState({
        interactions: [...this.state.interactions, newInteraction],
        activeElement: null,
        listeningForClicks: false,
        editingLibrary: null,
      });

      // set context params hotspots to new hotspots array
      this.context.params.interactions = [...this.state.interactions, newInteraction];
      this.context.setValue(this.context.field, this.context.params);

      this.setState({
        editingInteraction: InteractionEditingType.NOT_EDITING,
      });
    }
  }

  showContentModal = (hotspot, index) => {
    this.setState({
      editingInteraction: InteractionEditingType.EDITING,
      hotspot: hotspot,
      editingLibrary: hotspot.action.library,
      editingHotspotIndex: index,
    });
  };

  render() {
    return (
      <div className='model-viewer-container'>
        <div className='container'>
          <div className='mv-container'>
            <InteractionsBar
              isShowing={true}
              createInteraction={this.createInteraction.bind(this)}
              activeElement={this.state.activeElement}
              onActiveElementChange={this.handleLibraryChange}
            />
            <ModelViewer
              id={this.context.parent.params.subContentId || 'model-viewer'}
              handleClick={this.handleModelClick}
              hotspots={this.state.interactions}
              modelPath={this.state.modelPath}
              showContentModal={this.showContentModal}
            />
            <ToolBar
              animations={this.state.animations}
              modelViewerInstance={this.state.modelViewerInstance}
            />
          </div>
          {this.state.editingInteraction !== InteractionEditingType.NOT_EDITING && (
            <InteractionEditor
              removeAction={this.removeInteraction.bind(this)}
              doneAction={this.editInteraction.bind(this)}
              editingInteraction={this.state.editingInteraction}
              library={this.state.editingLibrary}
              hotspot={this.state.hotspot}
              newInteractionPosition={this.state.currentClickPosition}
            />
          )}
        </div>
      </div>
    );
  }
}

Main.contextType = H5PContext;

Main.propTypes = {
  modelPath: PropTypes.string,
};