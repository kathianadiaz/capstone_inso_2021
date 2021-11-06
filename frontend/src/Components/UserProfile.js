import React, { useState, useRef, useContext, useEffect } from "react";
import { Button, Image, Spinner } from "react-bootstrap";
import "./UserProfile.scss";
import OrgIcon from "./organizationIcon.js";
import EditM from "./EditModal.js";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { useParams } from "react-router";

function UserProfile(props) {
  const [resume, setresume] = useState("");
  const [fileuploaded, setfileuploaded] = useState(false);
  const inputRef = useRef();
  const [state, setState] = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [userOrganizations, setUserOrganizations] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [username, setUsername] = useState("");

  const { UserId } = useParams();
  // console.log(state);
  const openFiles = () => {
    inputRef.current.click();
  };
  let s = sessionStorage.getItem("state");
  let ustate = JSON.parse(s);
  useEffect(() => {
    axios.defaults.headers.get["Authorization"] = `Bearer ${ustate?.token}`;
    axios
      .get("http://localhost:8000/my-organizations")
      .then((response) => {
        setUserOrganizations(response.data);
        // console.log(userOrganizations);
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:8000/user/${UserId}`)
      .then((response) => {
        setUserData(response.data);
        setUsername(response.data.username);
        setSpinner(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
  // console.log(state.token);
  // console.log(resume);
  // console.log(resumeDoc);
  console.log(userData);
  return (
    <div className="user-page-wrapper">
      {!spinner && (
        <div className="user-page">
          <div className="user-info-wrapper">
            <div className="user-info">
              <Image
                className="user-info-photo"
                src="/testPerson.jpg"
                roundedCircle
              />
              <h1 className="user-info-name text-color">{userData.name}</h1>
            </div>
            {/* {console.log(state)} */}
            <div className="user-contact">
              <h2 className="user-contact-header">
                Contact Information:
                <EditM mdata={userData} setdata={setUserData} type="User" />
              </h2>

              <div className="user-contact-information">
                <p className="white-text">{"Username: " + username}</p>
                <p className="white-text">{"Email: " + userData.email}</p>
                <p className="white-text">
                  {"Phone number: " + userData.phone_number}
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
            <div className="user-organizations">
              <h2 className="user-organizations-heading text-color">
                My Organizations:
              </h2>
              <div className="user-organizations-cards">
                {userOrganizations
                  ? userOrganizations.map((org, i) => (
                      <OrgIcon
                        key={i}
                        organizationName={org.name}
                        imageLocation="/testPerson.jpg"
                        organizationId={org.o_id}
                      />
                    ))
                  : spinner && <h1>No results found!</h1>}
              </div>
            </div>
          </div>
        </div>
      )}
      {spinner && (
        <div className="spinner-container">
          <Spinner animation="grow" variant="success">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
