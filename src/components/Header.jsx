import LogoImage from "../assets/logo.png";
import { BsBell, BsPersonCircle } from "react-icons/bs";
import AvatarImage from "../assets/avatar.png";

function Header({ user }) {
  return (
    <>
      <div id="google_translate_element" className="hidden"></div>

      <header className="fixed top-0 right-0 z-40 px-6 py-4 w-full lg:w-[calc(100%-16rem)] transition-all duration-300">
        <div className="mx-auto max-w-7xl bg-surface/80 backdrop-blur-xl border border-white/5 rounded-2xl shadow-lg px-6 py-3 flex items-center justify-between">
          {/* Mobile Logo / Title */}
          <div className="flex items-center gap-3">
            <img
              src={LogoImage.src}
              className="w-8 h-8 lg:hidden object-contain"
              alt="Logo"
            />
            <h1 className="text-lg font-bold tracking-tight hidden md:block">
              <span className="text-white">CrownGate</span>
              <span className="text-accent">FX</span>
            </h1>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Notif */}
            <a
              href="/settings"
              className="relative p-2 text-text2 hover:text-white transition-colors"
            >
              <BsBell className="text-xl" />
              {user?.notifications?.some((n) => !n.isRead) && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              )}
            </a>

            {/* Profile Pill */}
            <a
              href="/settings"
              className="flex items-center gap-3 pl-4 border-l border-white/10"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white leading-none">
                  {user?.firstName}
                </p>
                <p className="text-[10px] text-text2 uppercase tracking-wider font-bold">
                  Pro Trader
                </p>
              </div>
              <div className="relative">
                <img
                  src={AvatarImage.src}
                  className="w-9 h-9 rounded-full border-2 border-surface2 object-cover ring-2 ring-transparent group-hover:ring-accent transition-all"
                  alt="Profile"
                />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-bg2"></div>
              </div>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
