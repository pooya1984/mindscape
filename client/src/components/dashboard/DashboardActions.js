import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div>
      <Link
        to="/edit-profile"
        type="button"
        className="btn btn-outline-secondary btn-sm"
      >
        Edit Profile
      </Link>
    </div>
  );
};

export default DashboardActions;
