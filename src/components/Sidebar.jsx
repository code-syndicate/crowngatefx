import { BsSpeedometer, BsX } from "react-icons/bs";
import { AiOutlineSetting, AiOutlineWallet } from "react-icons/ai";
import { MdCurrencyExchange, MdLogout } from "react-icons/md";
import { useStore } from "@nanostores/react";
import { $sidebar, setShowSidebar } from "../lib/atoms";
import Overlay from "./Overlay";
import LogoImage from "../assets/logo.png";
import cn from "classnames";

const items = [
  {
    title: "Dashboard",
    icon: BsSpeedometer,
    link: "/dashboard",
  },
  {
    title: "Exchanges",
    icon: MdCurrencyExchange,
    link: "/exchanges",
  },
  {
    title: "Wallets",
    icon: AiOutlineWallet,
    link: "/wallets",
  },
  {
    title: "Settings",
    icon: AiOutlineSetting,
    link: "/settings",
  },
  {
    title: "Logout",
    icon: MdLogout,
    link: "/log-out",
  },
];

function Sidebar() {
  const sidebarState = useStore($sidebar);

  return (
    <>
      <aside
        className={
          "w-[80%] hidden md:flex md:w-[20%] lg:w-[20%] pt-10 px-4 max-w-[300px] min-h-screen fixed left-0 top-0 bottom-0 flex-col justify-start items-center space-y-8 bg-black/40 backdrop-blur-xl border-r border-white/5 z-50"
        }
      >
        <div className="w-full flex justify-center pb-6">
          <img src={LogoImage.src} alt="Insured Growth FX" className="w-32" />
        </div>

        <div className="w-full space-y-2">
          {items.map((v, i) => {
            const Icon = v.icon;
            const isActive = location.pathname === v.link;

            return (
              <a
                href={v.link}
                key={i}
                className={cn(
                  "w-full font-medium text-left px-4 py-3 rounded-xl flex flex-row justify-start space-x-3 items-center transition-all duration-300 group",
                  {
                    "bg-theme/10 text-theme": isActive,
                    "text-text1/70 hover:bg-white/5 hover:text-white":
                      !isActive,
                  }
                )}
              >
                <Icon
                  className={cn("text-xl transition-colors", {
                    "text-theme": isActive,
                    "text-text1/50 group-hover:text-white": !isActive,
                  })}
                />
                <span> {v.title} </span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-theme"></div>
                )}
              </a>
            );
          })}
        </div>
      </aside>

      {sidebarState.show && (
        <Overlay z={3}>
          <div className="flex w-full flex-row justify-center items-center animate-slide-in-left">
            <aside
              className={
                "w-[80%] lg:w-[25%] px-6 pt-12 max-w-[300px] min-h-screen fixed left-0 top-0 bottom-0 flex flex-col justify-start items-center space-y-8 bg-bg2/95 backdrop-blur-xl border-r border-white/10 z-50"
              }
            >
              <div className="lg:hidden absolute top-4 right-4">
                <BsX
                  className="text-text1/80 text-3xl cursor-pointer hover:text-white transition-colors"
                  onClick={() => setShowSidebar(false)}
                />
              </div>

              <div className="">
                <img src={LogoImage.src} alt="Logo" className="w-40" />
              </div>

              <div className="w-full space-y-2">
                {items.map((v, i) => {
                  const Icon = v.icon;
                  const isActive = location.pathname === v.link;

                  return (
                    <a
                      href={v.link}
                      key={i}
                      className={cn(
                        "w-full font-medium text-left px-4 py-3 rounded-xl flex flex-row justify-start space-x-3 items-center transition-all duration-300 group",
                        {
                          "bg-theme/10 text-theme": isActive,
                          "text-text1/70 hover:bg-white/5 hover:text-white":
                            !isActive,
                        }
                      )}
                    >
                      <Icon
                        className={cn("text-xl", { "text-theme": isActive })}
                      />
                      <span> {v.title} </span>
                    </a>
                  );
                })}
              </div>
            </aside>
          </div>
        </Overlay>
      )}
    </>
  );
}

export default Sidebar;
