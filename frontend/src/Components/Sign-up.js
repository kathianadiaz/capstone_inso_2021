import React from "react";
import { Redirect, Link } from "react-router-dom";
import { Form, Button, Toast, ToastContainer, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as Yup from "yup";
import "./Form.scss";
import { useMutation } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const schema = Yup.object()
  .shape({
    name: Yup.string().required("Name required"),
    username: Yup.string().required("Username required"),
    email: Yup.string()
      .email()
      .matches(/edu$/, "Only University emails accepted")
      .required("Educational email required"),
    password: Yup.string()
      .min(6, "Password has to be of atleast 6 characters")
      .max(15, "Password can not be more than 15 characters")
      .required("Password required"),
  })
  .required();

function Signup(props) {
  const [toggleRedirect, setToggleRedirect] = React.useState(false);

  const [showA, setShowA] = React.useState(false);
  const toggleShowA = () => setShowA(!showA);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postNewUser = async (data) => {
    let json = {
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
    };

    return await axios.post("http://localhost:8000/register", json);
  };

  const handleSignUpData = useMutation((data) => postNewUser(data), {
    onSuccess: async () => {
      setToggleRedirect(true);
    },
    onError: async (error) => {
      if (error.response.status === 400) {
        toggleShowA();
      }
    },
  });

  const onSubmission = (data) => {
    console.log(data);
    handleSignUpData.mutate(data);
  };

  return (
    <>
      {toggleRedirect && <Redirect to="/" />}
      <ToastContainer position="top-end" className="m-3">
        <Toast show={showA} onClose={toggleShowA} bg="danger">
          <Toast.Header className="py-4">
            <strong className="me-auto">
              <FontAwesomeIcon icon={faExclamationTriangle} /> Username or Email
              already in use
            </strong>
          </Toast.Header>
        </Toast>
      </ToastContainer>
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

          <Form.Label>University Email:</Form.Label>
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
          <Link to="/SignIn">Already joined? Login</Link>
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
