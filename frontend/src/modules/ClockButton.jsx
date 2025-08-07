import React from "react";
import "./../styles/ClockButton.css";
import { Clock, SignOut } from "phosphor-react";

const ClockButton = ({ state, onClick, disabled = false }) => {
  const isClockIn = state === "clockIn";

  const buttonClasses = `clock-button ${isClockIn ? "clock-in" : "clock-out"}`;
  const icon = isClockIn ? <Clock size={20} weight="fill" /> : <SignOut size={20} weight="fill" />;
  const text = isClockIn ? "Clock In" : "Clock Out";
  const caption = `Tap to ${isClockIn ? "start" : "end"} your shift`;

  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled}>
      <div className="clock-button-content">
        {icon}
        <span>{text}</span>
      </div>
      <div className="clock-button-caption">{caption}</div>
    </button>
  );
};

export default ClockButton;
