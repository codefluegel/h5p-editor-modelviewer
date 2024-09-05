import React from 'react';
import PropTypes from 'prop-types';
import EditingDialog from './EditingDialog';
import { H5PContext } from '@context/H5PContext';
import { getLibraryDataFromFields } from '@h5phelpers/editorForms';
import { getDefaultLibraryParams } from '@h5phelpers/libraryParams';
import {
  createInteractionForm,
  sanitizeInteractionParams,
  validateInteractionForm,
} from '@h5phelpers/forms/interactionForm';
import '@components/EditingDialog/InteractionEditor.scss';

export const InteractionEditingType = {
  NOT_EDITING: null,
  NEW_INTERACTION: -1,
  EDITING: 0,
};

export default class InteractionEditor extends React.Component {
  constructor(props) {
    super(props);
    this.semanticsRef = React.createRef();

    this.state = {
      library: null,
      isInitialized: false,
      hasInputError: false,
    };
  }

  getInteractionParams(interactionIndex = null) {
    if (interactionIndex === InteractionEditingType.NEW_INTERACTION) {
      return getDefaultLibraryParams(this.props.library.uberName);
    } else if (interactionIndex === InteractionEditingType.EDITING) {
      return this.props.hotspot;
    }
    const scenes = this.context.params.scenes;
    const scene = getSceneFromId(scenes, this.props.currentScene);
    return scene.interactions[interactionIndex];
  }

  async componentDidMount() {
    this.params = this.getInteractionParams(this.props.editingInteraction);
    const field = this.context.field;

    // Preserve parent's children
    this.parentChildren = this.context.parent.children;
    createInteractionForm(field, this.params, this.semanticsRef.current, this.context.parent);

    // Restore parent's children after preserving our own
    this.children = this.context.parent.children;
    this.context.parent.children = this.parentChildren;

    // Update state when library has loaded
    this.libraryWidget = this.children[2];
    const libraryLoadedCallback = () => {
      this.setState({
        isInitialized: true,
      });
    };

    // Check if children has been loaded, since ready() doesn't work for library
    if (this.libraryWidget.children && this.libraryWidget.children.length) {
      libraryLoadedCallback();
    } else {
      this.libraryWidget.change(libraryLoadedCallback.bind(this));
    }

    let uberName = '';
    if (this.props.hotspot) {
      uberName = this.props.hotspot.action.library;
    } else {
      uberName = this.params.action.library;
    }

    const library = await getLibraryDataFromFields(field, uberName);
    this.setState({
      library: library,
    });
  }

  handleDone() {
    let interactionPosition = null;
    if (this.props.hotspot) {
      interactionPosition = this.props.hotspot.interactionpos;
    } else {
      interactionPosition = this.props.newInteractionPosition;
    }
    this.params = sanitizeInteractionParams(this.params, interactionPosition);
    const isValid = validateInteractionForm(this.children);

    // Return to form with error messages if form is invalid
    if (!isValid) {
      this.setState({
        hasInputError: true,
      });
      return;
    }

    this.props.doneAction(this.params, this.scene && this.scene.params);
  }

  removeInputErrors() {
    this.setState({
      hasInputError: false,
    });
  }

  setScene(scene) {
    this.scene = scene;
  }

  render() {
    let title = '';
    let className = '';

    if (this.state.library) {
      title = this.state.library.title;
      className = this.state.library.name.toLowerCase().replace('.', '-');
    }

    const semanticsClasses = ['semantics-wrapper'];

    return (
      <EditingDialog
        title={title}
        titleClasses={[className]}
        removeAction={this.props.removeAction}
        doneAction={this.handleDone.bind(this)}
        doneLabel={this.context.t('done')}
        removeLabel={this.context.t('remove')}
      >
        <div className={semanticsClasses.join(' ')} ref={this.semanticsRef} />
      </EditingDialog>
    );
  }
}

InteractionEditor.contextType = H5PContext;

InteractionEditor.propTypes = {
  library: PropTypes.shape({
    uberName: PropTypes.string.isRequired,
  }),
  editingInteraction: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(Object.values(InteractionEditingType)),
  ]),
  doneAction: PropTypes.func.isRequired,
  removeAction: PropTypes.func.isRequired,
};
