import '@components/EditingDialog/InteractionEditor.scss';
import { H5PContext } from '@context/H5PContext';
import { getLibraryDataFromFields } from '@h5phelpers/editorForms';
import {
  createInteractionForm,
  sanitizeInteractionParams,
  validateInteractionForm,
} from '@h5phelpers/forms/interactionForm';
import { getDefaultLibraryParams } from '@h5phelpers/libraryParams';
import PropTypes from 'prop-types';
import React from 'react';
import EditingDialog from './EditingDialog';

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
    } 
    else if (interactionIndex === InteractionEditingType.EDITING) {
      return this.props.hotspot;
    }
  }

  async componentDidMount() {
    const { field, parent } = this.context;
    if (!field || !parent) return; // Fail early if context is missing

    this.params = this.getInteractionParams(this.props.editingInteraction);
    this.parentChildren = parent.children;

    // Create interaction form
    createInteractionForm(field, this.params, this.semanticsRef.current, parent);

    // Restore parent's children and assign local reference
    this.children = parent.children;
    parent.children = this.parentChildren;

    // Ensure `libraryWidget` is valid before using it
    this.libraryWidget = this.children?.[2];
    if (this.libraryWidget?.children?.length) {
      this.setState({ isInitialized: true });
    } 
    else {
      this.libraryWidget?.change(() => this.setState({ isInitialized: true }));
    }

    // Determine `uberName` (shortened conditional)
    const uberName = this.props.hotspot?.action?.library || this.params?.action?.library;
    if (!uberName) return; // Fail early if no library name is found

    // Load library data
    const library = await getLibraryDataFromFields(field, uberName);
    this.setState({ library });
  }

  handleDone() {
    let interactionPosition = null;
    if (this.props.hotspot) {
      interactionPosition = this.props.hotspot.interactionpos;
    } 
    else {
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
  hotspot: PropTypes.shape({
    interactionpos: PropTypes.string,
    action: PropTypes.shape({
      library: PropTypes.string.isRequired,
    }),
  }),
  newInteractionPosition: PropTypes.string,
};
