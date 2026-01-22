import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTaskStore } from "../../store/task";
import Counter from "./counter";

export default function Items() {
  const { tasks, removeTask, editTask } = useTaskStore();

  const totalTasks = tasks.length;
  const hasTasks = totalTasks > 0;

  return (
    <>
      <List>
        {hasTasks ? (
          tasks.map((task) => (
            <>
              <ListItem
                key={task.id}
                secondaryAction={
                  <div style={{ display: "flex", gap: "10px" }}>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() =>
                        editTask(
                          task.id,
                          prompt("Edit your task:", task.text) || task.text,
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => removeTask(task.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                }
              >
                <ListItemText
                  primary={task.text}
                  secondary={!task.wasSync ? "Not syncronized" : "Syncronized"} // use it for show status (sync or not).
                />
              </ListItem>
              {totalTasks > 1 && <Divider />}
            </>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No tasks added yet." />
          </ListItem>
        )}
      </List>
      {hasTasks && <Counter />}
    </>
  );
}
