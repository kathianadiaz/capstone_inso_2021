import axios from "axios";
import React, { useState, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "./AuthContext";

const OrganizationHighlight = (props) => {
  const { OrganizationId } = useParams();
  const [state, setState] = useContext(AuthContext);

  console.log(OrganizationId);
  const deleteHighlight = () => {
    axios.defaults.headers.delete["Authorization"] = `Bearer ${state.token}`;
    axios
      .delete(
        `http://localhost:8000/organization/${OrganizationId}/highlight/${props.highlightId}`
      )
      .then((response) => {
        // console.log(response);
        console.log(response.data.highlights);
        props.sethighlight(response.data.highlights);
        // console.log(props.highlightdata);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="highlight-wrapper">
      <div className="highlight-delete">
        <h3>{props.award}</h3>
      </div>
      {state?.user.u_id === props.admins[0].u_id ? (
        <a className="highlight-anchor" onClick={deleteHighlight}>
          Delete Highlight
        </a>
      ) : null}
      <h4 className="event-time"> {"Date: " + props.date} </h4>
      <p>{props.description}</p>
    </div>
  );
};

export default OrganizationHighlight;
