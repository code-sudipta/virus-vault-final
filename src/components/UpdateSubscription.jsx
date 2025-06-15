import React from "react";

/**
 * Renders a message indicating that the user's subscription is up to date.
 * The component renders a shield icon with a checkmark in the center, and a
 * message below the icon indicating that the subscription is up to date.
 * @returns {ReactElement} - The rendered component
 */
const UpdateSubscription = () => {
  return (
    <div>
        {/* <!-- Shield Image --> */}
        <div className="flex items-center justify-center">
          <i className="fa-solid fa-shield text-9xl text-[--mysecondary-color] relative"> 
            <i className="fa-solid fa-check text-white text-6xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></i>
          </i>
        </div>

        {/* <!-- Message --> */}
        <p className="text-[--text-color] text-lg mt-8 text-center">
          Your Subscription is already updated
        </p>
    </div>
  );
};

export default UpdateSubscription;
