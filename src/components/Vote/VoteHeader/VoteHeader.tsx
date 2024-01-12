import { BsThreeDots } from "react-icons/bs";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { RiMap2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import styles from "./VoteHeader.module.scss";

import { VoteHeaderProps } from "@/types/vote";

const VoteHeader = ({ onOpen }: VoteHeaderProps) => {
  const navigate = useNavigate();

  const voteTitle = "카페 어디로 갈래?";

  //상태에 따른 아이콘 disabled
  // 또는 없애기

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.leftBackIcon}>
        <MdOutlineArrowBackIosNew />
      </button>
      <p className={styles.title}>{voteTitle}</p>

      <div className={styles.iconBox}>
        <button>
          <RiMap2Line />
        </button>

        <button onClick={onOpen}>
          <BsThreeDots />
        </button>
      </div>
    </div>
  );
};

export default VoteHeader;
