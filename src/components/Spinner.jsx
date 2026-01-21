export default function Spinner({ size = "medium", color = "white" }) {
  const sizeClasses = {
    tiny: "w-4 h-4 border-2",
    small: "w-6 h-6 border-2",
    medium: "w-10 h-10 border-4",
    large: "w-16 h-16 border-4",
  };

  const colorClasses = {
    white: "border-t-white border-b-white",
    accent: "border-t-accent border-b-accent",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size] || sizeClasses.medium} ${colorClasses[color] || colorClasses.white} rounded-full animate-spin border-r-transparent border-l-transparent`}
      />
    </div>
  );
}
