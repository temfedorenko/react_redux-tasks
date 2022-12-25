export const todosLoaded = (todos) => ({
  type: "TODOS_LOADED",
  payload: todos,
});

export const todoSelected = (selectedTodo) => ({
  type: "TODO_SELECTED",
  payload: selectedTodo,
});

export const userSelected = (selectedUser) => ({
  type: "USER_SELECTED",
  payload: selectedUser,
});

export const userIdSelected = (selectedUserId) => ({
  type: "USER_ID_SELECTED",
  payload: selectedUserId,
});

export const filterChanged = (filter) => ({
  type: "FILTER_CHANGED",
  payload: filter,
});
