import React, { useState, useRef, useContext } from "react";
import { Button, Image, Spinner, Container } from "react-bootstrap";
import "./UserProfile.scss";
import OrgIcon from "./organizationIcon.js";
import EditM from "./EditModal.js";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlusSquare} from '@fortawesome/free-regular-svg-icons'
import MemberInfoModal from './memberInfoModal';
import { useQuery } from 'react-query';

function UserProfile(props) {
  const [resume, setresume] = useState("");
  const [fileuploaded, setfileuploaded] = useState(false);
  const inputRef = useRef();
  const [state, setState] = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const openFiles = () => {
    inputRef.current.click();
  };

  let s = sessionStorage.getItem("state");
  let ustate = JSON.parse(s);

  const myOrgsQuery = useQuery('my-orgs', async () => {
    axios.defaults.headers.get["Authorization"] = `Bearer ${ustate?.token}`;

    const {data} = await axios.get("http://localhost:8000/my-organizations")
    return data
  });

  const userQuery = useQuery('user', async () => {
    const {data} = await axios.get(`http://localhost:8000/user/${ustate.user.u_id}`)
    return data
  })


  const handleResume = (e) => {
    const resumefile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(resumefile);
    reader.onload = () => {
      setresume(e.target.files[0]);
      setfileuploaded(true);
    };
    reader.onerror = () => {
      console.log("file errors", reader.error);
    };
  };

  let resumeDoc = "";
  if (fileuploaded) {
    resumeDoc = URL.createObjectURL(resume);
  }

  if (myOrgsQuery.isLoading || userQuery.isLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="grow" variant="dark">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )

  } else if (myOrgsQuery.isError || userQuery.isError) {
    return (
      <div>
        error
      </div>
    )

  } else {
    return (
      <div className="user-page-wrapper">
          <div className="user-page">
            <div className="user-info-wrapper">
              <div className="user-info">
                <Image
                  className="user-info-photo"
                  src="/defaultProfile.png"
                  roundedCircle
                />
                <h1 className="user-info-name text-color">{userQuery.data.name}</h1>
              </div>
              <div className="user-contact">
                <h2 className="user-contact-header">
                  Contact Information:
                  {/* <EditM mdata={userQuery.data} setdata={setUserData} type="User" /> */}
                </h2>

                <div className="user-contact-information">
                  <p className="white-text">{"Username: " + userQuery.data.username}</p>
                  <p className="white-text">{"Email: " + userQuery.data.email}</p>
                  <p className="white-text">
                    {userQuery.data.phone_number === null
                      ? "Phone number: No phone number"
                      : "Phone number: " + userQuery.data.phone_number}
                  </p>
                </div>
              </div>
            </div>

            <div className="user-options-wrapper">
              <div className="user-resume">
                <h2 className="user-resume-heading text-color">Resume:</h2>
                <div className="user-resume-upload">
                  <Button
                    onClick={openFiles}
                    variant="btn user-resume-button"
                    size="lg"
                  >
                    Add / Update your resume
                  </Button>
                  <input type="file" ref={inputRef} onChange={handleResume} />
                  <a className="download-link" href={resumeDoc} download="resume">
                    Click here to download resume
                  </a>
                </div>
              </div>
              <br/>
              <div className="user-organizations">
                <h2 className="user-organizations-heading text-color">
                  My Organizations:
                </h2>
                <div className="user-organizations-cards">
                  {myOrgsQuery.data
                    ? myOrgsQuery.data.map((org, i) => (
                        <OrgIcon
                          key={i}
                          organizationName={org.name}
                          imageLocation="/defaultorganization.png"
                          organizationId={org.o_id}
                          type="Organization"
                        />
                      ))
                    : <h1>No results found!</h1>}
                </div>
              </div>
              <br/>
              <div>
                <MemberInfoModal show={show} setShow={setShow} token={ustate?.token}/>
                <h2 className="user-organizations-heading text-color">
                  Member Information:
                </h2>
                <Container>
                  <Button onClick={handleShow}>
                    <FontAwesomeIcon icon={faPlusSquare} /> Add member information
                  </Button>
                </Container>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default UserProfile;
