import { ReactNode } from "react";

const NavTitle = ({ children }: { children: ReactNode }) => {
  return <div className="border-b pb-1 mt-3 mb-1 w-full text-gray-400 text-xs">
    {children}
  </div>
}
export default NavTitle;
