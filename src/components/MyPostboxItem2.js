import { React, useState, useEffect } from "react";
import { useHistory } from "react-router";
import MyPostboxImg from "../image/mypostboxitemimg.png";
import PoppyImg from "../image/ReceivedLetterPoppy.png";
import { postBoxFetchRequest } from "./PostboxFetchRequest";
// import * as S from './styles';

function MyPostboxItem2() {
  const [item2_link_title, setItemTitle2] = useState(null);
  const [item2_mailbox_link, setItemLink2] = useState(null);
  const [item2_number_letter, setItemLetter2] = useState(null);
  const history = useHistory();

  const second_open_date = new Date(
    localStorage.getItem("2nd_open_date") + " " + "00:00:00" // eslint-disable-line
  );
  const now = new Date();

  const Copy = () => {
    copyToClipboard(item2_mailbox_link);

    alert("복사되었습니다!");
  };

  const copyToClipboard = (val) => {
    const t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = val;
    t.select();
    document.execCommand("copy");
    document.body.removeChild(t);
  };

  const [_article, setArticle] = useState(null);

  const PopupDelete = () => {
    setArticle(
      <div>
        <div className="delete-postbox-box">
          <div className="delete-postbox-title">
            이 우체통을 삭제하시겠습니까?
          </div>
          <div className="delete-postbox-desc">
            한 번 삭제하신 우체통은 복구가 불가능합니다. 정말 삭제하시겠습니까?
          </div>
          <div className="delete-postbox-box-no" onClick={PopdownDelete}>
            아니요
          </div>
          <div className="delete-postbox-box-yes" onClick={deleteRequest}>
            네 삭제할래요.
          </div>
        </div>
      </div>
    );
  };

  const PopdownDelete = () => {
    setArticle(null);
  };

  const deleteRequest = () => {
    fetch(
      "https://poppymail.shop/mailbox/" + localStorage.getItem("2nd_id") + "/",
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + access,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((res) => res)
      .then((res) => {
        if (res.ok) {
          alert("삭제 완료!");
          SecondPostboxRequest();
          window.location.reload();
        } else {
          alert("다시 로그인해주세요");
          localStorage.clear();
        }
      });
  };

  const access = localStorage.getItem("access");

  useEffect(() => {
    SecondPostboxRequest();
  }, []);

  const SecondPostboxRequest = () => {
    postBoxFetchRequest();
    setItemTitle2(localStorage.getItem("2nd_link_title"));
    setItemLink2(localStorage.getItem("2nd_mailbox_link"));
    setItemLetter2(localStorage.getItem("2nd_number_letter"));
  };

  const openSpecificPostboxRequest = () => {
    history.push(
      "/checkarrivedmail/" + localStorage.getItem("2nd_id") + "/letters/"
    );
    localStorage.setItem("id", localStorage.getItem("2nd_id"));
    var step;
    for (step = 0; step < 30; step++) {
      localStorage.removeItem("sender" + step);
      localStorage.removeItem("length");
    }
  };

  return (
    <>
      <div className="copy-my-post-box-link-ment" onClick={Copy}>
        이 우체통 링크 복사하기
      </div>

      <div className="delete-my-post-box" onClick={PopupDelete}>
        삭제
      </div>

      {second_open_date <= now ? (
        <img src={MyPostboxImg} alt="postbox" className="MyPostboxImg"></img>
      ) : (
        <img src={PoppyImg} alt="postbox" className="PostboxPoppyImg"></img>
      )}

      <div className="my-post-box-item-ment1">&lt;{item2_link_title}&gt;</div>
      {second_open_date <= now ? (
        <div className="my-post-box-item-ment2">
          편지 {item2_number_letter}개 도착
        </div>
      ) : (
        <div className="my-post-box-item-ment2">
          편지 {item2_number_letter}개 오는 중
        </div>
      )}
      <div className="my-post-box-item-ment3">
        편지 열람이 가능할 때 알림이 가요!
      </div>
      {second_open_date <= now ? (
        <div className="open-post-box-btn" onClick={openSpecificPostboxRequest}>
          우체통 열기
        </div>
      ) : (
        <div className="open-post-box-btn-disable">우체통 열기</div>
      )}
      {_article}
    </>
  );
}

export default MyPostboxItem2;
