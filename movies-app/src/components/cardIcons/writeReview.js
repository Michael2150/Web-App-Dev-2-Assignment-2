import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from "react-router-dom";

const WriteReviewIcon = ({ movie, show }) => {
  if (movie) {
    return (
      <Link to={{
        pathname: "/reviews/form",
        state: { movie }
      }}>
        <RateReviewIcon color="primary" fontSize="large" />
      </Link>
    );
  } else if (show) {
    return (
      <Link to={{
        pathname: "/reviews/form",
        state: { show }
      }}>
        <RateReviewIcon color="primary" fontSize="large" />
      </Link>
    );
  }
};

export default WriteReviewIcon;