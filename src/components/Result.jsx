import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const Result = forwardRef(function Result(
  { targetTime, result, timeRemaninig, onRest },
  ref
) {
  const dialog = useRef();
  const userLost = timeRemaninig <= 0;
  const formattedRemainingTime = timeRemaninig / 1000;
  const score = Math.round((1 - timeRemaninig / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal">
      {!userLost && <h2>Your Score: {score}</h2>}
      {userLost && <h2>You lost!</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stop the timer{" "}
        <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onRest}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});
export default Result;
