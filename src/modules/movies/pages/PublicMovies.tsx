import { useEffect, useState } from 'react';
import axios from 'axios';
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

export default function PulicMovies() {
  const [Movies, setMovies] = useState<Movies[]>([]);
  const [Categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [meta, setMeta] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
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

  // FILTER CATEGORY
  const handleCategoryClick = (id: number) => {
    setSelectedCategory(id);
    fetchMovies(1, id);
  };

  return (
    <>
      <div className="bg-white/80 p-6 rounded-lg shadow">
        {/* <div className="flex justify-between items-center">
          <h1 className="text-1xl font-bold">Movies</h1>
        </div> */}

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
                <h3 className="text-blue-600 font-semibold mt-2 underline cursor-pointer hover:text-blue-900" onClick={() => navigate(`/details/${m.id}`)}>{m.title}</h3>
                <p className="text-sm text-gray-500">
                  {m.release_year} • ⭐ {m.rating}
                </p>

                {/* ✅ FIX CATEGORY */}
                <p className="text-xs text-blue-500">
                  {m.category?.name || "No Category"}
                </p>
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
            >{i + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}