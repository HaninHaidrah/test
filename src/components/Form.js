import React, { useEffect, useState } from "react";
import "../components/Form.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Form() {
  const [sectors, setSectors] = useState([]);
  const [user, setUser] = useState([]);
  const history = useHistory();


  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/sector")
      .then((response) => setSectors(response.data));
  }, []);

  // function to handle submit the form
  const handleSubmit = async (e) => {
    /* todo
    1.save to database
    2. refill the form
    3. validate the inputs 
    4. show the edit button and edit the data:
    */
    e.preventDefault();
    const reqBody = {
      userName: e.target.firstname.value,
      sectorId: e.target.sector.value,
      agreeToterms: document.getElementById("cheked").checked,
    };
    let response = await axios.post(
      `http://localhost:8000/api/v1/user`,
      reqBody
    );
    let formFill = await axios.get(
      `http://localhost:8000/api/v1/user/${response.data.id}`
    );
    setUser(formFill.data);
    window.localStorage.setItem("user", JSON.stringify(formFill.data));

   history.push("/profile");
  };
  return (
    <>
      <h1 className="display-3"> Fill the Form Please!</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-25">
            <label htmlFor="fname">Your Name</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="fname"
              name="firstname"
              placeholder="Your name.."
              defaultValue={user.userName}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="country">Sector</label>
          </div>
          <div className="col-75">
            <select id="sector" name="sector" required>
              {sectors.map((el,index) => {
                return <option key={index} defaultValue={el.id} value={el.id}>{el.sectorType}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="Agree to Terms">Agree to Terms</label>
          </div>
          <div className="col-75">
            <input
              type="checkbox"
              id="cheked"
              defaultValue={user.agreeToterms}
              required
            />
          </div>
        </div>
        <br />
        <div className="row">
          <input type="submit" value="Save" />
        </div>
      </form>
    </>
  );
}

export default Form;
