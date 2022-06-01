import classes from "../Styles/Video.module.css";

export default function Video({ title, id, noq, ...rest }) {
  return (
    <div className={classes.video} {...rest}>
      <img
        src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
        alt={title}
      />
      <p>{title}</p>
      <div className={classes.qmeta}>
        <p>{noq} Questions</p>
        <p>Total Points : {noq * 10}</p>
      </div>
    </div>
  );
}
