import React from "react";
import { Button, Image } from "react-bootstrap";
import "./OrganizationsList.scss";
import OrganizationCard from "./OrganizationCard";
function OrganizationsList() {
  return (
    <div className="org-list-wrapper">
      <div className="org-search-wrapper">
        <div className="org-search">
          <input
            type="text"
            placeholder="Search organizations"
            className="org-search-input"
          />
          <Button className="btn org-search-button">Search</Button>
        </div>
      </div>
      <div className="organizations-list">
        <div className="organizations-list-wrapper">
          <OrganizationCard />
          <OrganizationCard />
          <OrganizationCard />
          <OrganizationCard />
          <OrganizationCard />
          <OrganizationCard />
          <OrganizationCard />
          <OrganizationCard />
          <OrganizationCard />
          <OrganizationCard />
          <OrganizationCard />
          <OrganizationCard />
          <OrganizationCard />

          <OrganizationCard />
        </div>
      </div>
    </div>
  );
}

export default OrganizationsList;
