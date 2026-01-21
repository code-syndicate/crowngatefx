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
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-bg1/95 backdrop-blur-xl border-t border-white/10 z-[100]">
      <div className="flex justify-around items-center px-2 py-3 pb-safe">
        {items.map((item, i) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.link;

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
