import { IoMdPlay } from "react-icons/io";
import { SiSimplelogin } from "react-icons/si";
import { CgLogIn } from "react-icons/cg";


export default function HeaderLogin() {

  return (
    <>
      {/* Header */}
      <header className="bg-cover bg-center bg-[url('https://static.vecteezy.com/system/resources/thumbnails/004/717/032/small/scary-dark-red-walls-slightly-light-dark-concrete-cement-texture-for-background-photo.jpg')]">
        <div className="px-4 md:px-8 lg:px-12 flex justify-between h-14 items-center">
          <div className="flex items-center gap-2 text-xl text-white w-1/4 "> <IoMdPlay />
            Di Streaming
          </div>
          <div className="flex items-center gap-2 md:gap-4 ">
            <a href="/login" className="flex items-center gap-2 text-white text-sm md:text-base font-semibold px-3 py-1 md:px-4 md:py-2 rounded hover:bg-black/70 transition">
              <CgLogIn />
              Login
            </a>
            {/* <a href="/register" className="hover:bg-black text-white font-bold py-2 px-4 rounded transition-all">
              Sign in
            </a> */}
          </div>
        </div>
      </header>
    </>
  );
}
