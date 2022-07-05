import { createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum ToDoColors {
  ColorOne = "#C9D1C8",
  ColorTwo = "#42B883",
  ColorThree = "#64C4ED",
  ColorFour = "#FFBBCC",
  ColorFive = "#B6E6BD",
  ColorSix = "#C355F5",
  ColorSeven = "#09011A",
  ColorEight = "#FF6464",
}

export type ToDo = {
  isDone : boolean;
  task: string;
  id: number;
}

export type ToDoFolder = {
  id: number;
  color: ToDoColors;
  name: string;
  todos: ToDo[];
}

interface TodoSliceState {
  folders: ToDoFolder[];
  selectedFolder: ToDoFolder | null;
  isNewTodoOpen: boolean;
}

const initialState : TodoSliceState = {
  folders: [
    {
      color: ToDoColors.ColorOne,
      name: "Папка 1",
      todos: [{isDone: false, task: "Тестовое задание 1", id: Math.random(),}, {isDone: true, task: "Тестовое задание 2", id: Math.random(),}],
      id: Math.random(),
    },
    {
      color: ToDoColors.ColorTwo,
      name: "Папка 2",
      todos: [{isDone: false, task: "Тестовое задание 1", id: Math.random(),}, {isDone: true, task: "Тестовое задание 2", id: Math.random(),}],
      id: Math.random(),
    },
    {
      color: ToDoColors.ColorThree,
      name: "Папка 3",
      todos: [],
      id: Math.random(),
    },
  ],
  selectedFolder: null,
  isNewTodoOpen: false,
};


export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addFolder: (state, action : PayloadAction<ToDoFolder>) => {
      state.folders.push(action.payload);
    },
    deleteFolder: (state, action: PayloadAction<ToDoFolder>) => {
      state.folders = state.folders.filter((f) => f.id !== action.payload.id);
    },
    addTodo: (state, action: PayloadAction<string>) => {

      state.folders.find((f) => f.id === state.selectedFolder?.id)?.todos.push({
        id: Math.random(),
        isDone: false,
        task: action.payload,
      });
      
      state.selectedFolder = state.folders.find((f) => f.id === state.selectedFolder?.id) as ToDoFolder;
    },
    deleteTodo: (state, action : PayloadAction<ToDo>) => {
      if(!state.selectedFolder) return;

      let todos = state.selectedFolder?.todos.filter((todo) => todo.id !== action.payload.id);

      state.selectedFolder = {
        color: state.selectedFolder.color,
        name: state.selectedFolder.name,
        id: state.selectedFolder.id,
        todos: todos,
      };

      let folders = [...state.folders];

      let sf_ind = folders.findIndex((folder) => folder.id === state.selectedFolder?.id);
      folders[sf_ind] = state.selectedFolder;

      state.folders = folders;
    },
    selectFolder: (state, action : PayloadAction<number>) => {
      if(action.payload === 0){
       state.selectedFolder = null;
       return;
      }

      state.selectedFolder = state.folders.find((f) => f.id === action.payload) as ToDoFolder;
    },
    changeTodoIsDone: (state, action: PayloadAction<ToDo>) => {

      if (!state.selectedFolder) return;

      const todoIndex = state.selectedFolder.todos.findIndex((todo) => todo.id === action.payload.id);

      let todosArr = [...state.selectedFolder.todos];
      todosArr[todoIndex].isDone = !todosArr[todoIndex].isDone;

      state.selectedFolder = {
        color: state.selectedFolder.color,
        name: state.selectedFolder.name,
        id: state.selectedFolder.id,
        todos: todosArr,
      };

      let folders = [...state.folders];

      let sf_ind = folders.findIndex((folder) => folder.id === state.selectedFolder?.id);
      folders[sf_ind] = state.selectedFolder;

      state.folders = folders;
    },
    setSelectedFolderName: (state, action: PayloadAction<string>) => {
      if (!state.selectedFolder) return;

      state.selectedFolder = {
        id: state.selectedFolder.id,
        color: state.selectedFolder.color,
        name: action.payload,
        todos: state.selectedFolder.todos,
      }

      let folders = [...state.folders];

      let sf_ind = folders.findIndex((folder) => folder.id === state.selectedFolder?.id);
      folders[sf_ind] = state.selectedFolder;

      state.folders = folders;
    },
    setIsNewTodoOpen: (state, action: PayloadAction<boolean>) => {
      state.isNewTodoOpen = action.payload;
    },
  },
});

export const {addFolder, deleteFolder, addTodo, deleteTodo, selectFolder, changeTodoIsDone, setSelectedFolderName, setIsNewTodoOpen} = todoSlice.actions;

export default todoSlice.reducer;