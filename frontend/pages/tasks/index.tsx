import {
  Box,
  Button,
  Container,
  Grid,
  Input,
  InputBase,
  TextField,
  Typography,
} from "@mui/material"
import { GetServerSideProps } from "next"
import React, { useEffect, useRef, useState } from "react"
import InputForm from "../../components/InputForm"
import TaskList from "../../components/TaskList"
import { Task } from "../../types/task"
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
type Props = {
  tasks: Task[]
}

const addTask = async (title: string) => {
  const res = await fetch("http://localhost:8000/tasks/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
    }),
  })
  return await res.json()
}

const Tasks = (props: Props) => {
  const [tasks, setTasks] = useState(props.tasks)
  const [filteredTasks, setFilteredTasks] = useState(props.tasks)
  const [formType, setFormType] = useState("search")
  const formRef = useRef<HTMLInputElement>(null)

  const deleteTaskHandler = (id: number) => {
    setTasks(tasks.filter((task) => task.id != id))
  }

  const setAddHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setFormType("add")
    formRef.current?.focus()
  }

  const setSearchHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setFormType("search")
    formRef.current?.focus()
  }

  const onSubmitHandler = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (formRef.current == null) return
    if (formType === "add") {
      addTask(formRef.current.value)
      setTasks((prev) => [
        ...prev,
        {
          title: formRef.current!.value,
          is_completed: false,
          id: prev.length + 1,
        },
      ])
      formRef.current.value = ""
    }
  }

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (formType === "search") {
      setFilteredTasks(() => {
        return tasks.filter((task) =>
          task.title.includes(formRef.current!.value.toLowerCase())
        )
      })
    }
  }

  return (
    <React.Fragment>
      <Container
        maxWidth="sm"
        className="bg-gray-300 rounded-md shadow-md mt-3 p-3"
      >
        <Typography variant="h2" className="text-center">
          Things to do
        </Typography>
        <Box component="form" onSubmit={onSubmitHandler}>
          <InputBase
            inputRef={formRef}
            placeholder={formType}
            onChange={onChangeHandler}
            type="sumbit"
            className="w-full border-solid border rounded-sm bg-gray-50 p-1 focus-within:shadow-[1px_1px_1px_1px] focus-within:shadow-blue-200 focus-within:border-blue-400 "
          />
        </Box>
        <TaskList tasks={filteredTasks} deleteTaskHandler={deleteTaskHandler} />
        <Grid container className="mt-5">
          <Grid item xs={2} className="flex">
            <Button onClick={setAddHandler}>
              <AddIcon />
            </Button>
            <Button onClick={setSearchHandler}>
              <SearchIcon />
            </Button>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default Tasks

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await fetch(process.env.BACKEND_HOST + "/tasks")
  const tasks = await res.json()
  return {
    props: {
      tasks,
    },
  }
}
