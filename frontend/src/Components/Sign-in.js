import React from "react";
import { Form, Button } from "react-bootstrap";
import FormInput from "./Form";
import { useForm, Controller } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./Form.scss";
import axios from "axios";

const schema = Yup.object()

.shape({
  username: Yup.string().required("Username required"),
  password: Yup.string()
    .min(6, "Password has to be of atleast 6 characters")
    .max(15, "Password can not be more than 15 characters")
    .required("Password required"),
})
.required();

function SignForm(props) {

  const [toggleRedirect, setToggleRedirect] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const verifyUser = async (data) => {
    const parameters = new URLSearchParams();
    parameters.append("username", data.username);
    parameters.append("password", data.password);
    
    await axios 
      .post("http://localhost:8000/token", parameters)
      .then((response) => {
        console.log(response);
        setToggleRedirect(true);

        // TODO: save JWT token and other data
      })
      .catch((error) => {
        console.log(error);
        // If error notify user
      });
  };

  const onSubmission = (data) => {
    console.log(JSON.stringify(data, null, 2));
    verifyUser(data);
  };

  return (
    <>
      {toggleRedirect && <Redirect to="/"/>}
      <div className="Formcontainer">
        <div className="Formcontainer-logo">
          <img
            src="/TempLogo.png"
            className="form-logo"
            alt="React Bootstrap logo"
          />{" "}
        </div>

        <Form onSubmit={handleSubmit(onSubmission)}>
          <Form.Label className="form-name" column="lg" lg={2}>
            Sign-in
          </Form.Label>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            {...register("username")}
            placeholder={"Username"}
          />
          <p className="error-message">{errors.username?.message}</p>

          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            {...register("password")}
            placeholder={"Password"}
          />
          <p className="error-message">{errors.password?.message}</p>

          <Button variant="continue-btn" type="submit">
            Continue
          </Button>
        </Form>

        <div className="Formcontainer-options">
          <a href="">Forgot your password?</a>
          <a href="">New? Sign up</a>
        </div>
        <p>Copyright © 2021</p>
      </div>
    </>
  );
}

export default SignForm;
