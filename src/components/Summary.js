import { useMemo } from "react";
import useFetch from "../Hooks/useFetchImage";
import successImage from "../images/success.png";
import classes from "../Styles/Summary.module.css";

export default function Summary({ score, noq }) {
  const getKeyword = useMemo(() => {
    if ((score / (noq * 10)) * 100 < 50) {
      return "Failed";
    } else if ((score / (noq * 10)) * 100 < 75) {
      return "Average";
    } else if ((score / (noq * 10)) * 100 < 100) {
      return "Very Good";
    } else {
      return "Tremendous";
    }
  }, [score, noq]);
  console.log(`keyword is ${getKeyword}`);

  const { loading, result, error } = useFetch(
    `https://api.pexels.com/v1/search?query=${getKeyword}&per_page=1`,
    "GET",
    {
      Authorization: process.env.REACT_APP_PEXEL_API,
    }
  );
  console.log(result);
  //const image = result ? result.photos[0].src.medium : successImage;
  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        {/* <!-- progress bar will be placed here --> */}
        <p className={classes.score}>
          Your score is <br />
          {score} out of {noq * 10}
        </p>
      </div>
      {loading && <div className={classes.badge}>Loading....</div>}
      {error && <div className={classes.badge}>There was an error..</div>}
      {!loading && !error && (
        <div className={classes.badge}>
          <img src={successImage} alt="No img" />
        </div>
      )}
    </div>
  );
}
