import React, { useState, useEffect } from "react";
import { API_URL } from "../../../config";

import { Rating, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

//------------
import { toast, Zoom } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import RateModal from "./RateModal";

import ForumIcon from "@mui/icons-material/Forum";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";

interface Props {
  id: string;
  ratingProp: number;
}

const labels: { [index: string]: string } = {
  0.5: "Poor",
  1: "Poor+",
  1.5: "Below Average",
  2: "Below Average+",
  2.5: "Average",
  3: "Average+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const Ratingcomp: React.FC<Props> = ({ id, ratingProp }) => {
  const [rating, setRating] = useState<number | null>(2.5);
  const [hover, setHover] = useState(-1);

  //-------------------> LOGGED USER <-----------------------

  const [modalOpen, setModalOpen] = useState(false);

  const { user, isAuthenticated } = useAuth0();

  //--------------------------------------------------------

  const handleSubmit = async (rating: number | null) => {
    if (!isAuthenticated) {
      setModalOpen(true);
      return;
    }
    try {
      const response = await fetch(`${API_URL}/products/${id}/ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating }),
      });
      const data = await response.json();
      console.log(data.message);

      toast.success("Rating submitted", {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log("rating: ", rating);
  }, [rating]);

  return (
    <div className="fb-comments-Rating">
      <form
        className="foro-comments-form"
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          console.log("rating: ", rating);
          handleSubmit(rating);
        }}
      >
        <div className="foro-comments-stars">
          <Rating
            size="large"
            name="hover-feedback"
            value={rating}
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          {rating !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
          )}

          <div className="foro-comments-buttonSide">
            <button className="Rating-button-Submit" type="submit">
              {" "}
              Rate
            </button>
            <Link to={`/foro/profile/63dd4cdc15d4a80012819190`}>
              <IconButton>
                <ForumIcon />
              </IconButton>
            </Link>
          </div>
        </div>

        <div className="foro-comments-bars">
          <div className="foro-comments-bars-container-text">
            <p>Excellent</p>
            <p>Good</p>
            <p>Average</p>
            <p>Below Average</p>
            <p>Poor</p>
          </div>
          <div className="foro-comments-bars-container-bars">
            <div className="foro-comments-excelent"></div>
            <div className="foro-comments-Good"></div>
            <div className="foro-comments-Average"></div>
            <div className="foro-comments-BelowAverage"></div>
            <div className="foro-comments-Poor"></div>
          </div>
        </div>
      </form>
      {modalOpen && <RateModal />}
    </div>
  );
};

export default Ratingcomp;
