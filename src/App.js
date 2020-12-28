
import React, {useState, useEffect} from "react";
import Todo from './Todo.js'
import './App.css'
import { IconButton, List, Grid, AppBar, Typography, Toolbar,  Button, FormControl, InputLabel, Input } from '@material-ui/core'
import moment from 'moment'
import db from './firebase.js'
import firebase from 'firebase'
import EcoIcon from '@material-ui/icons/Eco'


export default function App() {
    const [todos, setTodos] = useState([]);
    const [textInput, settextInput] = useState('')

    useEffect(() => {
      db.collection(`to-dos`).orderBy("task_id").onSnapshot(snapshot => {
        console.log(snapshot.docs.map(doc => doc.data()))
        setTodos(snapshot.docs.map(doc => doc.data()))
      })
    }, [])
      
    const updateInput = (e) => {
      const newInput = e.target.value
      settextInput(newInput)
    }
   
    const addnewItem = (e) => {
      e.preventDefault();  // to stop the refresh
      const newTodo = textInput;
      db.collection('to-dos').add({
          task_id: todos.length, 
          task: newTodo, 
          isCompleted: false,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
          
        })
      settextInput(' ');  // clear text input
    
    } 
  
    const completeItem = (taskNumber) => {
        db.collection('to-dos').get()
        .then( querySnapshot => {
            querySnapshot.forEach(document => {
                var docref= db.collection('to-dos').doc(document.id) 
                if (document.data().task_id === taskNumber) {
                    console.log(document.data().task_id)
                    docref.delete() 
                }         
              })
        })
    }
    const deleteAllItems = () => {
        setTodos([])
        db.collection('to-dos').get()
            .then( querySnapshot => {
                querySnapshot.forEach(document => {
                    var docref= db.collection('to-dos').doc(document.id) 
                    docref.delete()  
                })
            })
    }
    
    const currentDate = moment().format('dddd, MMMM Do YYYY')  
  
    const todoList = todos.map(object => {
      return(
       <Todo 
        key={object.task_id}
        taskNumber={object.task_id} 
        taskName={object.task} 
        isCompleted={object.isCompleted} 
        completeItem={completeItem}
      /> 
     )
   }) 
  
    return (
      <div className="App">
          <Grid container direction="column" justify="center" spacing={3}>
              <Grid item container>
                  <Grid item>
                    <AppBar styles={{position: "static"}}>
                        <Toolbar>
                            <Typography  className="title"> {currentDate} </Typography>
                            <IconButton edge="end" color="inherit">
                                <EcoIcon/>
                            </IconButton>
                        </Toolbar>
                    </AppBar> 
                  </Grid>
              </Grid>

              <Grid item align="center">
                <div className="addItem" style={{marginTop: "80px"}}>
                    <form styles={{position: "static"}} onSubmit={addnewItem} noValidate>            
                        <FormControl>
                            <InputLabel>Write a Todo</InputLabel>
                                <Input 
                                type="text"
                                name="newItem"
                                placeholder="New task"
                                value={textInput}
                                onChange={updateInput} />
                        </FormControl>
                        <Button disabled={!textInput} variant="contained" color="primary" type="submit" > Add </Button>
                    </form>
                </div>
              </Grid>

              <Grid item align="center" >
                  
                <div className="TodoList">
                    <List styles={{display: "flex"}}>
                    {todoList}
                    </List>
                </div>

                <div className="delete">
                    <Button variant="outlined" size="small" onClick={deleteAllItems}> Clear </Button>  
                </div>
                
              </Grid>
          </Grid>
      </div>
    );
  }