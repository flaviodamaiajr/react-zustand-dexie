import Typography from "@mui/material/Typography";

import { useTaskStore } from "../../store/task";

export default function Counter() {
  const { tasks } = useTaskStore();

  return (
    <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
      Total: {tasks.length}
    </Typography>
  );
}
