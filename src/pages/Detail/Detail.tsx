import { useDisclosure } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { useRecoilValue } from "recoil";

import styles from "./Detail.module.scss";

import AlertModal from "@/components/AlertModal/AlertModal";
import BottomFixedBtn from "@/components/Detail/BottomFixedBtn/BottomFixedBtn";
import RegistrationSlide from "@/components/Detail/BottomFixedBtn/RegistrationSlide/RegistrationSlide";
import BottomSlideDetail from "@/components/Detail/BottomSlideDetail/BottomSlideDetail";
import Contents from "@/components/Detail/Contents/Contents";
import ReviewBottomSlide from "@/components/Detail/Contents/ReviewBottomSlide/ReviewBottomSlide";
import Main from "@/components/Detail/Main/Main";
import MeatballBottomSlide from "@/components/Detail/Navigation/MeatballBottomSlide/MeatballBottomSlide";
import Navigation from "@/components/Detail/Navigation/Navigation";

import { modalContentState } from "@/recoil/vote/alertModal";

function Detail() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bottomSlideContent, setBottomSlideContent] =
    useState<ReactNode | null>(null);
  const modalContent = useRecoilValue(modalContentState);
  const [isReviewModal, setIsReviewModal] = useState<boolean>(false);

  const onBottomSlideOpen = (content: ReactNode, isReview: boolean) => {
    setIsReviewModal(isReview);
    setBottomSlideContent(content);
    onOpen();
    document.body.style.overflow = "hidden";
  };

  const handleSlideOnClose = () => {
    setBottomSlideContent(null);
    onClose();
  };

  return (
    <div className={styles.container}>
      <Navigation
        onOpen={() =>
          onBottomSlideOpen(
            <MeatballBottomSlide
              onBottomSlideOpen={onBottomSlideOpen}
              onClose={handleSlideOnClose}
            />,
            false,
          )
        }
      />
      <Main />
      <Contents
        onOpen={() =>
          onBottomSlideOpen(
            <ReviewBottomSlide slideOnClose={handleSlideOnClose} />,
            true,
          )
        }
      />
      <BottomFixedBtn
        onOpen={() =>
          onBottomSlideOpen(
            <RegistrationSlide slideOnClose={handleSlideOnClose} />,
            false,
          )
        }
      />
      <BottomSlideDetail
        isOpen={isOpen}
        onClose={onClose}
        children={bottomSlideContent}
        isReviewModal={isReviewModal}
        setBottomSlideContent={setBottomSlideContent}
      />
      <AlertModal {...modalContent} />
    </div>
  );
}

export default Detail;
