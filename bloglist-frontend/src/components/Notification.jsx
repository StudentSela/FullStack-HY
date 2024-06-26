import PropTypes from "prop-types";

const Notification = ({ successMsg, errorMsg }) => {
  if (successMsg === null && errorMsg === null) return null;

  const messageStyles = {
    color: successMsg ? "green" : "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return <p style={messageStyles}>{successMsg || errorMsg}</p>;
};

Notification.propTypes = {
  successMsg: PropTypes.string,
  errorMsg: PropTypes.string,
};

export default Notification;