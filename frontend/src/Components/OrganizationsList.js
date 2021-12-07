import React, { useEffect, useState } from "react";
import { Button, Spinner, Dropdown } from "react-bootstrap";
import "./OrganizationsList.scss";
import OrganizationCard from "./OrganizationCard";
import axios from "axios";
function OrganizationsList() {
  const [organizations, setOrganizations] = useState([]);
  const [inputvalue, setInputValue] = useState("");
  const [spinner, setSpinner] = useState(true);
  const [filtering, setFiltering] = useState("All");
  useEffect(() => {
    axios
      .get("http://localhost:8000/organization")
      .then((response) => {
        setOrganizations(response.data);
        // console.log(response);
        setSpinner(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const filterOrgs = (e) => {
  //   const input = e.target.value;
  //   console.log(e.target.value);
  //   if (e.key === "Enter") {
  //     const results = organizationsFilter.filter((organization) => {
  //       return organization.name.toLowerCase().startsWith(input.toLowerCase());
  //     });
  //     setOrganizations(results);
  //   } else {
  //     setOrganizations(organizationsFilter);
  //   }
  //   console.log(organizationsFilter);
  // };
  const handleInputValue = (e) => {
    setInputValue(e.target.value);
    if (e.key === "Enter") {
      setSpinner(true);
      // console.log(e.target.value);
      if (filtering === "All" && e.target.value !== "") {
        let searchjson = {
          tag: inputvalue.toLowerCase(),
          keyword: inputvalue.toLowerCase(),
        };
        axios
          .get(
            `http://localhost:8000/organization/tags/${searchjson.tag}/keywords/${searchjson.keyword}`
          )
          .then((response) => {
            setOrganizations(response.data);
            setSpinner(false);
            e.target.value = "";
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (filtering === "Keywords" && e.target.value !== "") {
        let searchjson = {
          keyword: inputvalue.toLowerCase(),
        };
        axios
          .get(
            `http://localhost:8000/organization/keywords/${searchjson.keyword}`
          )
          .then((response) => {
            setOrganizations(response.data);
            setSpinner(false);
            e.target.value = "";
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (filtering === "Tags" && e.target.value !== "") {
        let searchjson = {
          tag: inputvalue.toLowerCase(),
        };
        axios
          .get(`http://localhost:8000/organization/tags/${searchjson.tag}`)
          .then((response) => {
            setOrganizations(response.data);
            setSpinner(false);
            e.target.value = "";
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (e.target.value === "" && e.key === "Enter") {
        axios
          .get("http://localhost:8000/organization")
          .then((response) => {
            setOrganizations(response.data);
            setSpinner(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };
  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSelect = (e) => {
    setFiltering(e);
  };
  const onClickFilter = () => {
    setSpinner(true);
    if (filtering === "All") {
      let searchjson = {
        tag: inputvalue.toLowerCase(),
        keyword: inputvalue.toLowerCase(),
      };
      axios
        .get(
          `http://localhost:8000/organization/tags/${searchjson.tag}/keywords/${searchjson.keyword}`
        )
        .then((response) => {
          setOrganizations(response.data);
          setSpinner(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (filtering === "Keywords") {
      let searchjson = {
        keyword: inputvalue.toLowerCase(),
      };
      axios
        .get(
          `http://localhost:8000/organization/keywords/${searchjson.keyword}`
        )
        .then((response) => {
          setOrganizations(response.data);
          setSpinner(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (filtering === "Tags") {
      let searchjson = {
        tag: inputvalue.toLowerCase(),
      };
      axios
        .get(`http://localhost:8000/organization/tags/${searchjson.tag}`)
        .then((response) => {
          setOrganizations(response.data);
          setSpinner(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="org-list-wrapper">
      <div className="org-search-wrapper">
        <div className="org-search">
          <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle
              className="org-search-dropdown"
              variant="success"
              id="dropdown-basic"
            >
              {filtering}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="Keywords">Keywords</Dropdown.Item>
              <Dropdown.Item eventKey="Tags">Tags</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <input
            type="text"
            placeholder="Search organizations"
            className="org-search-input"
            value={inputvalue || ""}
            onChange={onChangeInput}
            onKeyDown={handleInputValue}
          />

          <Button className="btn org-search-button" onClick={onClickFilter}>
            Search
          </Button>
        </div>
      </div>
      {/* {console.log(organizations)} */}

      <div className="organizations-list">
        {!spinner && (
          <h3 className="organizations-list-header">
            <span className="blue-text">
              Currently {organizations?.length} available{" "}
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
          {!spinner && organizations && organizations.length > 0
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
