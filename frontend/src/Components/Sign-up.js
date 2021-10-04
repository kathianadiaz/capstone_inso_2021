import React from "react";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as Yup from "yup";
import "./Form.scss";

const schema = Yup.object()
  .shape({
    name: Yup.string().required("Name required"),
    username: Yup.string().required("Username required"),
    email: Yup.string().email().required("Email required"),
    password: Yup.string()
      .min(6, "Password has to be of atleast 6 characters")
      .max(15, "Password can not be more than 15 characters")
      .required("Password required"),
  })
  .required();

function Signup(props) {
  const [toggleRedirect, setToggleRedirect] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  // const getUser = () => {
    // axios.get("http://localhost:8000/user/94f60f5f-0b62-49d1-b647-7e03105cae33").then((response) => {
      // console.log(response.data);
    // });
  // };

  const add_new_user = async (data) => {
    // const parameters = new URLSearchParams();
    // parameters.append("name", data.name);
    // parameters.append("username", data.username);
    // parameters.append("email", data.email);
    // parameters.append("password", data.password);
    let json = {
      "name": data.name,
      "username": data.username,
      "email": data.email,
      "password": data.password
    } 
    await axios
      .post("http://localhost:8000/register", json)
      .then((response) => {
        console.log(response);
        setToggleRedirect(true)
      })
      .catch((error) => {
        console.log(error);
        // If error notify user
      });
  };

  const onSubmission = (data) => {
    console.log(JSON.stringify(data, null, 2));
    add_new_user(data);
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
            Sign-up
          </Form.Label>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            {...register("name")}
            placeholder={"Name"}
          />
          <p className="error-message">{errors.name?.message}</p>
          {/* <button onClick={getUser}>Click me</button> */}
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            {...register("username")}
            placeholder={"Username"}
          />
          <p className="error-message">{errors.username?.message}</p>

          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="Email"
            {...register("email")}
            placeholder={"Email"}
          />
          <p className="error-message">{errors.email?.message}</p>

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
          <a href="">Already joined? Login</a>
        </div>
      </div>
      <p>Copyright © 2021</p>

      {/* <footer className="c-right">
        <p>Copyright © 2021</p>
      </footer> */}
    </>
  );
}

export default Signup;
