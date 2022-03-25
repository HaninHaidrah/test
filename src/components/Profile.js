import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import EditModel from "./EditModel";
import axios from "axios";
import "./Modal.css";

const Profile = () => {
  const [user, setUser] = useState({});
  const [sector, setSector] = useState({});
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    let newUser = JSON.parse(window.localStorage.getItem("user"));
    axios
      .get(`http://localhost:8000/api/v1/sector/${newUser.sectorId}`)
      .then((res) => {
        setSector(res.data);
      });
    setUser(newUser);
  }, []);

  return (
    <>
      <img
        src="https://sothis.es/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
        style={{ float: "left", marginLeft: "15rem", marginTop: "5rem" }}
      />
      <Card
        style={{
          width: "32rem",
          height: "32rem",
          float: "right",
          marginRight: "15rem",
          marginTop: "5rem",
        }}
      >
        <Card.Body>
          <Card.Title
            style={{
              marginBottom: "5.5rem",
              textAlign: "center",
              marginTop: "2rem",
            }}
          >
            Personal Data
          </Card.Title>
          <Card.Text style={{ marginBottom: "3rem", marginLeft: "2rem" }}>
          <b> Your Name is: </b> <em>{user.userName}</em> <br></br> <br></br>
           <b>Your chosed Sector : </b><em> {sector.sectorType} </em> 
          </Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              setShowModel(true);
            }}
            style={{
              backgroundColor: "#fd0dc5",
              marginTop: "10rem",
              marginLeft: "10rem",
            }}
          >
            Edit your personal Data
          </Button>
        </Card.Body>
      </Card>
      {showModel && (
        <EditModel showModel={showModel} setShowModel={setShowModel} />
      )}
    </>
  );
};

export default Profile;
