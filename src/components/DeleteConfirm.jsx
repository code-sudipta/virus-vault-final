import React from "react";

/**
 * DeleteConfirm is a modal component that asks the user to confirm
 * deletion of selected files in the Quarantine component.
 * @param {function} onConfirm - function to be called when the user
 * confirms deletion
 * @param {function} onCancel - function to be called when the user
 * cancels deletion
 * @returns {ReactElement} - the rendered modal component
 */
const DeleteConfirm = ({ onConfirm, onCancel }) => {
  return (
    <div>
      <div className="flex justify-center mb-4 mt-1">
        <i className="fa-solid fa-trash text-5xl text-[var(--mysecondary-color)]"></i>
      </div>
      <p className="text-xl mb-6">
        Are you sure you want to delete the selected files?
      </p>
      <div className="flex justify-center space-x-6">
        <button
          onClick={onCancel}
          className="bg-[var(--mytertiary-color)] hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="bg-[var(--mysecondary-color)] hover:bg-teal-500 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirm;
