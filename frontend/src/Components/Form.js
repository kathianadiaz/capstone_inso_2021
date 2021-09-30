import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm, cntrol } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Form.scss";

// const schema = yup.object().shape({
//   Name: yup.string().required("Name required"),
//   Email: yup.string().email().required("Email required"),
//   password: yup
//     .string()
//     .min(6, "Password has to be of atleast 6 characters")
//     .max(15, "Password can not be more than 15 characters")
//     .required("Password required"),
// });
function FormInput(props) {
  //   const { register, handleSubmit, errors, watch } = useForm({
  //     resolver: yupResolver(schema),
  //   });

  // console.log(watch());
  // const onSubmit = (data) => {
  //   console.log(data);
  // };
  return (
    <>
      <Form.Group
        className="mb-3"
        controlId={"formBasicEmail" + props.inputName}
      >
        <Form.Label>{props.inputName}:</Form.Label>
        <Form.Control
          inputName={props.inputName}
          type={props.type}
          placeholder={"Enter " + props.inputName}
        />
      </Form.Group>
    </>
  );
}

export default FormInput;
