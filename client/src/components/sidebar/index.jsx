import { MoreVertical, ChevronLast } from "lucide-react";
import { useContext, createContext, useState } from "react";
import { Img } from "components";

const SidebarContext = createContext();

export default function Sidebar({ children, userInfo}) {
  const [expanded, setExpanded] = useState(false);
  const getInitials = (name) => {
    const names = name.split(" ");
    let initials = "";

    for (let i = 0; i < names.length && i < 2; i++) {
      if (names[i].length > 0) {
        initials += names[i][0].toUpperCase();
      }
    }

    return initials;
  };

  return (
    <aside className="h-screen bg-gradient-to-br  from-linear-100 to-linear-200">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <Img
            src="images/img_group_black_900_01.svg"
            className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
            alt=""
          />
          <button
            onClick={() => setExpanded((getinfo) => !getinfo)}
            className="p-1.5 rounded-lg  hover:bg-[#fff]"
          >
            {expanded ? <ChevronLast/> : <Img src="images/Vector.svg" className="flex  w-6 "/>}

          </button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
        <div className="border-t flex p-3">
          <div
            className="w-10 h-10 rounded-md bg-gray-300 flex justify-center items-center"
          >
            <span className="text-xl font-bold">{getInitials(userInfo.name)}</span>
          </div>
          <div
            className={`
              flex text-black-900_d1 justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
            `}
          >
            <div className="leading-4 text-[#000]">
              <h4 className="font-semibold">{userInfo.name}</h4>
              <span className="text-xs text-[#000]">{userInfo.email}</span>
            </div>
            <MoreVertical size={20} className="text-[#000]"/>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, onLogout }) {
  const { expanded } = useContext(SidebarContext);

  const handleLogout = () => {
    fetch('http://localhost:5000/api/logout', {
      credentials: 'include',
    }).then(() => window.location.reload());
  };

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${active ? "text-[#000000] bg-[#fff] hover:bg-[#18f2eb]"  : "hover:bg-indigo-50 text-[#000000]"}
      `}
      onClick={onLogout ? handleLogout : undefined}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}
        />
      )}
      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          {text}
        </div>
      )}
    </li>
  );
}