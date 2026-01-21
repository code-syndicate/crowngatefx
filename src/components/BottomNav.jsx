import {
  BsSpeedometer,
  BsArrowLeftRight,
  BsWallet2,
  BsPerson,
} from "react-icons/bs";
import cn from "classnames";

function BottomNav() {
  const items = [
    { title: "Home", icon: BsSpeedometer, link: "/dashboard" },
    { title: "Trade", icon: BsArrowLeftRight, link: "/exchanges" },
    { title: "Wallet", icon: BsWallet2, link: "/wallets" },
    { title: "Profile", icon: BsPerson, link: "/settings" },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-xl border-t border-border pb-safe z-50 safe-area-pb">
      <div className="flex justify-around items-center px-4 py-2">
        {items.map((item, i) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.link;

          return (
            <a
              key={i}
              href={item.link}
              className="group flex flex-col items-center justify-center space-y-1 w-16"
            >
              <div
                className={cn(
                  "p-3 rounded-2xl transition-all duration-300 relative",
                  {
                    "bg-accent text-white shadow-[0_0_15px_-5px_rgba(59,130,246,0.5)] -translate-y-2":
                      isActive,
                    "text-text2 group-hover:text-white": !isActive,
                  },
                )}
              >
                <Icon className="text-xl" />
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium transition-all duration-300",
                  {
                    "text-white opacity-100": isActive,
                    "text-text2 opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto":
                      !isActive,
                  },
                )}
              >
                {item.title}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default BottomNav;
