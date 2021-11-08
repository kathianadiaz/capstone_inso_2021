import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import "./OrganizationsList.scss";
import OrganizationCard from "./OrganizationCard";
import axios from "axios";
function OrganizationsList() {
  const [organizations, setOrganizations] = useState([]);
  const [organizationsFilter, setorganizationsFilter] = useState([]);
  const [inputvalue, setInputValue] = useState("");
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/organization")
      .then((response) => {
        setorganizationsFilter(response.data);
        setOrganizations(response.data);
        console.log(response);
        setSpinner(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filterOrgs = (e) => {
    const input = e.target.value;
    // console.log(e.target.value);
    if (e.key === "Enter") {
      const results = organizationsFilter.filter((organization) => {
        return organization.name.toLowerCase().startsWith(input.toLowerCase());
      });
      setOrganizations(results);
    } else {
      setOrganizations(organizationsFilter);
    }
  };

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const onClickFilter = () => {
    console.log(inputvalue);
    const results = organizationsFilter.filter((organization) => {
      return organization.name
        .toLowerCase()
        .startsWith(inputvalue.toLowerCase());
    });
    setorganizationsFilter(results);
  };
  return (
    <div className="org-list-wrapper">
      <div className="org-search-wrapper">
        <div className="org-search">
          <input
            type="text"
            placeholder="Search organizations"
            className="org-search-input"
            value={inputvalue || ""}
            onChange={onChangeInput}
            onKeyDown={filterOrgs}
          />
          <Button className="btn org-search-button" onClick={onClickFilter}>
            Search
          </Button>
        </div>
      </div>
      {console.log(organizations)}

      <div className="organizations-list">
        {!spinner && (
          <h3 className="organizations-list-header">
            <span className="blue-text">
              Currently {organizations.length} available{" "}
            </span>
            <span className="green-text">organizations</span>:
          </h3>
        )}

        <div className="organizations-list-wrapper">
          {spinner && (
            <Spinner animation="border" role="status" size="bg">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
          {organizations && organizations.length > 0
            ? organizations.map((organization, i) => (
                <OrganizationCard
                  key={i}
                  organizationId={organization.o_id}
                  organizationName={organization.name}
                  organizationInfo={organization.description}
                />
              ))
            : !spinner && <h1>No results found!</h1>}
        </div>
      </div>
    </div>
  );
}

export default OrganizationsList;
