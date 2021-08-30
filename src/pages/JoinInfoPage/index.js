import React, { createContext, useState, useMemo } from "react";
import { Link, useHistory } from "react-router-dom";
import JoinInfoMent from "../../components/Txt/JoinInfoMent";
import LogoNameJoin from "../../components/Txt/LogoNameJoin";
import CompleteBtn from "../../components/Btn/CompleteBtn";

import * as S from "./styles";
import JoinInput from "../../components/JoinInput";

export const UserContext = createContext({
  setName: () => {},
  setBirthdate: () => {},
  setGender: () => {},
  setPhone: () => {},
});

function JoinInfoPage() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("남");
  const [phone, setPhone] = useState("");
  const value = useMemo(
    () => ({ setName, setBirthdate, setGender, setPhone }),
    [setName, setBirthdate, setGender, setPhone]
  );
  const access = localStorage.getItem("access");

  const JoinRequest = () => {
    if (name === "" || birthdate === "" || gender === "" || phone === "") {
      alert(
        "필수 입력 요소가 작성되지 않았습니다 ... 알림창 만드러야댐" + access
      );
    } else {
      const access = localStorage.getItem("access");
      const User_id = localStorage.getItem("User_id");
      fetch("https://poppymail.shop/account/" + User_id + "/userInfo", {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + access,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          phone: phone,
          gender: gender,
          birthdate: birthdate,
        }),
      })
        .then(res => res.json())
        .then(res => {
          history.push("/joincomplete");
          // localStorage.setItem("Kakao_token", res.access_token);
          // const kakao_token = localStorage.getItem("Kakao_token");
          if (res) {
            console.log(access);
            console.log(res);

            // alert(res.user_name + "님, poppy mail에 오신 것을 환영합니다!");
            // history.push("/joininfo");
          }
        });
    }
  };

  return (
    <UserContext.Provider value={value}>
      <S.JoinInfoScene>
        <LogoNameJoin></LogoNameJoin>
        <JoinInfoMent></JoinInfoMent>

        <JoinInput></JoinInput>

        {/* <CompleteBtn onClick={test}></CompleteBtn> */}
        <div className="join-input-complete-btn" onClick={JoinRequest}>
          완료
        </div>
      </S.JoinInfoScene>
    </UserContext.Provider>
  );
}

export default JoinInfoPage;
