import React , {useState} from 'react'
import {BiCheckDouble ,BiEditAlt , BiTrash ,BiCheckCircle,BiRefresh } from 'react-icons/bi'
import './todolist.css'
  export default function Todolist() {
    
   const [todos , setTodos] = useState([]);
    const [inputValue , setInputValue] = useState('');
    const[editIndex , setEditIndex] = useState(-1);

    const addTodo = () => {
        if(inputValue.trim() !== ''){
           if(editIndex !== -1){
            const updatedTodos =[...todos];
            updatedTodos[editIndex]={task : inputValue , completed : updatedTodos[editIndex].completed};
            setTodos(updatedTodos);
            setEditIndex(-1)
            setInputValue('')
           }
           else{
            setTodos([...todos , {task : inputValue , completed : false}]);
            setInputValue('');
           }
        }
    }

    const startEdit = (index) => {
        setInputValue(todos[index].task);
        setEditIndex(index);

    }

    const canselEdit = () => {
        setInputValue('');
        setEditIndex(-1);
    }

    return (
    <div className='todo-container'>
        <h1>To Do List</h1>
        <div className="input-section">
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTodo()} placeholder='Add a new task' className="input-field" />
            {editIndex !== -1 ? (
                <>
                 <button className="update-btn" onClick={addTodo}><BiCheckDouble /></button>
                 <button className="cancel-btn" onClick={canselEdit}><BiRefresh /></button>
                </>
                 ) : (
                 <button className="add-btn" onClick={addTodo}>Add </button>
                 )}
        </div>
        {todos.length === 0 && <p className="empty-msg">No tasks yet. Add one above!</p>}
        <ul className="todo-list">
            {todos.map((todo , index) => (
                <li key={index} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                    <span>{todo.task}</span>
                    <div className="btn-group">
                        <button className="btn-edit" title="Edit" onClick={() => startEdit(index)}><BiEditAlt /></button>
                        <button className="btn-done" title="Complete" onClick={() => {
                            const updatedTodos = [...todos];
                            updatedTodos[index].completed = !updatedTodos[index].completed;
                            setTodos(updatedTodos);
                        }}><BiCheckCircle /></button>
                        <button className="btn-remove" title="Delete" onClick={() => {
                            const updatedTodos = todos.filter((_, i) => i !== index);
                            setTodos(updatedTodos);
                        }}><BiTrash /></button>
                    </div>
                </li>
            ))}
        </ul>   
    </div>
    )
}
