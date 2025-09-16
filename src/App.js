import logo from "./logo.svg";
import "./App.css";
import TodoList from "./Components/TodoList";
import { useContext } from "react";
import { TodoContext } from "./Contexts/TodoContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["myFont"],
  },
});

const todoList = [];

function App() {
  const [todos, setTodos] = useState(todoList);
  return (
    <ThemeProvider theme={theme}>
    <TodoContext.Provider value={{ todos, setTodos }}>
      <div className="App">
        <TodoList />
      </div>
    </TodoContext.Provider>
    </ThemeProvider>
  );
}

export default App;
