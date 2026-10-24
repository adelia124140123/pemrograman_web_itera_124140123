import React from 'react';
import Header from '../../components/Header/Header';
import TaskForm from '../../components/TaskForm/TaskForm';
import TaskItem from '../../components/TaskItem/TaskItem';
import useLocalStorage from '../../hooks/useLocalStorage';
import './Home.css';

function Home() {
  // Hanya 1 baris kode menggantikan seluruh boilerplate useEffect localStorage!
  const [tasks, setTasks] = useLocalStorage('tasks_data', []);

  const handleAddTask = (newTask) => setTasks([...tasks, newTask]);
  const handleDeleteTask = (taskId) => setTasks(tasks.filter(t => t.id !== taskId));
  const handleToggleComplete = (taskId) =>
    setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));

  return (
    <div className="home">
      <Header title="React Task Manager" description="Kelola tugas dengan Custom Hook" />
      <main className="container">
        <TaskForm onAddTask={handleAddTask} />
        <div className="task-list">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
