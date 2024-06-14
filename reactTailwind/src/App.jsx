import './App.css'
import { useState } from 'react'

function App() {
  const [toDoList, setToDoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleEditChange = (event) => {
    setEditedTask(event.target.value);
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = {
      id: toDoList.length === 0 ? 1 : toDoList[toDoList.length - 1].id + 1,
      taskName: newTask,
      completed: false,
    }
    setToDoList([...toDoList, task]);
    setNewTask(""); 
  };

  const editTask = (id) => {
    setEditTaskId(id);
    const taskToEdit = toDoList.find(task => task.id === id);
    setEditedTask(taskToEdit.taskName);
  };

  const updateTask = () => {
    const updatedToDoList = toDoList.map(task =>
      task.id === editTaskId ? { ...task, taskName: editedTask } : task
    );
    setToDoList(updatedToDoList);
    setEditTaskId(null);
    setEditedTask("");
  };

  const toggleCompletion = (id) => {
    const updatedToDoList = toDoList.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setToDoList(updatedToDoList);
  };

  const deleteTask = (id) => {
    const newToDoList = toDoList.filter(task => task.id !== id);
    setToDoList(newToDoList);
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='bg-gray-100 p-8 rounded-lg shadow-md'>
        <h1 className='text-3xl font-bold mb-4'>ToDo List</h1>
        <div className='flex items-center mb-4'>
          <input
            className='flex-grow p-2 mr-2 border border-gray-300 rounded'
            type='text'
            placeholder='Add a new task'
            value={newTask}
            onChange={handleChange}
          />
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded'
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
        <div className='space-y-4'>
          {toDoList.slice().reverse().map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between bg-white p-4 shadow-md rounded ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}
            >
              {editTaskId === task.id ? (
                <input
                  className='flex-grow p-2 mr-2 border border-gray-300 rounded'
                  type='text'
                  value={editedTask}
                  onChange={handleEditChange}
                />
              ) : (
                <h2 className='text-lg'>{task.taskName}</h2>
              )}
              <div>
                {!task.completed && (
                  <button
                    className='mr-2 text-green-500'
                    onClick={() => toggleCompletion(task.id)}
                  >
                    ✓
                  </button>
                )}
                {editTaskId === task.id ? (
                  <button
                    className='mr-2 text-blue-500'
                    onClick={updateTask}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className='mr-2 text-blue-500'
                    onClick={() => editTask(task.id)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className='text-red-500'
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
