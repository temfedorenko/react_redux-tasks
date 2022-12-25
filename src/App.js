import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

import { TodoList } from "./components/TodoList/TodoList";
import { TodoFilter } from "./components/TodoFilter/TodoFilter";
import { TodoModal } from "./components/TodoModal/TodoModal";
import { Loader } from "./components/Loader/Loader";
import { getTodos, getUser } from "./api";

import { todosLoaded, todoSelected, userIdSelected, userSelected, filterChanged } from "./actions";

const App = () => {
  const filteredTodosSelector = createSelector(
    (state) => state.todos.todos,
    (state) => state.filter.activeFilter,
    (todos, filter) => {
      return filter === "active"
        ? todos.filter((todo) => !todo.completed)
        : filter === "completed"
        ? todos.filter((todo) => todo.completed)
        : todos;
    }
  );

  console.log("render");
  const { selectedTodo, selectedUser, selectedUserId } = useSelector((state) => state.todos);
  const todos = useSelector(filteredTodosSelector);
  const { filter } = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getTodos()
      .then((data) => dispatch(todosLoaded(data)))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!selectedUserId) {
      return;
    }

    getUser(selectedUserId)
      .then((data) => dispatch(userSelected(data)))
      .catch((err) => console.log(err));
  }, [selectedUserId]);

  const handleModalOpen = (todo) => {
    dispatch(todoSelected(todo));
    dispatch(userIdSelected(todo.userId));
  };

  const handleModalClose = () => {
    dispatch(userIdSelected(null));
    dispatch(userSelected(null));
  };

  const handleSelectChange = (value) => {
    dispatch(filterChanged(value));
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const searchTodos = () => {
    if (searchQuery.length === 0) {
      return todos;
    }
    return todos.filter((todo) => todo.title.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const visibleData = searchTodos();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                searchQuery={searchQuery}
                onSelectChange={handleSelectChange}
                onSearchChange={handleSearchChange}
              />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList todos={visibleData} onModalOpen={handleModalOpen} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedUserId && (
        <TodoModal user={selectedUser} todo={selectedTodo} onModalClose={handleModalClose} />
      )}
    </>
  );
};

export default App;
