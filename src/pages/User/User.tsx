import styles from "./User.module.scss";

import MypageList from "@/components/User/MypageList/MypageList";
import Mywork from "@/components/User/Mywork/Mywork";
import Profile from "@/components/User/Profile/Profile";

const userInfo = {
  nickname: "개발토끼",
  image: "https://avatars.githubusercontent.com/u/100336573?v=4",
  provider: "KAKAO",
  email: "test@gmail.com",
};

function User() {
  // const [userInfo, setUserInfo] = useState({
  //   nickname: "",
  //   profile: profileDefault,
  // });

  return (
    <div className={styles.container}>
      <h1>마이페이지</h1>

      <Profile userInfo={userInfo} />

      <Mywork />

      <MypageList />
    </div>
  );
}

export default User;
