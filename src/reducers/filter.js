const initialState = {
  activeFilter: "all",
};

const filter = (state = initialState, action) => {
  switch (action.type) {
    case "FILTER_CHANGED":
      return {
        ...state,
        activeFilter: action.payload,
      };
    default:
      return state;
  }
};

export default filter;
