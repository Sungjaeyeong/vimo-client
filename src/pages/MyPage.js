import React from "react";
import { withRouter } from "react-router";
import "./css/MyPage.css";
import MyVideoMemoList from "../components/MyVideoMemoList";
import axios from "axios";
import MyPageEditModal from "../components/MyPageEditModal";
import MyPageMemoModal from "../components/MyPageMemoModal";

class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "annoymous",
      email: "abc@naver.com",
      usermemo: "",
      movieCount: "8",
      memoCount: "8",
      displayEdit: false,
      displayMemo: false,
      data: { memoInfo: [] },
      memoData: "",
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleEditModalOnOff = this.handleEditModalOnOff.bind(this);
    this.handleVideoMemoModalOnOff = this.handleVideoMemoModalOnOff.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
  }

  handleHomeClick = () => {
    this.props.history.push("/");
  };

  handleEditModalOnOff = () => {
    this.setState({
      displayEdit: this.state.displayEdit ? false : true,
    });
  };

  handleVideoMemoModalOnOff = (data) => {
    this.setState({
      displayMemo: this.state.displayMemo ? false : true,
      memoData: data,
    });
  };

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handleChangeUserName = (name) => {
    this.setState({
      username: name,
    })
  }

  handleLogoutBtn = () => {
    axios
      .post("https://server.vimo.link/user/logout", null, {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then((res) => {
        this.props.handleLogout();
        window.location.replace("/");
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    axios
      .get("https://server.vimo.link/link/mypage", {
        headers: {
          Authorization: `Bearer ${this.props.accessToken}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        this.setState({
          data: res.data.data,
          username: res.data.data.userInfo.username,
          email: res.data.data.userInfo.email,
          memoCount: res.data.data.memoInfo.length,
          movieCount: res.data.data.memoInfo.length,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <>
        <MyPageEditModal
          display={this.state.displayEdit}
          handleEditModalOnOff={this.handleEditModalOnOff}
          userId={this.props.userId}
          changeUsername={this.handleChangeUserName}
        />
        <MyPageMemoModal
          data={this.state.memoData}
          display={this.state.displayMemo}
          handleVideoMemoModalOnOff={this.handleVideoMemoModalOnOff}
        />
        <div className="MyPagemainContainer">
          <nav className="MyPageNavBar">
            <div
              className="MyPageNavLogo"
              alt="logo"
              onClick={() => this.handleHomeClick()}
            />
            <div className="MyPageNavUserContainer">
              <div
                className="MyPageNavLogoutContainer"
                onClick={() => this.handleHomeClick()}
              >
                <div className="MyPageNavLogout" onClick={this.handleLogoutBtn}>
                  logout
                </div>
              </div>
            </div>
          </nav>
          <div className="MyPageUserInfoContainer">
            <img
              className="MyPageProfilePic"
              alt="profilePic"
              src="https://i.imgur.com/FP3hraO.png"
            />
            <div id="MyPageUserInfoBox">
              <div id="MyPageUsernameBox">
                <div id="MyPageUsername">
                  <div>{this.state.username}</div>
                </div>
                <button
                  id="MyPageUserEditBtn"
                  onClick={this.handleEditModalOnOff}
                >
                  edit
                </button>
              </div>
              <div id="MyPageUseremailBox">
                <span id="MyPageUseremail">{this.state.email}</span>
              </div>
              <div id="MyPageUsercountBox">
                <span className="MyPageUsercount">
                  영화본횟수: {this.state.movieCount}
                </span>
                <span className="MyPageUsercount">
                  메모횟수: {this.state.memoCount}
                </span>
              </div>
            </div>
          </div>
          <div id="MyPageVideoMemoContainer">
            {this.state.data.memoInfo.map((item, index) => (
              <MyVideoMemoList
                key={index}
                data={item}
                handleVideoMemo={this.handleVideoMemoModalOnOff}
              ></MyVideoMemoList>
            ))}
          </div>
          <footer className="mainFooter">
            <div className="mainFooterCodeStatesLogo"></div>
            <div className="mainFooterVimoLogo"></div>
            <div className="footerContents">
              Team WodeCode <br />
              <br />
              SEONA BAK / seonabak0109@gmail.com <br />
              JAEYOUNG SEONG / wodud2587@gmail.com <br />
              MINJE SHIN / sinminji1004@gmail.com <br />
              JUNGHO CHOI / 9rganizedchaos@gmail.com <br />
            </div>
          </footer>
        </div>
      </>
    );
  }
}

export default withRouter(MyPage);
