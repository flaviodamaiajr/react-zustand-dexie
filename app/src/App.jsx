import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Items from "./components/task/items";
import Typography from "@mui/material/Typography";
import { useNetwork } from "./hooks/useNetwork";
import { listTasks } from "./services/task.service";
import {
  startSyncScheduler,
  stopSyncScheduler,
} from "./services/syncScheduler";
import { Footer } from "./components/footer";
import TaskForm from "./components/task";
import { Signature } from "./components/signature";

function App() {
  const [tabValue, setTabValue] = useState(0);
  const isOnline = useNetwork();

  useEffect(() => {
    listTasks();
    startSyncScheduler();

    return () => {
      stopSyncScheduler();
    };
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
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
              aria-label="main tabs"
            >
              <Tab label="Task Manager" />
              <Tab label="Signature" />
            </Tabs>

            {tabValue === 0 && (
              <>
                <TaskForm />
                <Items />
              </>
            )}

            {tabValue === 1 && <Signature />}
          </CardContent>
        </Card>
        <Footer />
      </Grid>
      <Grid size={{ md: 4 }} />
    </Grid>
  );
}

export default App;
