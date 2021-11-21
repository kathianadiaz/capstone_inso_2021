import React, { useState, useEffect } from "react";
import { Image, Button, Spinner } from "react-bootstrap";
import OrgHighlight from "./OrganizationHighlight.js";
import MemberIcon from "./organizationIcon";
import "./OrganizationProfile.scss";
import { Redirect, useParams } from "react-router";
import EditM from "./EditModal.js";
import DeleteM from "./DeleteModal";
import JoinM from "./JoinModal";
import axios from "axios";
function OrganizationProfile() {
  const { OrganizationId } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/organization/${OrganizationId}`)
      .then((response) => {
        SetOrganizationData(response.data);
        setHighlightData(response.data.highlights);
        setSpinner(false);
        // console.log(response);
        // console.log(organizationData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let s = sessionStorage.getItem("state");
  let ustate = JSON.parse(s);

  // const sendJoinRequest = () => {
  //   axios.defaults.headers.post["Authorization"] = `Bearer ${ustate?.token}`;
  //   let rjson = {
  //     message: "I am interested in joining your organization",
  //   };
  //   axios
  //     .post(`/${OrganizationId}/join`, rjson)
  //     .then((response) => {
  //       console.log(response);
  //       setRequestStatus(true);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const [eventData, setEventData] = useState([]);
  const [highlightData, setHighlightData] = useState([]);
  const [organizationData, SetOrganizationData] = useState([]);
  const [deletedHighlight, setDeletedHighlight] = useState(false);
  // const [JoinMessage, SetJoinMessage] = useState("");
  // const [joinRequests, setJoinRequests] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showJoinRequestsModal, setShowJoinRequestsModal] = useState(false);
  const [redirectD, setredirectD] = useState(false);
  const [spinner, setSpinner] = useState(true);
  const [memberData, setMemberData] = useState([]);
  const [requestStatus, setRequestStatus] = useState(false);

  console.log(showJoinRequestsModal);

  const handleShow = (e) => {
    if (e === "JoinRequests") {
      showJoinRequestsModal === false
        ? setShowJoinRequestsModal(true)
        : setShowJoinRequestsModal(false);
    }
    if (e === "Delete") {
      showDeleteModal === false
        ? setShowDeleteModal(true)
        : setShowDeleteModal(false);
    } else {
      showJoinModal === false
        ? setShowJoinModal(true)
        : setShowJoinModal(false);
    }
  };

  return (
    <div className="organizationpage-wrapper">
      {!spinner && (
        <div className="organizationpage-container">
          <div className="organization-container">
            <div className="organization-heading">
              <div className="organization-heading-logo">
                <Image src="/defaultorganization.png" fluid />
              </div>
              <div className="organization-heading-info">
                {/* {console.log(organizationData.name)} */}
                <h1>
                  {organizationData.name[0].toUpperCase() +
                    organizationData.name.slice(1).toLowerCase()}
                </h1>
                <div className="organization-heading-buttons-container">
                  <Button
                    variant="btn organization-heading-button remove-functions"
                    size="lg"
                  >
                    Status:{" "}
                    {organizationData.status === false
                      ? "Not Recruiting"
                      : "Recruiting  "}
                  </Button>
                  {ustate?.user.u_id !==
                    organizationData.administrators[0].u_id &&
                  organizationData.status === true ? (
                    <Button variant="btn organization-heading-button" size="lg">
                      <JoinM
                        show={showJoinModal}
                        setshow={setShowJoinModal}
                        orgID={OrganizationId}
                        setrequeststatus={setRequestStatus}
                        type="Join"
                      />
                      {requestStatus === true ? (
                        <span className="blue-text-org">Request sent</span>
                      ) : (
                        <span
                          className="blue-text-org modal-text"
                          onClick={(e) => handleShow("Join", e)}
                        >
                          Request to join
                        </span>
                      )}
                    </Button>
                  ) : null}
                  {/* Redirect user if org is deleted */}
                  {redirectD && <Redirect to="/UserProfile" />}
                  {/* If member is admin */}
                  {ustate?.user.u_id ===
                  organizationData.administrators[0].u_id ? (
                    <Button
                      variant="btn organization-heading-button delete-button"
                      size="lg"
                    >
                      <span
                        className="blue-text-org modal-text"
                        onClick={(e) => handleShow("Delete", e)}
                      >
                        Delete organization
                      </span>{" "}
                      <DeleteM
                        show={showDeleteModal}
                        setshow={setShowDeleteModal}
                        orgID={OrganizationId}
                        redirect={setredirectD}
                      />
                    </Button>
                  ) : null}

                  {/* Button used to see join requests of users */}
                  {ustate?.user.u_id ===
                    organizationData.administrators[0].u_id && (
                    <Button variant="btn organization-heading-button" size="lg">
                      <JoinM
                        show={showJoinRequestsModal}
                        setshow={setShowJoinRequestsModal}
                        orgID={OrganizationId}
                        setrequeststatus={setRequestStatus}
                        type="JoinRequests"
                      />
                      <span
                        className="blue-text-org modal-text"
                        onClick={(e) => handleShow("JoinRequests", e)}
                      >
                        Check join requests
                      </span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="organization-information organization-layout">
              <h3 className="section-heading">
                Organization Information:
                {ustate?.user.u_id ===
                organizationData.administrators[0].u_id ? (
                  <EditM
                    mdata={organizationData}
                    setdata={SetOrganizationData}
                    type="Organization"
                  />
                ) : null}
              </h3>
              <div className="organization-information-wrapper">
                <p>
                  {" "}
                  <span className="organization-information-wrapper-text">
                    Contact email:{" "}
                  </span>{" "}
                  {organizationData.email}
                </p>
                <p>
                  <span className="organization-information-wrapper-text">
                    Department:{" "}
                  </span>
                  {organizationData.department}
                </p>
                <p>
                  <span className="organization-information-wrapper-text">
                    Tags:{" "}
                  </span>
                  <span>{organizationData.tags + ""}</span>
                </p>
              </div>
            </div>
            <div className="organization-description organization-layout">
              <h3 className="section-heading">Organization Description: </h3>
              <p>{organizationData.description}</p>
            </div>
            <div className="organization-highlights organization-layout">
              <h3 className="section-heading">
                Organization's highlights:{" "}
                {ustate?.user.u_id ===
                organizationData.administrators[0].u_id ? (
                  <EditM
                    mdata={highlightData}
                    setdata={setHighlightData}
                    type="Highlight"
                  />
                ) : null}
              </h3>

              {/* {organizationData.highlights &&
            organizationData.highlights.length > 0
              ? organizationData.highlights.map((data, i) => (
                  <OrgHighlight
                    key={i}
                    award={data.title}
                    // date={data.date.toLocaleDateString()}
                    description={data.description}
                    hData={data.oh_id}
                  />
                ))
              : null} */}
              {highlightData.map((data, i) => (
                <OrgHighlight
                  key={i}
                  award={data.title}
                  date={new Date(data.date).toLocaleDateString()}
                  description={data.description}
                  highlightId={data.oh_id}
                  admins={organizationData.administrators}
                  deleted={setDeletedHighlight}
                  highlightdata={highlightData}
                  sethighlight={setHighlightData}
                />
              ))}
            </div>
            {/* EVENTS PENDING? */}
            {/* <div className="organization-events organization-layout">
              <h3 className="section-heading">
                Organization's Events:{" "}
                {ustate?.user.u_id ===
                organizationData.administrators[0].u_id ? (
                  <EditM
                    mdata={eventData}
                    setdata={setEventData}
                    type="Event"
                  />
                ) : null}
              </h3>

              {eventData.map((data, i) => (
                <OrgEvent
                  key={i}
                  eventname={data.event}
                  date={data.date.toLocaleDateString()}
                  description={data.description}
                />
              ))}
            </div> */}
            <div className="organization-members organization-layout">
              <h3 className="section-heading">
                Organization's Members:{" "}
                {ustate?.user.u_id ===
                organizationData.administrators[0].u_id ? (
                  <EditM
                    mdata={memberData}
                    setdata={setMemberData}
                    type="Member"
                  />
                ) : null}
              </h3>
              <div className="organization-members-layout">
                {memberData.map((data, i) => (
                  <MemberIcon
                    key={i}
                    type={"User"}
                    memberName={data.name}
                    imageLocation="/defaultProfile.png"
                    email={data.email}
                  />
                ))}
                {(organizationData.members || []).map((data, i) => (
                  <MemberIcon
                    key={i}
                    type={"User"}
                    memberName={data.name}
                    imageLocation="/defaultProfile.png"
                    email={data.email}
                  />
                ))}
                {(organizationData.administrators || []).map((data, i) => (
                  <MemberIcon
                    key={i}
                    type={"User"}
                    memberName={data.name}
                    imageLocation="/defaultProfile.png"
                    email={data.email}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {spinner && (
        <div className="spinner-container">
          <Spinner animation="border" variant="dark">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
}

export default OrganizationProfile;
