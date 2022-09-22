import { Container } from "@mui/material"
import { GetServerSideProps } from "next"
import React, { useState } from "react"
import TaskList from "../../components/TaskList"
import { Task } from "../../types/task"

type Props = {
  tasks: Task[]
}

const Tasks = (props: Props) => {
  const [tasks, setTasks] = useState(props.tasks)

  const deleteTaskHandler = (id: number) => {
    setTasks(tasks.filter((task) => task.id != id))
  }

  return (
    <React.Fragment>
      <Container
        maxWidth="sm"
        className="bg-gray-300 rounded-md shadow-md mt-3 p-3"
      >
        <TaskList tasks={tasks} deleteTaskHandler={deleteTaskHandler} />
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
