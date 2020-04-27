import React, { useState } from "react";

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import DemoFooter from "components/Footers/DemoFooter";
import Login from "views/examples/Login";

function RegisterPage(props) {
  //state variables for setting username & password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("nulrferfl");

  //called when sign in is clicked
  let authenticate = () => {
    if (
      props.firebase
        .auth()
        .signInWithEmailAndPassword(username, password)
        .catch((err) => {
          console.log("Invalid email or password");
        })
    );
    props.firebase.auth().onAuthStateChanged((user) => {
      //if user got successfully logged in
      if (user) {
        setEmail(user.email);
        setLoggedIn(true);
        console.log(user.email);
        console.log(user);
      }
    });
  };

  //called by onChange for Input field
  let updateUsername = (userEvent) => {
    setUsername(userEvent.target.value);
  };

  //called by onChange for Input field
  let updatePassword = (passEvent) => {
    setPassword(passEvent.target.value);
  };

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

  if (loggedIn) {
    return(
      <>
        <Login email={email}/>
      </>
    )
  } else {
    return (
      <>
        <IndexNavbar />
        <div
          className="page-header"
          style={{
            backgroundImage:
              "url(" + require("assets/img/login-image.jpg") + ")",
          }}
        >
          <div className="filter" />
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" lg="4">
                <Card className="card-register ml-auto mr-auto">
                  <h3 className="title mx-auto">Welcome to Coronica</h3>
                  <div className="social-line text-center"></div>
                  <Form className="register-form">
                    <label>Email</label>
                    <Input
                      value={username}
                      placeholder="Email"
                      type="text"
                      onChange={updateUsername}
                    />
                    <label>Password</label>
                    <Input
                      value={password}
                      placeholder="Password"
                      type="password"
                      onChange={updatePassword}
                    />
                    <Button
                      block
                      className="btn-round"
                      color="success"
                      onClick={authenticate}
                    >
                      Sign In
                    </Button>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Container>
          {/* <div className="footer register-footer text-center">
          <h6>
            © {new Date().getFullYear()}, made with{" "}
            <i className="fa fa-heart heart" /> by Creative Tim
          </h6>
        </div> */}
        </div>
        <DemoFooter />
      </>
    );
  }
}

export default RegisterPage;
