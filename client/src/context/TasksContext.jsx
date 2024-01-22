import { createContext, useContext, useState } from "react";

import { createTaskRequest, getTasksRequest, deleteTaskRequest, 
  getTaskRequest, updateTaskRequest } from "../api/tasks.js";

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

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter(task => task._id !== id));
      // Si responde 204, de las tareas filtrá cada una de las tareas
      // Si por cada tarea su id es distinto al id que acaba de recibir entonces conservalo
      // Esto crea un arreglo nuevo pero sin la tarea que acabo de borrar
    } catch (error) {
      console.log(error);
    }
    };
  
  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data; //devuelve la tarea
    } catch (error) {
      console.error(error);
    }
  }

  const updateTask = async (id, task) => { 
  //el 1er parametro es el id de la tarea que quiero actualizar, el 2do son los nuevos valores
    try {
      await updateTaskRequest(id, task);
    } catch (error) {
      console.error(error);
    }  
  }
  
  return (
    <TaskContext.Provider value={{ tasks, createTask, getTasks, deleteTask, getTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
}


