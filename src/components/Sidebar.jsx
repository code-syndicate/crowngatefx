import {
  BsSpeedometer,
  BsGrid,
  BsWallet2,
  BsPerson,
  BsGear,
} from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { useStore } from "@nanostores/react";
import { $sidebar } from "../lib/atoms";
import LogoImage from "../assets/logo.png";
import cn from "classnames";

const items = [
  { title: "Dashboard", icon: BsSpeedometer, link: "/dashboard" },
  { title: "Trade", icon: BsGrid, link: "/exchanges" },
  { title: "Wallet", icon: BsWallet2, link: "/wallets" },
  { title: "Profile", icon: BsPerson, link: "/settings" },
];

function Sidebar() {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-24 flex-col bg-surface/50 backdrop-blur-2xl border-r border-border z-50 py-8">
      {/* Logo */}
      {/* Nav Items */}
      <div className="flex-1 flex flex-col gap-6 w-full px-4">
        {items.map((item, i) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.link;

          return (
            <a
              key={i}
              href={item.link}
              className={cn(
                "relative group flex items-center justify-center p-4 rounded-2xl transition-all duration-300",
                {
                  "bg-accent text-white shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)]":
                    isActive,
                  "text-text2 hover:bg-white/10 hover:text-white": !isActive,
                },
              )}
              title={item.title}
            >
              <Icon className="text-xl" />
              {isActive && (
                <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-l-full blur-[2px] opacity-50"></span>
              )}
            </a>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="mt-auto flex flex-col gap-4 w-full px-4">
        <a
          href="/log-out"
          className="flex items-center justify-center p-4 rounded-2xl text-text2 hover:text-danger hover:bg-danger/10 transition-all duration-300"
          title="Logout"
        >
          <MdLogout className="text-xl" />
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;
