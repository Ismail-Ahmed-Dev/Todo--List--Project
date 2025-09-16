import { Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";
import { useState, useContext, useEffect } from "react";
import { TodoContext } from "../Contexts/TodoContext";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function TodoList() {
  const [titleInput, setTitleInput] = useState("");
  const { todos, setTodos } = useContext(TodoContext);
  const [displayTodosType, setDisplayTodosType] = useState("all");

  let todoType = todos;

  const completedTasks = todos.filter((t) => {
    return t.isCompleted;
  });
  const notCompletedTasks = todos.filter((t) => {
    return !t.isCompleted;
  });

  if (displayTodosType == "completed") {
    todoType = completedTasks;
  } else if (displayTodosType == "not-completed") {
    todoType = notCompletedTasks;
  } else {
    todoType = todos;
  }
  const theTask = todoType.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  function handleChangeDisplayType(e) {
    setDisplayTodosType(e.target.value);
  }

  function handelrAddNewTask() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTitleInput("");
  }

  useEffect(() => {
    const storageUpdate = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageUpdate);
  }, []);

  return (
    <Container maxWidth="sm">
      <Card
        sx={{ minWidth: 275 }}
        style={{
          maxHeight: "80vh",
          overflowY: "auto",
          overflowX: "hidden",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <CardContent>
          <Typography variant="h2">My To-do List</Typography>

          <Divider variant="middle" />

          {/* Toggle Button Group */}

          <ToggleButtonGroup
            color="primary"
            value={displayTodosType}
            exclusive
            onChange={handleChangeDisplayType}
            aria-label="Platform"
            style={{ marginTop: "30px" }}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="completed">Completed</ToggleButton>
            <ToggleButton value="not-completed">Not completed</ToggleButton>
          </ToggleButtonGroup>
          {/*========= Toggle Button Group =========*/}
          {/* Card Todo */}
          {theTask}
          {/*===== Card Todo =====*/}
          {/* === Add a new task & input feild === */}
          <Grid container spacing={2} marginTop={5}>
            <Grid size={8} style={{}}>
              <TextField
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
                id="outlined-Basic"
                label="Task title"
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid size={4}>
              <Button
                onClick={handelrAddNewTask}
                style={{ width: "100%", height: "100%" }}
                variant="contained"
                disabled={titleInput.length == 0}
              >
                Add Task
              </Button>
            </Grid>
          </Grid>
          {/* === Add a new task & input feild === */}
        </CardContent>
      </Card>
    </Container>
  );
}

