import TaskForm from "./components/task";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Items from "./components/task/item";
import Typography from "@mui/material/Typography";
import Footer from "./components/footer";

function App() {
  return (
    <Grid container spacing={2}>
      <Grid size={{ md: 4 }} />
      <Grid size={{ xs: 12, md: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Task Manager
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
