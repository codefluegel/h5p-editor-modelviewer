export const Libraries = {
  GoToScene: {
    machineName: 'H5P.GoToScene',
  },
};

/**
 * Get default params for a library
 *
 * @param uberName
 * @returns {{interactionpos: string, action: {library: *, params: {}}}}
 */
export const getDefaultLibraryParams = (uberName) => {
  return {
    interactionpos: '', // Filled in on saving interaction
    action: {
      library: uberName,
      params: {},
    },
  };
};

