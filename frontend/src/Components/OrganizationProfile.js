import React, { useState } from "react";
import Navbar from "./Navbar.js";
import { Image, Button, Modal, Form } from "react-bootstrap";
import OrgHighlight from "./OrganizationHighlight.js";
import OrgEvent from "./OrganizationEvent.js";
import "./OrganizationProfile.scss";
import { get } from "js-cookie";
import { useForm } from "react-hook-form";
import EditM from "./EditModal.js";
function OrganizationProfile(props) {
  // const [show, setShow] = useState(false);
  // const [modalData, setModalData] = useState("");
  // const handleShow = () => setShow(true);

  // const handleClose = () => setShow(false);

  // const [eventdata, setEventData] = useState([]);
  // const { register, handleSubmit } = useForm();

  // const getEventdata = (data) => {
  //   setEventData([...eventdata, data]);
  //   console.log(JSON.stringify(data, null, 2));
  //   console.log(eventdata);
  //   setShow(false);
  // };

  const [eventData, setEventData] = useState([]);
  const [highlightData, setHighlightData] = useState([]);

  console.log(highlightData);
  return (
    <div className="organizationpage-wrapper">
      <div className="organizationpage-container">
        <div className="organization-container">
          <div className="organization-heading">
            <div className="organization-heading-logo">
              <Image src="/Logo-IEEE.jpg" fluid />
            </div>
            <div className="organization-heading-info">
              <h2>Lorem ipsum dolor sit amet.</h2>
              <div className="organization-heading-buttons-container">
                <Button
                  variant="btn organization-heading-button remove-functions"
                  size="lg"
                >
                  Status: {props.status}
                </Button>
                <Button variant="btn organization-heading-button" size="lg">
                  Request to join
                </Button>
              </div>
            </div>
          </div>
          <div className="organization-description organization-layout">
            <h3 className="section-heading">Organization Description: </h3>
            <p>{props.description}</p>
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
            {highlightData.map((data, i) => (
              <OrgHighlight
                key={i}
                award={data.award}
                description={data.highlight_description}
              />
            ))}
            {/* <OrgHighlight
              award="Competition 2015"
              description={highlightInfo}
            />
            <OrgHighlight
              award="Competition 2010"
              description="   Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe quam
				magni quasi natus dicta nesciunt? "
            />
            <OrgHighlight
              award="First place at UPRM"
              description="   Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe quam
						magni quasi natus dicta nesciunt? "
            /> */}
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
        </div>
      </div>
      {/* '     <Modal show={show}>
        <Form onSubmit={handleSubmit(getEventdata)}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>Event name: </Form.Label>

            <Form.Control
              type="text"
              {...register("event")}
              placeholder={"Event"}
            />
            <Form.Label>Event Description: </Form.Label>
            <Form.Control
              type="text"
              {...register("description")}
              placeholder={"Description"}
            />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit(getEventdata)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>' */}
    </div>
  );
}

export default OrganizationProfile;
