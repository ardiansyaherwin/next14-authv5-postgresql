"use client";

import { logout } from "@/actions/auth";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const SettingsPage = () => {
  const user = useCurrentUser();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-white p-10 rounded-xl border border-black">
      <button
        type="button"
        onClick={handleLogout}
        className="border border-slate-500 rounded-md p-4 hover:bg-slate-100"
      >
        Sign Out
      </button>
    </div>
  );
};

export default SettingsPage;
