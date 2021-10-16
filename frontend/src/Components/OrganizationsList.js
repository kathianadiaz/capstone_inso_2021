import React, { useEffect, useState } from "react";
import { Button, Image, NavItem } from "react-bootstrap";
import "./OrganizationsList.scss";
import OrganizationCard from "./OrganizationCard";
import axios from "axios";
function OrganizationsList() {
  const [organizations, setOrganizations] = useState([]);
  const [organizationsFilter, setorganizationsFilter] = useState([]);
  const [inputvalue, setInputValue] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8000/organization")
      .then((response) => {
        setorganizationsFilter(response.data);
        setOrganizations(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const filterOrgs = (e) => {
  //   const input = e.target.value;
  //   // console.log(e.target.value);
  //   if (e.key === "Enter") {
  //     const results = organizationsFilter.filter((organization) => {
  //       return organization.name.toLowerCase().startsWith(input.toLowerCase());
  //     });
  //     setorganizationsFilter(results);
  //   } else {
  //     setorganizationsFilter(organizations);
  //   }
  // };

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
            // onKeyDown={filterOrgs}
          />
          <Button className="btn org-search-button" onClick={onClickFilter}>
            Search
          </Button>
        </div>
      </div>
      <div className="organizations-list">
        <div className="organizations-list-wrapper">
          {organizations &&
            organizations
              .filter((organization) => organization.name === inputvalue)
              .map((organization, index) => {
                return (
                  <OrganizationCard
                    key={index}
                    organizationName={organization.name}
                    organizationInfo={organization.description}
                  />
                );
              })}

          {organizations &&
            inputvalue === "" &&
            organizations.map((organization, index) => {
              return (
                <OrganizationCard
                  key={index}
                  organizationName={organization.name}
                  organizationInfo={organization.description}
                />
              );
            })}

          {/* {organizationsFilter && organizationsFilter.length > 0 ? (
            organizationsFilter.map((organization, i) => (
              <OrganizationCard
                key={i}
                organizationName={organization.name}
                organizationInfo={organization.description}
              />
            ))
          ) : (
            <h1>No results found!</h1>
          )} */}
          {/* <OrganizationCard
            organizationName="IEEE"
            organizationInfo="lorem5 adwe weasd wewa dsa "
          />
          <OrganizationCard
            organizationName="IEEE"
            organizationInfo="lorem5 adwe weasd wewa dsa "
          />
          <OrganizationCard
            organizationName="IEEE"
            organizationInfo="lorem5 adwe weasd wewa dsa "
          />
          <OrganizationCard
            organizationName="IEEE"
            organizationInfo="lorem5 adwe weasd wewa dsa "
          /> */}
        </div>
      </div>
    </div>
  );
}

export default OrganizationsList;
