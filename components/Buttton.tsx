import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Button = () => {
  return (
    <button className="bg-white w-full py-2 rounded-md border focus:border-y-blue-400 focus:outline-none focus:ring-border-y-blue-400 mt-3 hover:bg-slate-200 duration-400">
      <FontAwesomeIcon color="black" icon={faRightToBracket} />
    </button>
  );
};
