import { createContext, useContext, useState } from "react";

import { createTaskRequest, getTasksRequest } from "../api/tasks.js";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
        console.error(error)
    }

  }

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
      console.log(res.data);
    } catch (error) {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      //console.log(error);
      if (error.response) {
        // El servidor respondió con un código de estado diferente de 2xx
        console.log('Código de estado:', error.response.status);
        console.log('Datos de respuesta:', error.response.data);
      } else if (error.request) {
        // La solicitud fue realizada, pero no se recibió respuesta
        console.log('No se recibió respuesta del servidor');
      } else {
        // Ocurrió un error durante la configuración de la solicitud
        console.log('Error al configurar la solicitud', error.message);
      }
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, getTasks }}>{children}</TaskContext.Provider>
  );
}


