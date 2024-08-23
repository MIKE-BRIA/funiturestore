import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { FaBoxArchive } from "react-icons/fa6";

const AdminNav = () => {
  return (
    <>
      <aside className="bg-slate-600 h-screen w-48 flex flex-col p-2">
        <nav className="flex flex-col space-y-4">
          <div>
            <img
              src="/vite.svg"
              alt="Logo"
              className="h-20 w-full shadow-xl rounded-lg bg-slate-200"
            />
            <h1 className="text-center my-2 font-mono text-white">Furniro</h1>
          </div>
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${
                isActive ? "bg-slate-700" : "text-white hover:bg-slate-700"
              }`
            }
          >
            <MdDashboard size={24} />
            <p>DASHBOARD</p>
          </NavLink>
          <NavLink
            to="products"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${
                isActive ? "bg-slate-700" : "text-white hover:bg-slate-700"
              }`
            }
          >
            <FaBoxArchive size={24} />
            <p>ALL PRODUCTS</p>
          </NavLink>
          <NavLink
            to="orders"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${
                isActive ? "bg-slate-700" : "text-white hover:bg-slate-700"
              }`
            }
          >
            <CiBoxList size={24} />
            <p>ORDER LIST</p>
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default AdminNav;
