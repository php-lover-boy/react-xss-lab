import React, { Component } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <>
        <div className="test"></div>
        <div class="demo1">
          <h4>Design and developed by masoud zivari</h4>
        </div>
        <div class="demo2">
          <Link to="/login">
            <Button
              sx={{
                color: "red",

                bgcolor: "#e6f0ff",
                "&:hover": {
                  bgcolor: "#e6e6e6",
                },
              }}
            >
              Start
            </Button>
          </Link>
        </div>
      </>
    );
  }
}

export default App;
