const initialState = {
  todos: [],
  selectedTodo: null,
  selectedUser: null,
  selectedUserId: null,
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case "TODOS_LOADED":
      return {
        ...state,
        todos: action.payload,
      };
    case "TODO_SELECTED":
      return {
        ...state,
        selectedTodo: action.payload,
      };
    case "USER_SELECTED":
      return {
        ...state,
        selectedUser: action.payload,
      };
    case "USER_ID_SELECTED":
      return {
        ...state,
        selectedUserId: action.payload,
      };
    default:
      return state;
  }
};

export default todos;
