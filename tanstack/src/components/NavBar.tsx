import { Link } from "@tanstack/react-router";

export default function NavBar() {
  return (
    <nav
      className={
        "container mx-auto mb-4 flex items-center justify-center gap-x-8 border-b-2 border-b-teal-900 p-4 font-bold"
      }
    >
      <Link to={"/cards"}>Home</Link>
      <Link to={"/editor"}>Create</Link>
    </nav>
  );
}
