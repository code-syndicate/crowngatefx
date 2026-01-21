import {
  BsSpeedometer2,
  BsGraphUpArrow,
  BsWallet2,
  BsPerson,
} from "react-icons/bs";
import cn from "classnames";
import { useState, useEffect } from "react";

function BottomNav() {
  const [currentPath, setCurrentPath] = useState("/dashboard");

  useEffect(() => {
    // Get path on client side
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const items = [
    { title: "Home", icon: BsSpeedometer2, link: "/dashboard" },
    { title: "Trade", icon: BsGraphUpArrow, link: "/exchanges" },
    { title: "Wallet", icon: BsWallet2, link: "/wallets" },
    { title: "Profile", icon: BsPerson, link: "/settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bg1 border-t border-white/10 z-[9999] lg:hidden">
      <div className="flex justify-around items-center px-2 py-3 pb-safe">
        {items.map((item, i) => {
          const Icon = item.icon;
          const isActive = currentPath === item.link;

          return (
            <a
              key={i}
              href={item.link}
              className="flex flex-col items-center justify-center gap-1 min-w-[60px]"
            >
              <div
                className={cn("p-2.5 rounded-xl transition-all duration-300", {
                  "bg-accent text-white shadow-[0_0_20px_-5px_rgba(59,130,246,0.6)]":
                    isActive,
                  "text-text2": !isActive,
                })}
              >
                <Icon className="text-lg" />
              </div>
              <span
                className={cn("text-[10px] font-semibold transition-colors", {
                  "text-white": isActive,
                  "text-text3": !isActive,
                })}
              >
                {item.title}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNav;
