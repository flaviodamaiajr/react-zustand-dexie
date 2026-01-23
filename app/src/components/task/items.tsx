import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useTaskStore } from "../../store/task";
import {
  updateTask as updateTaskService,
  removeTask as removeTaskService,
} from "../../services/task.service";
import Counter from "../../components/task/counter";

export default function Items() {
  const tasks = useTaskStore((state) => state.tasks);

  const totalTasks = tasks.length;
  const hasTasks = totalTasks > 0;

  return (
    <>
      <List>
        {hasTasks ? (
          tasks.map((task) => (
            <div key={task.id}>
              <ListItem
                secondaryAction={
                  <div style={{ display: "flex", gap: "10px" }}>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => {
                        const text = prompt("Edit your task:", task.text);

                        if (text && text !== task.text) {
                          updateTaskService(task.id, { text });
                        }
                      }}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => removeTaskService(task.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                }
              >
                <ListItemText
                  primary={task.text}
                  secondary={task.wasSync ? "Synchronized" : "Not synchronized"}
                />
              </ListItem>

              {totalTasks > 1 && <Divider />}
            </div>
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
