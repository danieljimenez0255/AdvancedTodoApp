import TimePicker from "react-time-picker";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

export const ClockM = ({
  timeState,
  handleTimeStateChange,
  modalTitle,
  confirmTime,
}) => {
  const makeClockSty = makeStyles({
    clockSty: {
      borderRadius: "10px !important",
      backgroundColor: "#fff",
      border: "2px inset gray",
      transition: "all .5s",
      "& div": {
        border: "none",
      },
      "&:hover": {
        border: "2px solid red",
      },
    },
    container: {
      position: "relative",
      bottom: "10px",
      borderBottom: "2px solid gray",
      paddingBottom: "10px",
      "& h2": {
        marginBottom: "8px",
      },
    },

    confirmTimeButton: {
      marginLeft: "10px",
      marginBottom: "5px",
    },
  });

  const clockClasses = makeClockSty();

  return (
    <>
      {modalTitle ? (
        <div className={clockClasses.container}>
          <h2>Change Todo Time</h2>
          <TimePicker
            onChange={(event) => handleTimeStateChange(event)}
            value={timeState}
            className={clockClasses.clockSty}
          />
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={confirmTime}
            className={clockClasses.confirmTimeButton}
          >
            Change Time
          </Button>
        </div>
      ) : (
        <TimePicker
          onChange={(event) => handleTimeStateChange(event)}
          value={timeState}
          className={clockClasses.clockSty}
        />
      )}
    </>
  );
};
