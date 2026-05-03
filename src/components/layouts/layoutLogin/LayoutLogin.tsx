import { Outlet } from "react-router-dom";
import Header from './HeaderLogin';
// import Genre from '../../../modules/movies/pages/Movies';

export default function Layout() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          {/* <Sidebar /> */}

          <div className="flex-1 overflow-y-auto bg-[url('https://img.magnific.com/free-photo/abstract-red-background-vertical-lines-strips_1258-108652.jpg?semt=ais_hybrid&w=740&q=80')] p-6">
            <Outlet />
            {/* <Genre/> */}
          </div>
        </div>
      </div>

    </>
  );
}