import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useTheme } from "@mui/material/styles";
import "./App.css";

import { useState, useEffect, createRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import UserForm_vul from "./UserForm_vul";

export default function Vulnerable() {
  const search = useLocation().search;
  const code = new URLSearchParams(search).get("code");

  const divRef = createRef();

  ////////////////////////////linkdin--reflected xss ////////////////////////////////////////////
  const [data_linkdin, setData_linkdin] = useState();
  const handleType_linkdinprofile = (e2) => {
    setData_linkdin(e2.target.value);
  };
  ////////////////////////////////////////////////////////////////////////////////

  ////// event handler for your name ...dom based xss... innerhtml
  const [myName, setMyName] = useState("");

  const onChangeHandler = (event) => {
    setMyName(event.target.value);
  };

  useEffect(() => {
    if (myName) {
      divRef.current.innerHTML = `my name: ${myName}`;
    }
  }, [myName]);
  ////////////////////////////////////////////////////////////////////////////////////

  const [formValues] = useState({ username: "", email: "", linkdin: "" });

  const onSubmit = (userObject) => {
    axios
      .post("http://localhost:3001/store-data", userObject)
      .then((res) => {
        if (res.status === 200) alert("User successfully created");
        else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  const url = "http://localhost:3001/users";

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
        Xss vulnerable Profile
      </Typography>
      <Typography variant="body1" gutterBottom>
        complete your profile and find differnt type of xss in this page. We
        hide dom based, reflected and stored xss in this page
      </Typography>
      <Typography variant="body1" gutterBottom>
        <br />
        {/* //---------------/// dom based xss ////////////////---------------------------/ */}
        <label>Your Name</label> <br />
        <input
          type="text"
          name="name5"
          onChange={onChangeHandler}
          value={myName}
        />
        <div className="container" ref={divRef}></div>
        {/* ////////////dom based in ref attribute */}
        <br />
        {/* 
        ------------------------------------------linkdin profile --------reflected xss */}
        <label>linkdin Profile</label> <br />
        <input
          name="linkdin"
          type="text"
          className="form-control"
          value={data_linkdin}
          onChange={(e2) => handleType_linkdinprofile(e2)}
        />
        {/* 
        ------------------------------------------linkdin profile --------reflected xss */}
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
          <UserForm_vul
            initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize
          >
            Create user
          </UserForm_vul>
        </div>
      </Typography>
      <div className="profile2">
        <p>
          <center>
            <h4> username lists</h4>

            {data.map((dataObj, index) => {
              var rr = dataObj.username;
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
                    <div dangerouslySetInnerHTML={{ __html: rr }} />
                  </p>
                </div>
              );
            })}
          </center>
        </p>
      </div>
      <div />

      {/* you should take care about get, post parameters
      {/* ///////////////////example of dompurify 
      ------- another reflected xss via get parameters*/}
      <div dangerouslySetInnerHTML={{ __html: code }} />
    </Box>
  );
}
