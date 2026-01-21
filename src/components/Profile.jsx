import AvatarImage from "../assets/avatar.png";

function Profile({ user }) {
  return (
    <div className="col-span-6 lg:col-span-2 flex flex-col items-center card-nebula p-8 min-h-[500px] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 w-full h-32 bg-accent/10 blur-[50px] rounded-t-full"></div>

      <div className="relative z-10 w-full flex flex-col items-center space-y-6">
        <div className="relative group">
          <div className="p-1 rounded-full bg-gradient-to-tr from-accent to-purple-600 shadow-[0_0_30px_-5px_rgba(59,130,246,0.6)]">
            <img
              src={AvatarImage.src}
              className="w-32 h-32 rounded-full border-4 border-bg1 object-cover"
              alt="avatar"
            />
          </div>
          <div className="absolute bottom-2 right-2 w-5 h-5 bg-success rounded-full border-2 border-bg1"></div>
        </div>

        <div className="text-center space-y-1">
          <h2 className="font-bold text-white text-2xl tracking-tight">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-text2 font-medium">{user?.email}</p>
          <p className="text-text3 text-xs pt-2">
            Member since{" "}
            {new Date(user?.dateJoined || Date()).toLocaleDateString()}
          </p>
        </div>

        <div className="w-full h-px bg-white/5 my-4"></div>

        <div className="w-full space-y-2">
          <p className="text-xs font-bold text-text2 uppercase tracking-widest pl-2 mb-2">
            Account Settings
          </p>

          <a
            href="/change-password"
            className="flex items-center p-3 rounded-xl text-text1 hover:bg-white/5 hover:text-accent transition-all duration-300"
          >
            <span>Change Password</span>
          </a>
          <a
            href="/reset-password"
            className="flex items-center p-3 rounded-xl text-text1 hover:bg-white/5 hover:text-accent transition-all duration-300"
          >
            <span>Reset Password</span>
          </a>
          <a
            href="/log-out"
            className="flex items-center p-3 rounded-xl text-danger/80 hover:bg-danger/10 hover:text-danger transition-all duration-300"
          >
            <span>Sign Out</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Profile;
