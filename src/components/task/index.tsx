import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
// Zustand store import would go here
import { useTaskStore } from "../../store/task";

type Inputs = {
  task: string;
};

const schema = yup
  .object({
    task: yup.string().required(),
  })
  .required();

export default function TaskForm() {
  const { addTask } = useTaskStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = ({ task }) => addTask(task);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth variant="standard">
        <TextField
          id="outlined-basic"
          label="New Task "
          variant="outlined"
          margin="normal"
          {...register("task")}
          error={!!errors.task}
          helperText={errors.task ? "Task is required." : ""}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 2 }}
        >
          Add Task
        </Button>
      </FormControl>
    </form>
  );
}
