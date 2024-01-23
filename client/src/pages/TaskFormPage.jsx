import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../context/TasksContext";

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

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
        // setValue('date', dayjs(task.date).utc().format('DD/MM/YYYY'));
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
      }
    }
    LoadTask();
  }, [])
  

  const onSubmit = handleSubmit( async (data) => {
    
    const dataValid = {
      ... data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };

    if (params.id) { //si params.id existe quiere decir que esta creando
      updateTask(params.id, {
        ...data,
        date: dayjs.utc(data.date).format()
      });
    } else { //si no, esta creando
      createTask({
        ...data,//copia todo los datos que estas enviando al create
        date: dayjs.utc(data.date).format()//antes de enviarlo formatea la fecha
      });
    }
    navigate('/tasks');
  });

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">Título</label>
          <input
            type="text"
            name="title"
            placeholder="Títuto"
            {...register("title")}
            //el register devuelve 3 propiedades: onChange, value y name
            className="w-full bg-zinc-700 text-white px-4 py-2 rounden-md my-2"
            autoFocus
          />
          <label htmlFor="description">Descripción</label>
          <textarea
            name="description"
            id="description"
            rows="3"
            placeholder="Descripción"
            {...register("description")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounden-md my-2"
          />
          <label htmlFor="date">Fecha</label>
          <input 
          type="date" 
          name="date" 
          {...register("date")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounden-md my-2" />

          <button className="bg-indigo-500 px-3 py-2 rounded-md">Guardar</button>
        </form>
      </div>
    </div>
  );
}

export default taskFormPage;
