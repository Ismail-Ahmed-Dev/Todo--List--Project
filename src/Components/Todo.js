import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import "../App.css";
import TodoList from "./TodoList";
import { useContext, useState } from "react";
import { TodoContext } from "../Contexts/TodoContext";

// Import Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Todo(props) {
  const [showDialog, setShowDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [updateTodo, setUpdateTodo] = useState({
    title: props.todo.title,
    details: props.todo.details,
  });
  const { todos, setTodos } = useContext(TodoContext);
  function handelerCompletTask() {
    const upDateTodos = todos.map((t) => {
      if (props.todo.id == t.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(upDateTodos);
    localStorage.setItem("todos", JSON.stringify(upDateTodos));
  }
  function handelerDeleteTask() {
    const updateAfterDelete = todos.filter((t) => {
      return t.id !== props.todo.id;
    });
    setTodos(updateAfterDelete);
    localStorage.setItem("todos", JSON.stringify(updateAfterDelete));
  }
  function handelerShowDialog() {
    setShowDialog(true);
  }
  function handelerShowEditDialog() {
    setShowEditDialog(true);
  }
  function handelerCloseDialog() {
    setShowDialog(false);
  }
  function handelerCloseEditDialog() {
    setShowEditDialog(false);
  }

  function handelerUpdateEditTask() {
    const editTask = todos.map((t) => {
      if (t.id == props.todo.id) {
        return { ...t, title: updateTodo.title, details: updateTodo.details };
      } else {
        return t;
      }
    });
    setTodos(editTask);
    setShowEditDialog(false);
    localStorage.setItem("todos", JSON.stringify(editTask));
  }
  return (
    <>
      <Dialog
        open={showDialog}
        onClose={handelerCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete the task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You cannot undo the deletion once it is completed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handelerCloseDialog}>Cancel</Button>
          <Button
            onClick={handelerDeleteTask}
            autoFocus
            style={{ color: "red" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onClose={handelerCloseEditDialog}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            value={updateTodo.title}
            autoFocus
            margin="dense"
            label="Title Task"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setUpdateTodo({ ...updateTodo, title: e.target.value });
            }}
          />
          <TextField
            value={updateTodo.details}
            margin="dense"
            label="Task Details"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setUpdateTodo({ ...updateTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handelerUpdateEditTask}>Edit</Button>
          <Button onClick={handelerCloseEditDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* ======= Edit Dialog ====== */}
      <Card
        className="iconBoxShadow"
        sx={{ minWidth: 275, backgroundColor: "#0b539bff", marginTop: 5 }}
      >
        <CardContent>
          <Typography component="div" sx={{ color: "white", fontSize: 10 }}>
            <Grid container spacing={2}>
              <Grid size={8}>
                <Typography
                  variant="h5"
                  sx={{
                    color: "white",
                    textAlign: "left",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                  style={{
                    textDecoration: props.todo.isCompleted
                      ? "line-through"
                      : "none",
                  }}
                >
                  {props.todo.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    textAlign: "left",
                    fontSize: "18px",
                    fontWeight: "normal",
                  }}
                >
                  {props.todo.details}
                </Typography>
              </Grid>
              {/* <Grid spacing={2}
                size={4}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <IconButton
                  onClick={handelerCompletTask}
                  className="iconHover"
                  style={{
                    color: props.todo.isCompleted ? "white" : "#8bc34a",
                    border: "3px solid #8bc34a",
                    background: props.todo.isCompleted ? "#8bc34a" : "white",
                    fontSize: 10,
                  }}
                >
                  <DoneIcon style={{ fontSize: "15px" }} />
                </IconButton>
                <IconButton
                  className="iconHover"
                  onClick={handelerShowDialog}
                  style={{
                    color: "red",
                    border: "3px solid red",
                    background: "white",
                  }}
                >
                  <DeleteIcon style={{ fontSize: "15px" }} />
                </IconButton>
                <IconButton
                  onClick={handelerShowEditDialog}
                  className="iconHover"
                  style={{
                    color: "#c35c4aff",
                    border: "3px solid #c35c4aff",
                    background: "white",
                  }}
                >
                  <EditIcon style={{ fontSize: "15px" }} />
                </IconButton>
              </Grid> */}
              <Grid
                container
                spacing={2}
                justifyContent="space-around"
                alignItems="center"
              >
                <Grid item>
                  <IconButton
                    onClick={handelerCompletTask}
                    className="iconHover"
                    style={{
                      color: props.todo.isCompleted ? "white" : "#8bc34a",
                      border: "3px solid #8bc34a",
                      background: props.todo.isCompleted ? "#8bc34a" : "white",
                      fontSize: 10,
                    }}
                  >
                    <DoneIcon style={{ fontSize: "15px" }} />
                  </IconButton>
                </Grid>

                <Grid item>
                  <IconButton
                    className="iconHover"
                    onClick={handelerShowDialog}
                    style={{
                      color: "red",
                      border: "3px solid red",
                      background: "white",
                    }}
                  >
                    <DeleteIcon style={{ fontSize: "15px" }} />
                  </IconButton>
                </Grid>

                <Grid item>
                  <IconButton
                    onClick={handelerShowEditDialog}
                    className="iconHover"
                    style={{
                      color: "#c35c4aff",
                      border: "3px solid #c35c4aff",
                      background: "white",
                    }}
                  >
                    <EditIcon style={{ fontSize: "15px" }} />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
