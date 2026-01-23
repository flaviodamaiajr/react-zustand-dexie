import { useEffect } from "react";

import TaskForm from "./components/task";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Items from "./components/task/items";
import Typography from "@mui/material/Typography";
import { useNetwork } from "./hooks/useNetwork";
import { listTasks } from "./services/taskService";

function App() {
  const isOnline = useNetwork();

  useEffect(() => {
    listTasks();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid size={{ md: 4 }} />
      <Grid size={{ xs: 12, md: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Task Manager - {isOnline ? "Online" : "Offline"}
            </Typography>
            <TaskForm />
            <Items />
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ md: 4 }} />
    </Grid>
  );
}

export default App;
