import { Link } from "react-router-dom";
import Button from "../../components/actions/Button.tsx";

export const Header = () => {
  return (
    <div
      className={
        "flex justify-between items-center px-11 py-4 border-b border-zinc-200"
      }
    >
      <div>logo</div>

      <div className={"flex gap-4"}>
        <Link to={"/"}>Home</Link>
        <Link to={"/"}>Home</Link>
        <Link to={"/"}>Home</Link>
        <Link to={"/"}>Home</Link>
      </div>

      <div>
        <Button label={"Sign In"} />
      </div>
    </div>
  );
};
