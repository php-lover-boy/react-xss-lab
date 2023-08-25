import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useTheme } from "@mui/material/styles";
import "./App.css";

import { useState, useEffect, createRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import UserForm_mitigated from "./UserForm_mitigated";

import validator from "validator";
import DOMPurify from "dompurify";

export default function Mitigated() {
  const search = useLocation().search;
  const code = new URLSearchParams(search).get("code");

  ////// event handler for your name ...dom based xss... innerhtml replaced with innerText
  const [myName, setMyName] = useState("");

  const onChangeHandler = (event) => {
    setMyName(event.target.value);
  };

  const divRef = createRef();
  useEffect(() => {
    if (myName) {
      divRef.current.innerText = `my name: ${myName}`;
    }
  }, [myName]);
  ///////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////// reflected xss mitigation via url validation/////

  const [data_linkdin, setData_linkdin] = useState();
  const handleType_linkdin = (e2) => {
    if (validator.isURL(e2.target.value)) setData_linkdin(e2.target.value);
  };
  /////////////////////////////////////////////////////////////////

  const [formValues] = useState({ username: "", email: "" });

  const onSubmit = (userObject) => {
    // input sanitization in front befor sending data to backend//////////////*/////

    const username = DOMPurify.sanitize(userObject.username);
    const email = DOMPurify.sanitize(userObject.email);
    const userObject_clean = { username, email };
    axios
      .post("http://localhost:3002/store-data", userObject_clean)
      .then((res) => {
        if (res.status === 200) alert("User successfully created");
        else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  const url = "http://localhost:3002/users";

  const [data, setData] = useState([]);
  const fetchInfo = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const theme = useTheme();
  return (
    <Box
      sx={{
        mt: 10,
        ml: 30,
        mr: 5,
        [theme.breakpoints.down("md")]: {
          ml: 22,
        },
        [theme.breakpoints.down("sm")]: {
          ml: 18,
        },
      }}
    >
      <Typography variant="h5" gutterBottom>
        Xss mitigated Profile
      </Typography>
      <Typography variant="body1" gutterBottom>
        complete your profile this is xss mitigated. There are no xss
        vulnerabilities in either the frontend or the backend.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <br />
        <label>Your Name</label> <br />
        <input
          type="text"
          name="name5"
          onChange={onChangeHandler}
          value={myName}
        />
        <div className="container" ref={divRef}></div>
        {/* linkdin xss reflectd mitigation //////////////////////////////*/}
        <label>linkdin Profile</label> <br />
        <input
          name="linkdin"
          type="text"
          className="form-control"
          value={data_linkdin}
          onChange={(e2) => handleType_linkdin(e2)}
        />
        <span
          style={{
            fontWeight: "bold",
            color: "red",
          }}
        >
          <a href={data_linkdin} className="button">
            go to my linkdin Profile
          </a>
        </span>
        <div className="profile">
          <UserForm_mitigated
            initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize
          >
            Create user
          </UserForm_mitigated>
        </div>
      </Typography>

      <div className="profile2">
        <p>
          <center>
            <h4> username lists</h4>

            {data.map((dataObj, index) => {
              ///  this is data sanitization after fetching data from backend/////////// befor rendering
              var clean_befor_render = DOMPurify.sanitize(dataObj.username);
              return (
                <div
                  style={{
                    width: "15em",
                    backgroundColor: "#1976d2",
                    padding: 2,
                    borderRadius: 10,
                    marginBlock: 10,
                  }}
                >
                  <p style={{ fontSize: 20, color: "white" }}>
                    <div
                      dangerouslySetInnerHTML={{ __html: clean_befor_render }}
                    />
                  </p>
                </div>
              );
            })}
          </center>
        </p>
      </div>

      {/* ///////////////////example of dompurify  with reflected xss*/}

      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(code) }} />
    </Box>
  );
}
