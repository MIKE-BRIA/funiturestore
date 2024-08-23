import { Outlet } from "react-router-dom";
import AdminNav from "../components/AdminNav";

const Admin = () => {
  return (
    <>
      <div className="flex ">
        <AdminNav />
        <main className="bg-slate-300 flex-grow p-6 h-screen">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Admin;
