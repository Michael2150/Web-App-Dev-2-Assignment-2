import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../../components/shows/templateShowPage";
import ShowReview from "../../components/shows/showReview";

const ShowReviewPage = (props) => {
  let location = useLocation();
  const {show, review} = location.state;

  return (
    <PageTemplate show={show}>
      <ShowReview review={review} />
    </PageTemplate>
  );
};

export default ShowReviewPage;