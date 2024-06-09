import { useState, useEffect } from 'react';
import './App.css';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin7Fill } from "react-icons/ri";
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState(""); // Input text
  const [todos, setTodos] = useState([]); // Holds all todos
  const [showFinished, setShowFinished] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className={`mx-3 md:container md:mx-auto my-5 rounded-xl p-5 min-h-[80vh] md:w-1/2 shadow-lg ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <h1 className='font-bold text-center text-2xl mb-5'>TaskTrek - Manage your Todos in one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input type="text" onChange={handleChange} value={todo} className={`w-full p-2 border-2 rounded-md ${darkMode ? 'dark' : 'light'}`} placeholder="Enter your todo..." />
          <button onClick={handleAdd} disabled={todo.length < 3} className='bg-blue-800 hover:bg-blue-950 p-3 py-1 text-white disabled:bg-blue-900 rounded-md text-sm font-bold cursor-pointer'>Save</button>
        </div>
        <div className="flex items-center gap-2 mb-5">
          <input type="checkbox" onChange={toggleFinished} checked={showFinished} className='cursor-pointer' />
          <label className='text-sm'>Show Finished</label>
        </div>
        <div className="h[1px] bg-gray-200 w-[90%] mx-auto my-2"> <hr /> </div>
        <h2 className='text-lg font-bold mb-3'>Your Todos</h2>
        <div className="todos space-y-4">
          {todos.length === 0 && <div className='m-5'>No Todo to Display</div>}
          {
            todos.filter(item => showFinished || !item.isCompleted).map(item => {
              return (showFinished || !item.isCompleted) && (
                <div key={item.id} className={`todo flex justify-between items-center p-3 rounded-md shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                  <div className='flex items-center gap-4'>
                    <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} className='cursor-pointer' />
                    <div className={item.isCompleted ? "line-through text-gray-500" : ""}>{item.todo}</div>
                  </div>
                  <div className="buttons flex gap-2">
                    <button onClick={() => handleEdit(item.id)} className='bg-yellow-500 hover:bg-yellow-600 p-2 text-white rounded-md text-sm font-bold'><FaEdit />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className='bg-red-500 hover:bg-red-600 p-2 text-white rounded-md text-sm font-bold'><RiDeleteBin7Fill />
                    </button>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </>
  );
}

export default App;
