import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import styles from "./MainPart.module.scss";
import {
  ToDoFolder,
  setSelectedFolderName,
  setIsNewTodoOpen,
  addTodo,
  setFolders,
} from "../../redux/slices/todoSlice";

import TodoItem from "../TodoItem";
import TodoListEmpty from "../TodoListEmpty";

const MainPart: React.FC = () => {
  const selectedFolder = useAppSelector((state) => state.todos.selectedFolder);
  const dispatch = useAppDispatch();

  const headerInputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(selectedFolder?.name);
  const [newTodoInputValue, setNewTodoInputValue] = useState("");

  const folders: ToDoFolder[] = useAppSelector((state) => state.todos.folders);

  const isNewTodoOpen = useAppSelector((state) => state.todos.isNewTodoOpen);
  const isMounted = React.useRef(false);
  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(folders);
      localStorage.setItem("folders", json);
    }
    isMounted.current = true;
  }, [folders]);

  const inputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 25) {
      headerInputRef.current?.focus();
      return alert("Слишком много символов в заголовке.");
    }

    setInputValue(e.target.value);
    console.log("click");
    dispatch(setSelectedFolderName(e.target.value));
  };

  const editFolder = (folder: ToDoFolder) => {
    if (!headerInputRef) return;
    headerInputRef.current?.focus();
    setInputValue(selectedFolder?.name);
  };

  const onAddTodoClick = (text: string) => {
    if (text.length > 25)
      return alert("Длина todo должна быть меньше 50 символов");

    if (text.length == 0) return alert("todo не может быть пустым");

    setNewTodoInputValue("");
    dispatch(addTodo(text));
  };

  if (folders.length === 0) {
    return <TodoListEmpty />;
  }

  if (!selectedFolder) {
    return (
      <div className={styles.wrapper}>
        {folders.map((folder) => (
          <>
            <div className={styles.header_container} key={folder.id}>
              <input
                type="text"
                defaultValue={folder.name}
                style={{
                  color: `${folder.color}`,
                  width: `${folder.name.length * 25}px`,
                }}
                key={folder.color}
                readOnly={true}
              />
            </div>
            <>
              {folder.todos.map((todo) => (
                <TodoItem todo={todo} key={todo.id} isInViewMode={true} />
              ))}
            </>
          </>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header_container}>
        <input
          type="text"
          ref={headerInputRef}
          onChange={(e) => inputChanged(e)}
          value={selectedFolder?.name}
          style={{
            color: `${selectedFolder?.color}`,
            width: `${0 + selectedFolder?.name.length * 25}px`,
          }}
        />
        <svg
          style={{ cursor: "pointer" }}
          onClick={() => editFolder(selectedFolder)}
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 12.0504V14.5834C0 14.8167 0.183308 15 0.41661 15H2.9496C3.05792 15 3.16624 14.9583 3.24123 14.875L12.34 5.78458L9.21542 2.66001L0.124983 11.7504C0.0416611 11.8338 0 11.9338 0 12.0504ZM14.7563 3.36825C14.8336 3.29116 14.8949 3.1996 14.9367 3.0988C14.9785 2.99801 15 2.88995 15 2.78083C15 2.6717 14.9785 2.56365 14.9367 2.46285C14.8949 2.36205 14.8336 2.27049 14.7563 2.19341L12.8066 0.24367C12.7295 0.166428 12.6379 0.105146 12.5372 0.0633343C12.4364 0.021522 12.3283 0 12.2192 0C12.1101 0 12.002 0.021522 11.9012 0.0633343C11.8004 0.105146 11.7088 0.166428 11.6318 0.24367L10.107 1.76846L13.2315 4.89304L14.7563 3.36825Z"
            fill="#DFDFDF"
          />
        </svg>
      </div>
      <>
        {selectedFolder.todos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} isInViewMode={false} />
        ))}

        {isNewTodoOpen ? (
          <div className={styles.addTodoForm_container}>
            <input
              placeholder="Текст задачи"
              className={styles.todoInput}
              onChange={(e) => setNewTodoInputValue(e.target.value)}
              value={newTodoInputValue}
            />
            <div className={styles.buttons_container}>
              <button
                className={styles.addTodoButton}
                onClick={() => onAddTodoClick(newTodoInputValue)}
              >
                Добавить задачу
              </button>
              <button
                className={styles.undoButton}
                onClick={() => dispatch(setIsNewTodoOpen(!isNewTodoOpen))}
              >
                Отмена
              </button>
            </div>
          </div>
        ) : (
          <div
            className={styles.addTodo_container}
            onClick={() => {
              dispatch(setIsNewTodoOpen(!isNewTodoOpen));
              setNewTodoInputValue("");
            }}
          >
            <svg
              style={{ marginRight: "10px" }}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 1V15"
                stroke="#B4B4B4"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1 8H15"
                stroke="#B4B4B4"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div>Новая задача</div>
          </div>
        )}
      </>
    </div>
  );
};

export default MainPart;
