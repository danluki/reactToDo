import React from "react";
import {
  changeTodoIsDone,
  ToDo,
  deleteTodo,
} from "../../redux/slices/todoSlice";
import { useAppDispatch } from "../../redux/store";

import styles from "./TodoItem.module.scss";

interface TodoItemProps {
  todo: ToDo;
  isInViewMode: boolean;
}
const TodoItem: React.FC<TodoItemProps> = ({ todo, isInViewMode }) => {
  const dispatch = useAppDispatch();
  const [isMouseIn, setIsMouseIn] = React.useState(false);

  const onClickDone = (todo: ToDo) => {
    dispatch(changeTodoIsDone(todo));
  };

  const onMouseEnter = () => {
    setIsMouseIn(true);
  };

  const onMouseLeave = () => {
    setIsMouseIn(false);
  };

  const removeTodoClick = (todo: ToDo) => {
    dispatch(deleteTodo(todo));
  };

  return (
    <div className={styles.todoItem}>
      {todo.isDone ? (
        <svg
          onClick={() => onClickDone(todo)}
          style={{ marginRight: "10px", width: "20px", height: "20px" }}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="10"
            cy="10"
            r="9"
            fill="#4DD599"
            stroke="#4DD599"
            strokeWidth="2"
          />
          <path
            d="M14.3 7.20001L8.79999 12.7L6.29999 10.2"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : isMouseIn && !isInViewMode ? (
        <svg
          style={{ marginRight: "10px" }}
          onClick={() => onClickDone(todo)}
          onMouseLeave={() => onMouseLeave()}
          onMouseEnter={() => onMouseEnter()}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="10"
            cy="10"
            r="9"
            fill="#F2F2F2"
            stroke="#F2F2F2"
            strokeWidth="2"
          />
          <path
            d="M14.3 7.20001L8.79999 12.7L6.29999 10.2"
            stroke="#B3B3B3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          onClick={() => onClickDone(todo)}
          onMouseLeave={() => onMouseLeave()}
          onMouseEnter={() => onMouseEnter()}
          style={{ marginRight: "10px" }}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10" cy="10" r="9" stroke="#E8E8E8" strokeWidth="2" />
        </svg>
      )}

      {todo.isDone ? (
        <div style={{ marginLeft: "20px" }}>
          <s>{todo.task}</s>
        </div>
      ) : (
        <div style={{ marginLeft: "20px" }}>{todo.task}</div>
      )}
      {!isInViewMode ? (
        <svg
          onClick={() => removeTodoClick(todo)}
          style={{
            cursor: "pointer",
            float: "inline-end",
            marginLeft: "auto",
          }}
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.24741 5L9.73899 1.50842C9.9047 1.343 9.99791 1.11853 9.99812 0.884393C9.99832 0.650251 9.90551 0.425617 9.74009 0.259907C9.57468 0.0941973 9.35021 0.000986589 9.11606 0.000779811C8.88192 0.000573033 8.65729 0.0933872 8.49158 0.258804L5 3.75038L1.50842 0.258804C1.34271 0.0930948 1.11796 0 0.883613 0C0.649264 0 0.424514 0.0930948 0.258804 0.258804C0.0930948 0.424514 0 0.649264 0 0.883613C0 1.11796 0.0930948 1.34271 0.258804 1.50842L3.75038 5L0.258804 8.49158C0.0930948 8.65729 0 8.88204 0 9.11639C0 9.35074 0.0930948 9.57549 0.258804 9.7412C0.424514 9.90691 0.649264 10 0.883613 10C1.11796 10 1.34271 9.90691 1.50842 9.7412L5 6.24962L8.49158 9.7412C8.65729 9.90691 8.88204 10 9.11639 10C9.35074 10 9.57549 9.90691 9.7412 9.7412C9.90691 9.57549 10 9.35074 10 9.11639C10 8.88204 9.90691 8.65729 9.7412 8.49158L6.24741 5Z"
            fill="#E3E3E3"
          />
        </svg>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TodoItem;
