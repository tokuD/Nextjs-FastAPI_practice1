import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { Task } from "../types/task"
import DeleteIcon from "@mui/icons-material/Delete"
type Props = {
  task: Task,
  deleteTaskHandler: (id: number) => void
}

const updateTask = async (task: Task, isCompleted: boolean) => {
  const res = await fetch(`http://localhost:8000/tasks/update?id=${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: task.title,
      is_completed: isCompleted,
    }),
  })
  return await res.json()
}

const deleteTask = async (task: Task) => {
  const res = await fetch(`http://localhost:8000/tasks/delete?id=${task.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return await res.json()
}

const TaskItem = (props: Props) => {
  const { task } = props
  const [isCompleted, setIsCompleted] = useState<boolean>(task.is_completed)

  const checkedChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCompleted(event.target.checked)
  }

  const deleteHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    deleteTask(task)
    props.deleteTaskHandler(task.id)
  }

  useEffect(() => {
    const data = updateTask(task, isCompleted)
    console.log(data)
  }, [task, isCompleted])

  return (
    <React.Fragment>
      <Box className="flex items-center justify-between">
        <FormControlLabel
          control={
            <Checkbox checked={isCompleted} onChange={checkedChangeHandler} />
          }
          label={task.title}
        />
        <Button color="error" onClick={deleteHandler}>
          <DeleteIcon className="text-red-500" />
          <Typography className="text-red-500">DELETE</Typography>
        </Button>
      </Box>
    </React.Fragment>
  )
}

export default TaskItem