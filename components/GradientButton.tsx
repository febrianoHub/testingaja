type GradientButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
};

const GradientButton = ({ children, type = "button" }: GradientButtonProps) => {
  return (
    <button
      type={type}
      className="flex focus:ring-pink-200 focus:ring-4 focus:outline-none  justify-center hover:scale-105 transition-all cursor-pointer mt-3 gap-1 items-center text-lg font-semibold p-3 w-11/12 sm:w-auto sm:min-w-sm rounded-lg text-white bg-gradient-to-br from-pink-600 via-pink-400 to-pink-200"
    >
      {children}
    </button>
  );
};
export default GradientButton;
