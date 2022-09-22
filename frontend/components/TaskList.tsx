import { Container, Grid, Stack } from "@mui/material"
import React from "react"
import { Task } from "../types/task"
import TaskItem from "./TaskItem"

type Props = {
  tasks: Task[],
  deleteTaskHandler: (id: number) => void,
}

const TaskList = (props: Props) => {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {props.tasks.map((task) => (
          <Grid key={task.id} item xs={12}>
            <TaskItem task={task} deleteTaskHandler={props.deleteTaskHandler} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  )
}

export default TaskList
