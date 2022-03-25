import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import EditSector from "./EditSector";
import "./Modal.css"

const SectorCard = () => {
  const [sectorData, setSectorData] = useState({});
  const [showModel, setShowModel] = useState(false);


  useEffect(() => {
    const sectorData = JSON.parse(window.localStorage.getItem("user"));
    axios
      .get(`http://localhost:8000/api/v1/sector/${sectorData.sectorId}`)
      .then((response) => {
        setSectorData(response.data);
        window.localStorage.setItem("sector", JSON.stringify(response.data));

      });
  }, []);


  return (
    <>
      <img
        src={sectorData.sectorimage}
        width="512px"
        height="512px"
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
            Sector Data
          </Card.Title>
          <Card.Text style={{ marginBottom: "3rem", marginLeft: "2rem" }}>
           <b>Your Sector is: </b> <em>{sectorData.sectorType}</em> <br></br> <br></br>
           <b>The Description is :</b> <em> {sectorData.sectorDescription}</em> 
          </Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              setShowModel(true);
            }}
            style={{
              backgroundColor: "#fd0dc5",
              marginTop: "7rem",
              marginLeft: "10rem",
            }}
          >
            Edit Sector Data <FiEdit />
          </Button>
        </Card.Body>
      </Card>
      {showModel && (
          <EditSector showModel={showModel} setShowModel={setShowModel} />
        )}
    </>
  );
};

export default SectorCard;
