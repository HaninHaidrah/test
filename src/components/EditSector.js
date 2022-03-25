import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { Modal, Button, Form } from "react-bootstrap";

const EditSector = ({ showModel, setShowModel }) => {
  const [sector, setSectors] = useState([]);

  useEffect(() => {
    let sectorData = JSON.parse(window.localStorage.getItem("sector"));
    setSectors(sectorData);
  }, []);

  //handle edit button
  const handleEdit = async (e) => {
    e.preventDefault();
    const reqBody = {
      sectorType: e.target.firstname.value,
      sectorDescription: e.target.sector.value,
      sectorimage: e.target.image.value
    };
    let response = await axios.put(
      `http://localhost:8000/api/v1/sector/${sector.id}`,
      reqBody
    );
    setSectors(response.data);
    window.localStorage.setItem("sector", JSON.stringify(response.data));
    setShowModel(false);
  };
  return (
    <>
      <Modal
        show={showModel}
        onHide={() => {
          setShowModel(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "30%", color: "#483d3d" }}>
            Edit The Sector Info <FiEdit /> ...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEdit}>
            <Form.Group className="mb-3">
              <Form.Label>Edit sector type name..</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name .."
                id="fname"
                name="firstname"
                defaultValue={sector.sectorType}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Edit the Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name .."
                id="fname"
                name="sector"
                defaultValue={sector.sectorDescription}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Enter image url ..</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url .."
                id="fname"
                name="image"
                defaultValue={sector.sectorimage}
                required
              />
             
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              style={{
                backgroundColor: "rgb(223, 169, 191)",
                position: "absolute",
                top: "105%",
                heigth: "300px",
              }}
            >
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModel(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default EditSector;
