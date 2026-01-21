export default function Spinner({ size = "medium" }) {
  const sizeClasses = {
    tiny: "w-4 h-4 border-2",
    small: "w-6 h-6 border-2",
    medium: "w-10 h-10 border-4",
    large: "w-16 h-16 border-4",
  };

  return (
    <div className="flex justify-center items-center p-2">
      <div
        className={`relative ${sizeClasses[size] || sizeClasses.medium} rounded-full animate-spin-fast border-t-accent border-r-transparent border-b-accent border-l-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]`}
      >
        <div className="absolute inset-0 rounded-full blur-[2px] bg-accent/20 animate-pulse-glow"></div>
      </div>
    </div>
  );
}
