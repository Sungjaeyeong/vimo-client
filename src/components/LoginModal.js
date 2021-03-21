import React, { Component } from "react";
import "./css/LoginModal.css";
import axios from "axios";

export default class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignin: true,
      email: "",
      password: "",
      username: "",
    };
    this.handleLoginBtn = this.handleLoginBtn.bind(this);
    this.handleInputValue = this.handleInputValue.bind(this);
  }

  handleLoginBtn = () => {
    if (this.state.email === "" || this.state.password === "") {
      alert("이메일과 비밀번호를 입력해주세요!");
    } else {
      axios
        .post(
          "https://server.vimo.link/user/login",
          {
            email: this.state.email,
            password: this.state.password,
          },
          { "Content-Type": "application/json", withCredentials: true }
        )
        .then((res) => {
          console.log(res.data);
          this.props.close();
          this.props.handleLoginChange();
        })
        .catch((err) => console.log(err));
    }
  };

  handleSignUpBtn = () => {
    if (
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.username === ""
    ) {
      alert("이메일, 비밀번호, 유저네임을 입력해주세요!");
    } else {
      axios
        .post(
          "https://server.vimo.link/user/signup",
          {
            email: this.state.email,
            password: this.state.password,
            username: this.state.username,
            isSocialLogin: true,
          },
          { "Content-Type": "application/json", withCredentials: true }
        )
        .then((res) => {
          console.log(res.data);
          this.props.close();
          this.props.handleLoginChange();
        })
        .catch((err) => alert(err));
    }
  };

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  render() {
    const { isLoginModalOn, close } = this.props;
    return (
      <>
        {isLoginModalOn ? (
          <div className="ModalWholeContainer">
            <div
              className={
                this.state.isSignin
                  ? "loginModalContainer"
                  : "loginModalContainer right-panel-active"
              }
            >
              <div className="form-container sign-up-container">
                <form action="#">
                  <h1>Create Account</h1>
                  <div className="social-container">
                    <a href="#" className="social">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="social">
                      <i className="fab fa-google-plus-g"></i>
                    </a>
                    <a href="#" className="social">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                  <span>or use your email for registration</span>
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={this.handleInputValue("username")}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={this.handleInputValue("email")}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={this.handleInputValue("password")}
                  />
                  <button onClick={this.handleSignUpBtn}>Sign Up</button>
                </form>
              </div>
              <div className="form-container sign-in-container">
                <form action="#">
                  <h1>Sign in</h1>
                  <div className="social-container">
                    <a href="#" className="social">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="social">
                      <i className="fab fa-google-plus-g"></i>
                    </a>
                    <a href="#" className="social">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                  <span>or use your account</span>
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={this.handleInputValue("email")}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={this.handleInputValue("password")}
                  />
                  <a href="#">Forgot your password?</a>
                  <button onClick={() => this.handleLoginBtn()}>Sign In</button>
                </form>
              </div>
              <div className="overlay-container">
                <div className="overlay">
                  <div className="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>
                      To keep connected with us please login with your personal
                      info
                    </p>
                    <button
                      className="ghost"
                      id="signIn"
                      onClick={() => {
                        this.setState({ isSignin: true });
                      }}
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <button
                      className="ghost"
                      id="signUp"
                      onClick={() => {
                        this.setState({ isSignin: false });
                      }}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}
