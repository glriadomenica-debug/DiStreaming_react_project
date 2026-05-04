import { useNavigate } from "react-router-dom";
import { IoMdPersonAdd } from "react-icons/io";
import { IoIosListBox } from "react-icons/io";
import { TfiControlPlay } from "react-icons/tfi";
import { IoMdPlay } from "react-icons/io";
import { CgLogOff } from "react-icons/cg";


export default function HeaderHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  }

  return (
    <>
      {/* Header */}
      <header className="bg-[url('https://static.vecteezy.com/system/resources/thumbnails/004/717/032/small/scary-dark-red-walls-slightly-light-dark-concrete-cement-texture-for-background-photo.jpg')]">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between py-3 items-center">
          <a href="/genre" className="flex items-center gap-2 text-lg md:text-xl text-white font-bold ">  <IoMdPlay /> Di Streaming</a>
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <a href="/genre" className="flex items-center gap-2 text-white hover:underline">
              <TfiControlPlay />
              Movie Genre
            </a>
            <a href="/category" className="flex items-center gap-2 text-white hover:underline">
              <IoIosListBox />
              Category
            </a>
            <a href="/user" className="flex items-center gap-2 text-white hover:underline">
              <IoMdPersonAdd />
              User
            </a>
            <a
              onClick={handleLogout}
              className="flex items-center gap-2 bg-black/30 hover:bg-black text-white font-semibold px-3 py-1 rounded cursor-pointer"
            ><CgLogOff />
              Log out
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
