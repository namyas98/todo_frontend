import { useQuery, useMutation, useQueryClient } from "react-query"
import { getTasks, createTask, updateTask, deleteTask } from "../../api/tasksApi"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'
import {descendingSort} from './descendingSort'

const TodoList = () => {
    const [newTask, setNewTask] = useState('')
    const queryClient = useQueryClient()

    const {
        isLoading,
        isError,
        error,
        data: tasks
    } = useQuery('tasks', getTasks, {
        select: data => data.sort((x,y) =>{
            return descendingSort(x,y);
        })
        
    })
    

    const addMutation = useMutation(createTask, {
        onSuccess: () => {
            // Invalidates cache and refetch 
            queryClient.invalidateQueries("tasks")
        }
    })

    const updateMutation = useMutation(updateTask, {
        onSuccess: () => {
            // Invalidates cache and refetch 
            queryClient.invalidateQueries("tasks")
        }
    })

    const deleteMutation = useMutation(deleteTask, {
        onSuccess: () => {
            // Invalidates cache and refetch 
            queryClient.invalidateQueries("tasks")
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        addMutation.mutate({taskname: newTask});
        setNewTask('');
    }
    
    const TaskList = (
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-task">Enter a new task!</label>
            <div className="new-task">
                <input 
                    type="text" 
                    id="new-task" 
                    value= {newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter a new task!"/>
                
            </div>
            <button className="submit">
                <FontAwesomeIcon icon={faPlus}/>
            </button>
        </form>
    )

    let content
    if(isLoading){
        content = <h1>Loading Tasks...</h1>
    } else if (isError) {
        content = <h1>{error.message}</h1>
    } else if(!tasks.length){
    } else {
        content = tasks.map((task) => {
            return (
                <section key= {task._id}>
                    <div className="task">
                    <input 
                        type="checkbox" 
                        checked={task.completed}
                        id={task._id}
                        onChange = {() => {
                            updateMutation.mutate({...task, completed: !task.completed})
                        }}
                    ></input>
                    <label className='task' htmlFor= {task._id}>{task.taskname}</label>
                </div>
                <button className="delete-button" onClick={ () => {
                    deleteMutation.mutate({_id : task._id})} 
                }><FontAwesomeIcon icon={faTrash}/></button>
            </section>)
        }) 
    }


    
    return(
        <main>
            <h1>ToDo List</h1>
            {TaskList}
            {content}
        </main>
    )
    
};

export default TodoList