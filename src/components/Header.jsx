import React from "react";
import styles from "../pages/landing/index.module.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";

export default function Header() {
  return (
    <header className={styles.landing__header}>
      <div className={styles.landing__header__left}>
        <em>C</em>ekOngkir
      </div>
      <div className={styles.landing__header__right}>
        <p>Home</p>
        <p>Service</p>
        <p>Contact</p>
        <button
          data-toggle="modal"
          data-target="#exampleModal"
          data-whatever="@mdo"
        >
          Sign In
        </button>
      </div>
      <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        className={this.props.className}
      >
        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </header>
  );
}
