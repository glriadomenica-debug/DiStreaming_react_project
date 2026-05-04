import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../../../components/modals/movie/MovieModal';
import MovieModalConfirmation from '../../../components/modals/movie/MovieModalConfirmation';
import { IoIosAdd } from "react-icons/io";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { AiOutlineRight } from "react-icons/ai";

interface Category {
  id: number;
  name: string;
}

interface Movies {
  id: number;
  title: string;
  description: string;
  rating: number;
  release_year: number;
  thumbnail: string;
  video_url: string;
  category_id: number;
  category?: Category;
}

export default function ListMovies() {
  const [formMovies, setFormMovies] = useState<any>({});
  const [Movies, setMovies] = useState<Movies[]>([]);
  const [Categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [meta, setMeta] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [id, setId] = useState<any>(null);
  const navigate = useNavigate();


  // ✅ FETCH MOVIES (FIXED)
  const fetchMovies = async (
    page = 1,
    categoryId = selectedCategory,
  ) => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8000/api/movies",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          page,
          category_id: categoryId,
        },
      });
      setMovies(response.data.data.data || []);
      setMeta(response.data.data.meta || {});
      setCurrentPage(page);
    } catch (error) {
      console.log(error);
      setMovies([]); // biar tidak crash
    }
  };

  // Ambil data category di db
  const fetchCategory = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8000/api/categories",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCategories(response.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchCategory();
  }, []);

  const handleChangeMovies = (event: any) => {
    setFormMovies({
      ...formMovies,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitMovies = async () => {
    try {
      await axios({
        method: "POST",
        url: "http://localhost:8000/api/movies",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: formMovies,
      });
      fetchMovies();
      setOpenModal(false);
      setFormMovies({});
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalDelete = (id: number) => {
    setId(id);
    setOpenModalDelete(true);
  };
  const handleDeleteMovies = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/movies/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      fetchMovies();
      setOpenModalDelete
    } catch (error) {
      console.log(error);
    }
  };

  // FILTER CATEGORY
  const handleCategoryClick = (id: number) => {
    setSelectedCategory(id);
    fetchMovies(1, id);
  };

  return (
    <>
      <div className="bg-white/80 p-6 rounded-lg shadow">
        <div className="flex justify-end">
          {/* <h1 className="text-1xl font-bold">Movies</h1> */}
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center justify-end bg-blue-600 text-white m-2 px-4 py-2 rounded hover:bg-blue-900 cursor-pointer"
          > <IoIosAdd /> Add Movie
          </button>
        </div>

        {/* content genre movies */}
        <div className="bg-black text-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Movies : Genre</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`cursor-pointer p-4 rounded flex items-center justify-between ${selectedCategory === cat.id
                  ? "bg-blue-600"
                  : "bg-gray-800 hover:bg-blue-700"
                  }`}
              > {cat.name} <AiOutlineRight />
              </div>
            ))}
          </div>
        </div>

        {/* Menampilkan data MOVIES*/}
        <div className="mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.isArray(Movies) && Movies.map((m) => (
              <div key={m.id} className="bg-white rounded shadow p-3">
                <h3 className="text-blue-600 font-semibold mt-2 underline cursor-pointer hover:text-blue-900" onClick={() => navigate(`/movies/${m.id}`)}>{m.title}</h3>
                <p className="text-sm text-gray-500">
                  {m.release_year} • ⭐ {m.rating}
                </p>

                {/* ✅ FIX CATEGORY */}
                <p className="text-xs text-blue-500">
                  {m.category?.name || "No Category"}
                </p>

                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => navigate(`/movies/edit/${m.id}`)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-900 cursor-pointer" >
                    <AiFillEdit />
                  </button>

                  <button
                    onClick={() => handleModalDelete(m.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-900 cursor-pointer"
                  >
                    <AiFillDelete />
                  </button>
                </div>

              </div>
            ))}

          </div>
        </div>

        {/* PAGINATION */}
        <div className="flex gap-2 mt-6">
          {Array.from({ length: meta?.last_page || 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => fetchMovies(i + 1)}
              className={`px-3 py-1 border rounded cursor-pointer 
                ${currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-400"
                }
                    `}
            >

              {i + 1}
            </button>
          ))}
        </div>

      </div>

      {/* MODAL */}
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleChange={handleChangeMovies}
        handleSubmit={handleSubmitMovies}
        categories={Categories}
        title="Add Movie"
      />
      <MovieModalConfirmation
        openModal={openModalDelete}
        setOpenModal={setOpenModalDelete}
        title="Delete User"
        description="Are you sure you want to delete this Movie?"
        handleSubmit={handleDeleteMovies}
      />

    </>
  );
}