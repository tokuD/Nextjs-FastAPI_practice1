import { Box, Input, InputBase } from "@mui/material"
import React from "react"

type Props = {
  type: string
  ref: React.Ref<HTMLInputElement>
}

const InputForm = (props: Props) => {
  return (
    <React.Fragment>
      <Box component="form">
        <InputBase
          ref={props.ref}
          placeholder={props.type}
          className="w-full border-solid border rounded-sm bg-gray-50 p-1 focus-within:shadow-[1px_1px_1px_1px] focus-within:shadow-blue-200 focus-within:border-blue-400 "
        />
      </Box>
    </React.Fragment>
  )
}

export default InputForm
