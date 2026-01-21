import {
  BsSpeedometer2,
  BsGraphUpArrow,
  BsWallet2,
  BsPerson,
} from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import LogoImage from "../assets/logo.png";
import cn from "classnames";

const items = [
  { title: "Dashboard", icon: BsSpeedometer2, link: "/dashboard" },
  { title: "Trade", icon: BsGraphUpArrow, link: "/exchanges" },
  { title: "Wallets", icon: BsWallet2, link: "/wallets" },
  { title: "Settings", icon: BsPerson, link: "/settings" },
];

function Sidebar() {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 flex-col bg-surface/80 backdrop-blur-2xl border-r border-white/5 z-50">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <a href="/dashboard" className="flex items-center gap-3">
          <img
            src={LogoImage.src}
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-lg font-bold text-white tracking-tight">
            CrownGate<span className="text-accent">FX</span>
          </span>
        </a>
      </div>

      {/* Nav Items */}
      <div className="flex-1 flex flex-col gap-2 p-4 mt-4">
        <p className="text-text3 text-xs font-bold uppercase tracking-widest px-4 mb-2">
          Menu
        </p>
        {items.map((item, i) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.link;

          return (
            <a
              key={i}
              href={item.link}
              className={cn(
                "relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-medium",
                {
                  "bg-accent text-white shadow-[0_0_25px_-5px_rgba(59,130,246,0.4)]":
                    isActive,
                  "text-text2 hover:bg-white/5 hover:text-white": !isActive,
                },
              )}
            >
              <Icon className="text-xl flex-shrink-0" />
              <span className="text-sm">{item.title}</span>
              {isActive && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent rounded-l-full"></span>
              )}
            </a>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/5">
        <a
          href="/log-out"
          className="flex items-center gap-4 px-4 py-3 rounded-xl text-text2 hover:text-danger hover:bg-danger/10 transition-all duration-300 font-medium"
        >
          <MdLogout className="text-xl" />
          <span className="text-sm">Sign Out</span>
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;
