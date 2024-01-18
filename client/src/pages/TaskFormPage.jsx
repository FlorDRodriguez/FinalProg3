import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";

function taskFormPage() {
  const { register, handleSubmit } = useForm();

  const { createTask } = useTasks();

  const onSubmit = handleSubmit( async (data) => {
    createTask({...data});
  });

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="title"
          placeholder="Títuto"
          {...register("title")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounden-md my-2"
          autoFocus
        />
        <textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Descripción"
          {...register("description")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounden-md my-2"
        />
        {/* <Label htmlFor="date">Date</Label>
        <Input type="date" name="date" {...register("date")} /> */}

        <button>Guardar</button>
      </form>
    </div>
  );
}

export default taskFormPage;
