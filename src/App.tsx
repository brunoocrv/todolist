import { useState } from 'react';
import { Books, PlusCircle } from '@phosphor-icons/react';

import './global.css';
import styles from './App.module.css';

import { Header } from './components/Header/Header';
import { Task } from './components/Task/Task';

type TasksShape = {
  id: number;
  description: string;
  done: boolean;
}

function App() {
  const [tasks, setTasks] = useState<TasksShape[]>([]);
  const [currentTask, setCurrentTask] = useState<string>('');

  const addTask = () => {
    event?.preventDefault();

    const newTask: TasksShape = {
      id: Math.random(),
      description: currentTask,
      done: false
    }

    setTasks(state => [...state, newTask]);
    setCurrentTask('');
  };

  const onDeleteTask = (id: number) => {
    const tasksWithoutDeleted = tasks.filter(task => task.id !== id);
    
    setTasks(tasksWithoutDeleted);
  };

  const onSelectTask = (id: number) => {
    const tasksWithChanged = tasks.map(task => {
      if(task.id === id) {
        return {...task, done: !task.done};
      }

    return task;
   });

    setTasks(tasksWithChanged);
  };

  const getDoneTasks = () => {
    const doneTasks = tasks.filter(task => task.done);

    return `${doneTasks.length} de ${tasks.length}`;
  }

  return (
    <>
      <Header />
      <section className={styles.wrapper}>
          <form onSubmit={addTask} className={styles.createTask}>
            <input 
              className={styles.input} 
              name='task' 
              onChange={(event) => setCurrentTask(event.target.value)} 
              value={currentTask}
              placeholder='Adicione uma nova tarefa'
            />
            <button 
              onClick={() => setTasks}
              className={styles.button}
              type='submit'
            >
              Criar
              <PlusCircle size={20} />
            </button>
          </form>

        <section className={styles.mainContent}>
          <section className={styles.statusContainer}>
            <div className={styles.status}>
              <span className={styles.created}>Tarefas criadas</span>
              <span>{tasks.length}</span>
            </div>
            <div className={styles.status}>
              <span className={styles.done}>Concluídas</span>
              <span>{`${getDoneTasks()}`}</span>
            </div>
          </section>
        </section>

        {
          tasks.length <= 0 ? (
            <div className={styles.emptyList}>
              <Books size={70} />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          ) : tasks.map(task => 
            <Task 
              key={task.id} 
              description={task.description} 
              hasDone={task.done} 
              handleChange={() => onSelectTask(task.id)} 
              handleRemove={() => onDeleteTask(task.id)} 
            />) 
        }
        </section>
    </>
  )
}

export default App
