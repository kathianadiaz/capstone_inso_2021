import React, { useState, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import InputTag from "./InputTag";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./Form.scss";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const schema = Yup.object()
  .shape({
    name: Yup.string().required("Name required"),
    description: Yup.string().required("Description required"),
    department: Yup.string().required("Department required"),
    email: Yup.string().email().required("Email required"),
    // tags: Yup.array().min(2, "Atleast 1 tag required").required(),
    // links: Yup.array().min(1, "Atleast 1 link required").required(),
  })
  .required();

function OrganizationCreation(props) {
  const [state, setState] = useContext(AuthContext);
  const [tagData, setTagData] = useState([]);
  const [linkData, setLinkData] = useState([]);
  // const [toggleRedirect, setToggleRedirect] = useState(false);
  const [organizationData, SetOrganizationData] = useState([]);
  const [stockImage, setStockImage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // console.log(tagData);
  useEffect(() => {
    createStockImage();
  }, []);

  const createOrganization = async (data) => {
    // const parameters = new URLSearchParams();
    // parameters.append("name", data.name);
    // parameters.append("username", data.username);
    // parameters.append("email", data.email);
    // parameters.append("password", data.password);
    let json = {
      name: data.name.toLowerCase(),
      description: data.description.toLowerCase(),
      department: data.department.toLowerCase(),
      email: data.email.toLowerCase(),
      tags: data.tags,
    };
    axios.defaults.headers.post["Authorization"] = `Bearer ${state.token}`;
    axios
      .post("http://localhost:8000/organization", json)
      .then((response) => {
        SetOrganizationData(response);
        // console.log(organizationData.data);
        // console.log(response);
        // console.log(stockImage);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        axios
          .post(
            `http://localhost:8000/organization/${response.data.o_id}/image`,
            stockImage,
            config
          )
          .then((response) => {
            // console.log(response);
            setRedirect(true);
            // console.log(redirect);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
        // If error notify user
      });
  };

  async function createStockImage() {
    let response = await fetch("/defaultorganization.png");
    let data = await response.blob();
    let file = new File([data], "stockimage.jpg");
    const imageDatas = new FormData();
    imageDatas.append("image", file);
    // console.log(image);
    setStockImage(imageDatas);
  }
  const onSubmission = (data) => {
    // append tagData data
    data.tags = tagData;
    data.links = linkData;
    createOrganization(data);
    // console.log(JSON.stringify(data, null, 2));
    // setToggleRedirect(true);
    // console.log(JSON.stringify(tagData));
  };
  const checkKeyDown = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };
  console.log(stockImage);
  return (
    <div className="Formcontainer">
      {redirect !== true ? null : (
        <Redirect to={`/organization-profile/${organizationData.data.o_id}`} />
      )}

      <div className="Formcontainer-logo">
        <img
          src="/TempLogo.png"
          className="form-logo"
          alt="React Bootstrap logo"
        />{" "}
      </div>
      <Form onSubmit={handleSubmit(onSubmission)} onKeyDown={checkKeyDown}>
        <Form.Label
          onClick={createStockImage}
          className="form-name"
          column="lg"
          lg={2}
        >
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
          as="textarea"
          rows={3}
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
          type="Email"
          {...register("email")}
          placeholder={"Contact-Email"}
        />
        <p className="error-message">{errors.email?.message}</p>
        <InputTag tagData={setTagData} tagsType="Tags" />
        {/* <InputTag linkData={setLinkData} tagsType="Links" /> */}

        {/* {console.log(tagData)} */}
        {/* <InputTag linkData={setLinkData} tagsType="Links" /> */}
        <Button variant="continue-btn" type="submit">
          Continue
        </Button>
      </Form>

      <p>Copyright ?? 2021</p>
    </div>
  );
}

export default OrganizationCreation;
