import { useState } from "react";
import {
  FaCar,
  FaChartBar,
  FaClock,
  FaCog,
  FaParking,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";

interface Menu {
  title: string;
  icon: JSX.Element;
  route: string;
}

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const menus: Menu[] = [
    { title: "Visão Geral", icon: <FaChartBar />, route: "/" },
    { title: "Clientes", icon: <FaUsers />, route: "/clients" },
    { title: "Carros", icon: <FaCar />, route: "/cars" },
    { title: "Vagas", icon: <FaParking />, route: "/parking-spots" },
    { title: "Estacionamento", icon: <FaClock />, route: "/parking" },
    { title: "Conta", icon: <FaUser />, route: "/account" },
    { title: "Configurações", icon: <FaCog />, route: "/settings" },
  ];

  return (
    <div
      className={` ${
        open ? "w-72" : "w-20 "
      } bg-dark-purple p-5 pt-8 relative duration-300 transition-all`}
    >
      <img
        src="./src/assets/control.png"
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple 
           border-2 rounded-full transition-transform transform hover:scale-150 ${
             !open && "rotate-180"
           }`}
        onClick={() => setOpen(!open)}
      />
      <Link to="/">
        <div className="flex gap-x-4 items-center mb-8">
          <img
            src="./src/assets/logo.jpeg"
            className={`cursor-pointer duration-500 rounded-full ${
              open && "rotate-[360deg] w-20 h-20"
            }`}
          />
        </div>
      </Link>
      <div
        className={`p-3 bg-white bg-opacity-5 rounded-lg justify-center items-center ${
          !open && "hidden"
        }`}
      >
        <div className="w-16 self-stretch flex-col justify-center items-start">
          <span className="text-light-white text-2xl font-bold">
            Sistema
            <br />
            Estacionamento
          </span>
        </div>
      </div>
      <ul className="mt-6 flex flex-col gap-y-2">
        {menus.map((menu) => (
          <li key={menu.title} title={menu.title} aria-label={menu.title}>
            <Link
              to={menu.route}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 duration-200`}
            >
              <div
                className={`w-7 h-7 flex justify-center items-center text-xl`}
              >
                {menu.icon}
              </div>
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-200 text-sm`}
              >
                {menu.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
