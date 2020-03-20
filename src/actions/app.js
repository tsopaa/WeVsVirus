export const UPDATE_ACCESSIBLE = "UPDATE_ACCESSIBLE";
// export const UPDATE_OFFLINE = "UPDATE_OFFLINE";
// export const UPDATE_DRAWER_STATE = "UPDATE_DRAWER_STATE";
// export const OPEN_SNACKBAR = "OPEN_SNACKBAR";
// export const CLOSE_SNACKBAR = "CLOSE_SNACKBAR";

export const updateAccessible = accessible => {
  return {
    type: UPDATE_ACCESSIBLE,
    accessible
  };
};

// let snackbarTimer;

// export const showSnackbar = () => dispatch => {
//   dispatch({
//     type: OPEN_SNACKBAR
//   });
//   window.clearTimeout(snackbarTimer);
//   snackbarTimer = window.setTimeout(() => dispatch({ type: CLOSE_SNACKBAR }), 3000);
// };

// export const updateOffline = offline => (dispatch, getState) => {
//   // Show the snackbar only if offline status changes.
//   if (offline !== getState().app.offline) {
//     dispatch(showSnackbar());
//   }
//   dispatch({
//     type: UPDATE_OFFLINE,
//     offline
//   });
// };

// export const updateDrawerState = opened => {
//   return {
//     type: UPDATE_DRAWER_STATE,
//     opened
//   };
// };
