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
import EditIcon from "@mui/icons-material/Edit"
type Props = {
  task: Task
  deleteTaskHandler: (id: number) => void
}

const updateTask = async (task: Task, isCompleted: boolean) => {
  const res = await fetch(
    `https://hqb5du.deta.dev/tasks/update?id=${task.id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task.title,
        is_completed: isCompleted,
      }),
    }
  )
  return await res.json()
}

const deleteTask = async (task: Task) => {
  const res = await fetch(
    `https://hqb5du.deta.dev/tasks/delete?id=${task.id}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
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
          className={isCompleted ? "text-gray-400" : "text-gray-900"}
        />
        <Box>
          <Button color="primary">
            <EditIcon className="text-blue-400" />
            <Typography className="text-blue-500">EDIT</Typography>
          </Button>
          <Button color="error" onClick={deleteHandler}>
            <DeleteIcon className="text-red-500" />
            <Typography className="text-red-500">DELETE</Typography>
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default TaskItem
