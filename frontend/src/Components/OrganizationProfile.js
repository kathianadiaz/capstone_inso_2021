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
import { config } from "@fortawesome/fontawesome-svg-core";
function OrganizationProfile() {
  const { OrganizationId } = useParams();
  let s = sessionStorage.getItem("state");
  let ustate = JSON.parse(s);
  useEffect(() => {
    const config = {
      responseType: "blob",
    };
    axios
      .get(`http://localhost:8000/organization/${OrganizationId}/image`, config)
      .then((response) => {
        if (response !== null) {
          let binaryData = [];
          binaryData.push(response.data);
          let image = window.URL.createObjectURL(
            new Blob(binaryData, { type: "application/zip" })
          );
          setImageData(image);
          console.log(response);
          setImageSpinner(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setImageSpinner(false);
      });

    axios
      .get(`http://localhost:8000/organization/${OrganizationId}`)
      .then((response) => {
        SetOrganizationData(response.data);
        setHighlightData(response.data.highlights);

        setSpinner(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [imageData, setImageData] = useState([]);
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
  const [imageSpinner, setImageSpinner] = useState(true);
  const [requestStatus, setRequestStatus] = useState(false);
  console.log(imageData);

  // console.log(showJoinRequestsModal);

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
                {imageSpinner && (
                  <Spinner animation="border" role="status" size="bg">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                )}
                {!imageSpinner && imageData.length === 0 ? (
                  <Image src="/defaultorganization.png" fluid />
                ) : (
                  <Image src={imageData} fluid />
                )}
                <div className="organization-heading-logo-edit">
                  {ustate?.user.u_id ===
                  organizationData?.administrators[0].u_id ? (
                    <p className="organization-heading-logo-edit-text">
                      Change organization picture:{" "}
                    </p>
                  ) : null}
                  {/* Change mdata and setdata to replace image */}
                  {ustate?.user.u_id ===
                  organizationData?.administrators[0].u_id ? (
                    <EditM
                      mdata={organizationData}
                      setdata={SetOrganizationData}
                      type="picture"
                    />
                  ) : null}
                </div>
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
                  ustate !== null &&
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
              <p>
                {organizationData.description.charAt(0).toUpperCase() +
                  organizationData.description.slice(1)}
              </p>
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

            <div className="organization-members organization-layout">
              <h3 className="section-heading">
                Organization's Members:{" "}
                {ustate?.user.u_id ===
                organizationData?.administrators[0].u_id ? (
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
