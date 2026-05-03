import { useNavigate } from "react-router-dom";

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
          <a href="/genre" className="text-lg md:text-xl text-white font-bold ">Di Streaming</a>
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <a href="/genre" className="text-white hover:underline">
              Movie Genre
            </a>
            <a href="/category" className="text-white hover:underline">
              Category
            </a>
            <a href="/user" className="text-white hover:underline">
              User
            </a>
            <a
              onClick={handleLogout}
              className="bg-black/30 hover:bg-black text-white font-semibold px-3 py-1 rounded cursor-pointer"
            >
              Log out
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
