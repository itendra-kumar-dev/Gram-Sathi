import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-[1.5rem] shadow-[0_20px_60px_-15px_rgba(15,23,42,0.12)] border border-gray-100 p-6 sm:p-8 lg:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-700">Welcome to GramSathi 🚜</h1>

        <p className="mt-6 text-base sm:text-lg">
          Hello,
          <span className="font-semibold text-green-700"> {user?.name}</span>
        </p>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-10">
          <div className="bg-green-50 rounded-xl p-5 sm:p-6">
            <h2 className="text-xl font-semibold">Email</h2>
            <p className="mt-2 text-gray-600 break-all">{user?.email}</p>
          </div>

          <div className="bg-green-50 rounded-xl p-5 sm:p-6">
            <h2 className="text-xl font-semibold">Role</h2>
            <p className="mt-2 text-gray-600">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;