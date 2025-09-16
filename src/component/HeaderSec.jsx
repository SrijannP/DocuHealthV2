import { Link } from "react-router-dom";

const HeaderSec = () => {
  return (
    <header className="bg-neutral-800 border-b-2 text-white shadow-md p-4 flex justify-between items-center">
      <div className="flex justify-center items-center">
      <img src="../../Resources/logo.png" className=" h-23 "></img>
      <h1 className="text-2xl font-bold ml-5">DocuHealth</h1>
      </div>

      <div className="space-x-4">
      <Link to="/">
          <button className="bg-neutral-800 text-green-600 px-4 py-2 rounded hover:bg-blue-100 transition">
            Home
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-neutral-800 text-green-600 px-4 py-2 rounded hover:bg-blue-100 transition">
            Register
          </button>
        </Link>
        <Link to="/record">
          <button className="bg-neutral-800 text-green-600 px-4 py-2 rounded hover:bg-blue-100 transition">
            Scan QR
          </button>
        </Link>
      </div>
    </header>
  );
};

export default HeaderSec;
