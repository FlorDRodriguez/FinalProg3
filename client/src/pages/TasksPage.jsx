import { useEffect } from 'react';
import { useTasks } from '../context/TasksContext';

function TasksPage () {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks(); //useEffect carga las tareas
  }, []);

  if (tasks.length === 0) return (<h1>No hay tareas.</h1>)

  return (
    <div>
      {
        tasks.map(task => (
          <div key={task._id}>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
          </div>
        ))
      }
    </div>
  )
}

export default TasksPage;
