import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormInput from "./Form";
import InputTag from "./InputTag";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./Form.scss";

const schema = Yup.object()
  .shape({
    name: Yup.string().required("Name required"),
    description: Yup.string().required("Description required"),
    department: Yup.string().required("Department required"),
    email: Yup.string().email().required("Email required"),
    tags: Yup.array().min(1, "Atleast 1 tag required").required(),
    links: Yup.array().min(1, "Atleast 1 link required").required(),
  })
  .required();

function OrganizationCreation(props) {
  const [state, setState] = useState([]);
  const [tagData, setTagData] = useState([]);
  const handleSubmit1 = (e) => {
    e.preventDefault();
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmission = (data) => {
    console.log(JSON.stringify(data, null, 2));
  };
  console.log(tagData);
  return (
    <div className="Formcontainer">
      <div className="Formcontainer-logo">
        <img
          src="/TempLogo.png"
          className="form-logo"
          alt="React Bootstrap logo"
        />{" "}
      </div>
      {/* <button onClick={setState("BAH")}>HERE</button> */}
      <Form onSubmit={handleSubmit(onSubmission)}>
        <Form.Label className="form-name" column="lg" lg={2}>
          Create an organization
        </Form.Label>
        {/* <FormInput type="text" inputName="Name" />
        <FormInput type="text" inputName="Description" />
        <FormInput type="text" inputName="Department" />
        <FormInput type="email" inputName="Contact - Email" /> */}
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          {...register("name")}
          placeholder={"Organization Name"}
        />
        <p className="error-message">{errors.name?.message}</p>

        <Form.Label>Description:</Form.Label>
        <Form.Control
          type="text"
          {...register("description")}
          placeholder={"Description"}
        />
        <p className="error-message">{errors.description?.message}</p>
        <Form.Label>Department:</Form.Label>
        <Form.Control
          type="text"
          {...register("department")}
          placeholder={"Department"}
        />
        <p className="error-message">{errors.department?.message}</p>
        <Form.Label>Contact-email:</Form.Label>
        <Form.Control
          type="text"
          {...register("email")}
          placeholder={"Contact-Email"}
        />
        <p className="error-message">{errors.email?.message}</p>

        <InputTag tagData={setTagData} tagsType="Tags" />
        {/* {console.log(tagData)} */}
        <InputTag tagsType="Links" />

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
  );
}

export default OrganizationCreation;
