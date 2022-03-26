import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { Modal, Button, Form } from "react-bootstrap";
const EditModel = ({ showModel, setShowModel }) => {
  const [user, setUser] = useState([]);
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    let newUser = JSON.parse(window.localStorage.getItem("user"));
    setUser(newUser);
    axios
      .get("http://localhost:8000/api/v1/sector")
      // console.log(response.data);
      .then((response) => setSectors(response.data));
  }, []);

  //handle edit button
  const handleEdit = async (e) => {
    e.preventDefault();
    const reqBody = {
      userName: e.target.firstname.value,
      sectorId: e.target.sector.value,
      agreeToterms: document.getElementById("cheked").checked,
    };
    let response = await axios.put(
      `http://localhost:8000/api/v1/user/${user.id}`,
      reqBody
    );
    console.log(response.data);
    setUser(response.data);
    window.localStorage.setItem("user", JSON.stringify(response.data));

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
            Edit Your Info <FiEdit /> ...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEdit}>
            <Form.Group className="mb-3">
              <Form.Label>Edit your name..</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name .."
                id="fname"
                name="firstname"
                defaultValue={user.userName}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>choose other sector...</Form.Label>
              <Form.Select id="sector" name="sector" required>
                {sectors.map((el) => {
                  return <option value={el.id}>{el.sectorType}</option>;
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Agree To Terms..</Form.Label>

              <Form.Check
                type="checkbox"
                id="cheked"
                defaultValue={user.agreeToterms}
                required
              />
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              style={{ backgroundColor: "rgb(223, 169, 191)",position:"absolute",    top: "105%",heigth: "300px"
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
export default EditModel;
