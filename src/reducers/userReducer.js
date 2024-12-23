const userReducer = (
  state = {
    isLoading: false,
    userData: {},
    isLogin: false,
  },
  action
) => {
  switch (action.type) {
    case "Loading":
      return { ...state, isLoading: true };
    case "Login":
      return {
        ...state,
        isLogin: true,
        isLoading: false,
      };
    case "userProfile":
      return {
        ...state,
        userData: { ...action.payload.userData },
        isLogin: true,
        isLoading: false,
      };
      break;
    case "Logout":
      return { ...state, isLoading: false, isLogin: false, userData: {} };
    default:
      return state;
  }
};

export default userReducer;
