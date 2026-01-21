import cn from "classnames";
import ProfileForm from "./ProfileForm";
import { useState } from "react";
import Profile from "./Profile";
import NotificationPanel from "./NotificationPanel";
import { startTransition } from "react";
import { useEffect } from "react";

function SettingsActions({ user }) {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const url = new URL(location.href, location.origin);

    if (url.searchParams.has("v")) {
      const l = ["0", "1", "2"];
      const v = url.searchParams.get("v");

      if (!l.includes(v)) {
        return;
      }

      if (active !== +v) {
        startTransition(() => {
          setActive(+v);
        });
      }
    }
  }, []);

  function selectActive(n) {
    return () => {
      setActive(n);
    };
  }

  return (
    <div className="card-nebula p-4 lg:p-6">
      <div className="flex overflow-x-auto p-1 bg-surface2/50 backdrop-blur-md rounded-xl mb-6 border border-white/5 scrollbar-hide">
        <button
          onClick={selectActive(0)}
          className={cn(
            "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
            {
              "bg-accent text-white shadow-lg shadow-accent/20": active === 0,
              "text-text2 hover:text-white hover:bg-white/5": active !== 0,
            },
          )}
        >
          My Profile
        </button>

        <button
          onClick={selectActive(1)}
          className={cn(
            "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
            {
              "bg-accent text-white shadow-lg shadow-accent/20": active === 1,
              "text-text2 hover:text-white hover:bg-white/5": active !== 1,
            },
          )}
        >
          Edit Profile
        </button>

        <button
          onClick={selectActive(2)}
          className={cn(
            "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
            {
              "bg-accent text-white shadow-lg shadow-accent/20": active === 2,
              "text-text2 hover:text-white hover:bg-white/5": active !== 2,
            },
          )}
        >
          Notifications
        </button>
      </div>

      <div
        className={cn({
          " block ": active === 0,
          " hidden ": active !== 0,
        })}
      >
        <Profile user={user} />
      </div>

      <div
        className={cn({
          " block ": active === 1,
          " hidden ": active !== 1,
        })}
      >
        <ProfileForm user={user} />
      </div>

      <div
        className={cn({
          " block ": active === 2,
          " hidden ": active !== 2,
        })}
      >
        <NotificationPanel user={user} />
      </div>
    </div>
  );
}

export default SettingsActions;
