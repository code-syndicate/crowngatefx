import LogoImage from "../assets/logo.png";
import { BsSearch, BsChat, BsBell, BsX } from "react-icons/bs";
import { VscMenu } from "react-icons/vsc";
import { $sidebar, setShowSidebar } from "../lib/atoms";
import AvatarImage from "../assets/avatar.png";
import { useStore } from "@nanostores/react";

function Header({ user }) {
  const sidebarState = useStore($sidebar);

  return (
    <>
      <div id="google_translate_element"></div>

      <header className="bg-bg2/95 backdrop-blur-xl z-40 fixed inset-x-0 top-0 py-3 lg:py-4 w-full md:pl-[20%] lg:pl-[20%] flex flex-row justify-between items-center px-6 border-b border-white/5 shadow-sm">
        <div className="lg:hidden">
          {sidebarState.show ? (
            <BsX
              className="text-text1 text-3xl cursor-pointer hover:text-white transition-colors"
              onClick={() => setShowSidebar(false)}
            />
          ) : (
            <VscMenu
              className="text-text1 text-3xl cursor-pointer hover:text-white transition-colors"
              onClick={() => setShowSidebar(true)}
            />
          )}
        </div>

        {/* Search Bar - Hidden on small mobile, visible on lg */}
        <div className="hidden md:flex flex-row items-center w-full max-w-xl px-4">
          <div className="relative w-full">
            <input
              className="glass-input pl-10 pr-4 py-2.5 rounded-xl w-full text-sm font-medium focus:ring-theme/50 transition-all"
              type="text"
              placeholder="Search markets, assets..."
            />
            <BsSearch className="text-text1/50 text-sm absolute top-1/2 left-3.5 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex flex-row items-center space-x-4 ml-auto">
          {/* Notifications */}
          <div className="flex flex-row items-center space-x-2">
            <a
              href="/settings?v=2"
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 transition-all relative group"
            >
              <BsBell className="text-text1/70 text-xl group-hover:text-white transition-colors" />
              {user?.notifications?.filter((c) => !c.isRead).length > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-theme border-2 border-bg2"></span>
              )}
            </a>
          </div>

          <div className="h-8 w-[1px] bg-white/10 mx-2"></div>

          {/* User Profile */}
          <a
            href="/settings?v=1"
            className="flex flex-row items-center space-x-3 group cursor-pointer"
          >
            <div className="hidden lg:flex flex-col items-end">
              <span className="font-semibold text-sm text-white group-hover:text-theme transition-colors">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="text-xs text-text1/50">Verified Trader</span>
            </div>

            <div className="relative">
              <img
                src={AvatarImage.src}
                alt="Avatar"
                className="w-9 h-9 rounded-full border-2 border-white/10 group-hover:border-theme/50 transition-all object-cover"
              />
              {user.isAdmin && (
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-bg2">
                  A
                </span>
              )}
            </div>
          </a>
        </div>
      </header>
    </>
  );
}

export default Header;
