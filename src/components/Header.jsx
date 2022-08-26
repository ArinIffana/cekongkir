import React, { useEffect, useState } from "react";
import styles from "../pages/landing/index.module.css";
import Modal from "react-bootstrap/Modal";
import axios1 from "../utils/axios1";
import { Link, animateScroll as scroll } from "react-scroll";

export default function Header() {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [form, setForm] = useState({});
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const id = localStorage.getItem("id");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const resultLogin = await axios1.post("auth/login", form);
      localStorage.setItem("token", resultLogin.data.data.token);
      localStorage.setItem("refreshToken", resultLogin.data.data.refreshToken);
      localStorage.setItem("id", resultLogin.data.data.id);

      const resultProfile = await axios1.get(
        `user/${resultLogin.data.data.id}`
      );
      await setData(resultProfile.data.data[0]);
      console.log(resultProfile.data.data[0]);

      setIsError(false);
      setIsSuccess(true);
      setShow(false);
    } catch (error) {
      setIsError(true);
      console.log(error.response.data.msg);
      console.log(error.response);
      setMsgError(error.response.data.msg);
    }
  };

  useEffect(() => {
    if (id) {
      getDataUser();
    }
  }, []);

  const getDataUser = async () => {
    try {
      const resultProfile = await axios1.get(`user/${id}`);
      await setData(resultProfile.data.data[0]);
      console.log(resultProfile.data.data[0]);
    } catch (error) {
      console.log(error.response.data.msg);
      console.log(error.response);
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    setData({});
  };

  return (
    <header className={styles.landing__header}>
      <div className={styles.landing__header__left}>
        <a href="#home">
          <Link
            activeClass="active"
            to="home"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            <em>C</em>ekOngkir
          </Link>
        </a>
      </div>
      <div className={styles.landing__header__right}>
        <p className={styles.landing__header__link}>
          <Link
            activeClass="active"
            to="home"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            Home
          </Link>
        </p>
        <p className={styles.landing__header__link}>
          <Link
            activeClass="active"
            to="service"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            Service
          </Link>
        </p>
        <p className={styles.landing__header__link}>
          {" "}
          <Link
            activeClass="active"
            to="contact"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            Contact
          </Link>
        </p>
        {id ? (
          <div className="dropdown show">
            <div
              className={`dropdown-toggle ${styles.landing__header__profile}`}
              id="dropdownMenuButton"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                src={
                  // data
                  // ?
                  `${process.env.REACT_APP_CLOUDINARY}${data.image}`
                  // : ""
                }
                alt=""
                title={`${data.firstName} ${data.lastName}`}
                className={styles.landing__header__profileimg}
              />
            </div>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="dropdownMenuButton"
            >
              <a className="dropdown-item" onClick={handleLogout}>
                LogOut
              </a>
            </div>
          </div>
        ) : (
          <button onClick={handleShow}>Log In</button>
        )}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            {" "}
            <label for="">Email :</label>
          </div>
          <input
            type="email"
            name="email"
            onChange={handleChangeForm}
            id=""
            className={`form-control ${styles.landing__header__input}`}
            required
          />
          <div className="mb-3">
            <label for="">Password :</label>
          </div>
          <input
            type="password"
            name="password"
            onChange={handleChangeForm}
            id=""
            className={`form-control ${styles.landing__header__input}`}
            required
          />
          {isError ? (
            <div className="alert alert-danger">
              <strong>Login Fail </strong>
              {msgError}
            </div>
          ) : isSuccess ? (
            <div className="alert alert-success">
              <strong>Success Login!</strong>
            </div>
          ) : (
            <></>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleSubmit}
            className={styles.landing__header__loginbutton}
          >
            Submit{" "}
          </button>
        </Modal.Footer>
      </Modal>
    </header>
  );
}
