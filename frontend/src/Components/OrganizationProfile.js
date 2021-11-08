import React, { useState, useEffect } from "react";
import { Image, Button, Spinner } from "react-bootstrap";
import OrgHighlight from "./OrganizationHighlight.js";
import OrgEvent from "./OrganizationEvent.js";
import MemberIcon from "./organizationIcon";
import "./OrganizationProfile.scss";
import { Redirect, useParams } from "react-router";
import EditM from "./EditModal.js";
import DeleteM from "./DeleteModal";
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

  const [eventData, setEventData] = useState([]);
  const [highlightData, setHighlightData] = useState([]);
  const [organizationData, SetOrganizationData] = useState([]);
  const [deletedHighlight, setDeletedHighlight] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [redirectD, setredirectD] = useState(false);
  const [spinner, setSpinner] = useState(true);

  // console.log(showModal);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  console.log(organizationData);
  // console.log(organizationData.highlights);
  // console.log(deletedHighlight);
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
                <h2>{organizationData.name}</h2>
                <div className="organization-heading-buttons-container">
                  <Button
                    variant="btn organization-heading-button remove-functions"
                    size="lg"
                  >
                    Status:{" "}
                    {organizationData.status === false
                      ? "Not recruiting"
                      : "Recruting  "}
                  </Button>
                  {organizationData.status !== "true" ? (
                    <Button variant="btn organization-heading-button" size="lg">
                      Request to join
                    </Button>
                  ) : null}
                  {/* Redirect user if org is deleted */}
                  {redirectD && <Redirect to="/UserProfile" />}

                  {/* If member is admin */}
                  {organizationData.status !== "true" ? (
                    <Button
                      variant="btn organization-heading-button delete-button"
                      size="lg"
                      onClick={handleShow}
                    >
                      Delete Organization
                    </Button>
                  ) : null}

                  {showModal ? (
                    <DeleteM
                      show={showModal}
                      setshow={setShowModal}
                      closeshow={handleClose}
                      showM={handleShow}
                      orgID={OrganizationId}
                      redirect={setredirectD}
                    />
                  ) : null}
                </div>
              </div>
            </div>
            <div className="organization-information organization-layout">
              <h3 className="section-heading">Organization Information: </h3>
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
                  {organizationData.tags + ""}
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
                <EditM
                  mdata={highlightData}
                  setdata={setHighlightData}
                  type="Highlight"
                />
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
                  // date={data.date.toLocaleDateString()}
                  description={data.description}
                  highlightId={data.oh_id}
                  deleted={setDeletedHighlight}
                  highlightdata={highlightData}
                  sethighlight={setHighlightData}
                />
              ))}
            </div>
            <div className="organization-events organization-layout">
              <h3 className="section-heading">
                Organization's Events:{" "}
                <EditM mdata={eventData} setdata={setEventData} type="Event" />
              </h3>

              {eventData.map((data, i) => (
                <OrgEvent
                  key={i}
                  eventname={data.event}
                  date={data.date.toLocaleDateString()}
                  description={data.description}
                />
              ))}
            </div>
            <div className="organization-members organization-layout">
              <h3 className="section-heading">
                Organization's Members:{" "}
                <EditM mdata={eventData} setdata={setEventData} type="Event" />
              </h3>

              <div className="organization-members-layout">
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
