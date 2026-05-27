import Gnb from "./gnb/Gnb";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div>
      <Gnb />
      <Outlet />
    </div>
  );
}
