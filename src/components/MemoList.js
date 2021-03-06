import React from "react";
import MemoListEntry from "./MemoListEntry";
import "./css/MemoList.css";

class MemoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { openMemoModal, title, data } = this.props;
    let category;
    if (this.props.title === "베스트 유저의 메모") {
      category = "colletionMemos";
    } else if (this.props.title === "내가 감상한 콘텐츠의 메모") {
      category = "viewdContentsMemos";
    } else if (this.props.title === "인기 콘텐츠의 메모") {
      category = "popularMemos";
    } else if (this.props.title === "새로운 메모") {
      category = "newMemos";
    }
    const categoryVideo = category.concat("Vidoes");
    return (
      <div className="MemoListContainer">
        <div className="MemoListTitle">{title}</div>
        <div className="MemoListEntryContainer">
          {Array.isArray(this.props.data[category])
            ? this.props.data[category].map((item) => (
                <MemoListEntry
                  openMemoModal={openMemoModal}
                  content={item.content}
                  changeMemoInfo={this.props.changeMemoInfo}
                  videoId={item.videoId}
                  data={data}
                  videoData={this.props.data[categoryVideo]}
                  changeVideoInfo={this.props.changeVideoInfo}
                  videoThumbnail={this.props.videoThumbnail}
                  categoryVideo={categoryVideo}
                  category={category}
                  changeOnlyVideoUrl={this.props.changeOnlyVideoUrl}
                ></MemoListEntry>
              ))
            : null}
        </div>
      </div>
    );
  }
}

export default MemoList;
