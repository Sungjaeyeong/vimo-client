import React from "react";
import { withRouter } from "react-router";
import "./css/VideoPage.css";
import VideoMemoModal from "../components/VideoMemoModal";

const plusZero = function (input) {
  input = String(input);
  if (input.length === 1) {
    return "0" + input;
  } else {
    return input;
  }
};

const makeProperTime = function (input) {
  let hour = 0;
  let minute = 0;
  let second = 0;
  let recursion = function (input) {
    if (input >= 3600) {
      hour++;
      input -= 3600;
      return recursion(input);
    } else if (input >= 60) {
      minute++;
      input -= 60;
      return recursion(input);
    } else {
      second = input;
    }
  };
  recursion(input);
  hour = plusZero(hour);
  minute = plusZero(minute);
  second = plusZero(second);
  return `${hour}:${minute}:${second}`;
};

class VideoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "annoymous",
      discription: "하하하",
      display: false,
      currentTime: 7896,
    };
    this.handelQuitBtnClick = this.handelQuitBtnClick.bind(this);
  }
  handleHomeClick = () => {
    this.props.history.push("/");
  };

  handleMyPageClick = () => {
    this.props.history.push("/mypage");
  };

  handelMemoBtnClick = () => {
    let videoPageVideo = document.querySelector(".videoPageVideo");
    videoPageVideo.pause();
    let currentTime = Math.floor(videoPageVideo.currentTime);
    currentTime = makeProperTime(currentTime);
    this.setState({
      display: true,
      currentTime: currentTime,
    });
  };

  handelQuitBtnClick = () => {
    this.setState({
      display: false,
    });
    let videoPageVideo = document.querySelector(".videoPageVideo");
    videoPageVideo.play();
  };

  handleSaveBtnClick = () => {
    this.setState({ display: false });
    let videoPageVideo = document.querySelector(".videoPageVideo");
    videoPageVideo.play();
  };

  render() {
    return (
      <div className="VideomainContainer">
        <VideoMemoModal
          display={this.state.display}
          handelQuitBtnClick={this.handelQuitBtnClick}
          currentTime={this.state.currentTime}
        />
        <nav className="VideoNavBar">
          <div
            className="videoNavLogo"
            alt="logo"
            onClick={() => this.handleHomeClick()}
          />
          <div className="videoNavUserContainer">
            <img
              className="videoNavProfilePic"
              alt="profilePic"
              src="https://i.imgur.com/FP3hraO.png"
              onClick={() => this.handleMyPageClick()}
            />
            <div className="videoNavUsernameBox">
              <div className="videoNavUsername">{this.state.username}</div>
            </div>
          </div>
        </nav>
        <div id="videoVideoPlayerContainer">
          <div className="videoIconContainer" onClick={this.handelMemoBtnClick}>
            <div id="videoMemoBtn">Memo</div>
          </div>
          <video
            className="videoPageVideo"
            src={this.props.videoUrl}
            type="video/mp4"
            controls
            autoPlay
            width="1080"
            height="720"
          ></video>
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
    );
  }
}

export default withRouter(VideoPage);
