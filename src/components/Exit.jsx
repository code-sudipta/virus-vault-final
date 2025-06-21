/**
 * Exit component
 *
 * This component renders a modal with a sad emoji icon, a message
 * asking if the user wants to exit, and two buttons for user
 * interaction. The "Yes" button is styled with a tertiary color
 * and changes to pink on hover, while the "No" button is styled
 * with a secondary color and changes to teal on hover.
 *
 * @returns {JSX.Element} - The rendered modal component
 */
const Exit = () => {
  const handleExit = () => {
    window.electronAPI.quitApp();
  };
  return (
    <div>
      {/* <!-- Sad Emoji Icon --> */}
      <div className="flex justify-center mb-4 mt-1">
        <i className="fa-solid fa-face-sad-tear text-5xl text-[var(--mysecondary-color)]"></i>
      </div>

      {/* <!-- Message --> */}
      <p className="text-xl mb-6">Are you surely want to exit?</p>

      {/* <!-- Buttons --> */}
      <div className="flex justify-center space-x-6">
        <button
          className="bg-[var(--mytertiary-color)] hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-lg transition"
          onClick={handleExit}
        >
          Yes
        </button>
        <button className="bg-[var(--mysecondary-color)] hover:bg-teal-500 text-white font-semibold py-2 px-6 rounded-lg transition">
          No
        </button>
      </div>
    </div>
  );
};

export default Exit;
