import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../context/TasksContext";

function taskFormPage() {
  const { register, handleSubmit, setValue } = useForm(); 
  //setValue permite establecer valor en los estados que react hook crea
  const navigate = useNavigate();
  const params = useParams();

  const { createTask, getTask, updateTask } = useTasks();

  useEffect(() => {
    async function LoadTask () {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setValue('title', task.title);
        setValue('description', task.description);
        //el 1ro es donde queremos colocar el valor, el 2do es de donde viene
      }
    }
    LoadTask();
  }, [])
  

  const onSubmit = handleSubmit( async (data) => {
    if (params.id) { //si params.id existe quiere decir que esta creando
      updateTask(params.id, data);
    } else { //si no, esta creando
      createTask({...data});
    }
    navigate('/tasks');
  });

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="title"
          placeholder="Títuto"
          {...register("title")}
          //el register devuelve 3 propiedades: onChange, value y name
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
