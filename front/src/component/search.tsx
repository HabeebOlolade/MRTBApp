import { TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const StyledTextField = styled(TextField)`
  // working
  & .MuiFormLabel-root {
    color: black;
  }
  & .MuiInputLabel-root {
    color: black !important;
  }

  & .MuiInput-root:before {
    border-color: black;
  }
  & .MuiInput-root:after {
    border-color: black;
  }
  & .MuiInputBase-input {
    color: black;
  }
`;

export default function SearchForm() {
  const [userInput, setUserInput] = useState("");

  const dispatch = useDispatch();

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setUserInput(event.target.value);
  }

  return (
    <div style={{ marginRight: "75px" }}>
      <StyledTextField
        id="standard-basic"
        label="Search Registrants"
        variant="standard"
        onChange={onChangeHandler}
      />
    </div>
  );
}
