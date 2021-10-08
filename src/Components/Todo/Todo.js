import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Todo.css';

function Todo() {
    // this is used to store the data receiving from the server 
    const [todo, setToDo] = useState([])

    // this is used to show the loading screen onload
    const [load, setLoad] = useState(true)

    // this is used to get the data from the input box
    const [task, setTask] = useState("")


    // useEffect is used to render the data on load/Intializing of the page  
    useEffect(async () => {
        fetchTaskList()
    }, [])

    // Api call to get the data from the server
    let fetchTaskList = async () => {
        try {
            // using axios package to fetch the data 
            let todo_data = await axios.get("https://suryastodoapp.herokuapp.com/list-all-todo")

            // this is a hook used to store the data in the todo variable
            setToDo([...todo_data.data])
            setLoad(false)
        }
        catch (error) {
            window.alert("Sorry something went wrong!")
            setLoad(false)
        }
    }

    // Api call to post the data into the server
    let handlecreate = async () => {
        try {
            let postData = await axios.post("https://suryastodoapp.herokuapp.com/create-task", { message: task })

            // calling the get method to display the data in DOM
            fetchTaskList()

            // making the input box empty after 
            // the data is pushed to the server and displayed on the DOM
            setTask("")
        } catch (error) {
            console.log(error)
        }
    }

    let handleChange = async (e, id) => {
        try {
            let updateData = await axios.put(`https://suryastodoapp.herokuapp.com/update-task/${id}`, { status: e.target.checked })
            fetchTaskList()
        }
        catch (error) {
            alert(error);
        }
    }

    let handleDelete = async (id) => {
        try {
            // alert(id)
            let deleteData = await axios.delete(`https://suryastodoapp.herokuapp.com/delete-task/${id}`)
            fetchTaskList()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="Container">
            <div className="row mt-2">
                <h4>Add Task:</h4>
                <div className="input_div col-lg-8">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Type Here..." aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <button onClick={() => handlecreate()} className="btn btn-outline-secondary" type="button" id="button-addon2">Submit</button>
                    </div>
                </div>
                <div className="col-lg-8">
                    <ul className="list-group">
                        {
                            load ? <h1>Loading...</h1> :
                                todo.map((data) => {
                                    return (
                                        <li className="taskDisplay_div list-group-item">
                                            <div className="liTaskDisplay">
                                                <input className="form-check-input me-1" checked={data.status} type="checkbox" value="" aria-label="..." onChange={(e) => handleChange(e, data._id)} />
                                                <span style={{ textDecoration: data.status ? "line-through" : "" }}>{data.message}</span>
                                            </div>
                                            <div className="deleteButton_div">
                                                <span className="badge bg-danger rounded-pill" onClick={() => handleDelete(data._id)}>X</span>
                                            </div>
                                        </li>
                                    )
                                })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Todo
