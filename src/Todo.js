import React from 'react'
import './Todo.css'
import { Grid, ListItem, ListItemIcon, ListItemText, Checkbox} from '@material-ui/core';

export default function Todo(props) {
  return (
      <div>
            <ListItem className="ListItem" key={props.textname}   >
                <Grid container align="end">
                    <Grid item xs={3}>
                    </Grid>

                    <Grid item>
                        <ListItemIcon >
                            <Checkbox size="small"
                                edge="start"
                                checked={props.isCompleted ? true : false}
                                onClick={()=> props.completeItem(props.taskNumber)}/>
                      </ListItemIcon>
                    </Grid>

                    <Grid item>
                        <ListItemText className={props.isCompleted ? "finishedTodo" : "unfinishedTodo"} id={props.taskName} primary={props.taskName}/>
                    </Grid>

                </Grid>
                
            </ListItem>
        </div>

    )
}