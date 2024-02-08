import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();
  session?.user?.role;
  return (
    <div className="flex flex-col gap-4 p-24">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button
          type="submit"
          className="border border-slate-500 rounded-md p-4 hover:bg-slate-100"
        >
          Sign Out
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
