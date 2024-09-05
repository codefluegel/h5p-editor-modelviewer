import { isChildrenValid } from '../editorForms';

const DefaultInteractionValues = {
  threeSixty: {
    spread: 20,
  },
  static: {
    spread: 30,
    center: [50, 50],
  },
};

/**
 * Checks if model form is valid and marks invalid fields
 *
 * @param children
 * @returns {boolean} True if valid
 */
export const validatemodelForm = (children) => {
  H5PEditor.Html.removeWysiwyg();
  return isChildrenValid(children);
};

/**
 * Sets default values for model parameters that are not initially set by
 * the user when creating a model.
 *
 * @param params
 * @param isThreeSixty
 * @param cameraPos
 */
export const sanitizeSceneForm = (params, isThreeSixty, cameraPos) => {
  if (!params.cameraStartPosition) {
    params.cameraStartPosition = [-(Math.PI * (2 / 3)), 0].join(',');
  }

  if (!params.interactions) {
    params.interactions = [];
  }

  params.interactions.forEach((interaction) => {
    sanitizeInteractionPositions(interaction, isThreeSixty, cameraPos);
  });
};

/**
 * Gets a random position within a percentage spread around the center
 * position
 *
 * @param center
 * @param spread
 * @returns {number}
 */
const spreadByValue = (center, spread) => {
  return center - spread / 2 + Math.random() * spread;
};
