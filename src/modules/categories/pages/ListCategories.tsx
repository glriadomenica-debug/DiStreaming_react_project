import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../../../components/modals/category/CategoryModal';
import { IoIosAdd } from "react-icons/io";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import CategoryModalConfirmation from '../../../components/modals/category/CategoryModalConfirmation';

interface Category {
  id: number;
  name: string;
  description: string;
  movies_count?: number;
}

export default function ListCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formCategory, setFormCategory] = useState<any>({});
  const [meta, setMeta] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [id, setId] = useState<any>(null);
  const navigate = useNavigate();

  // Mengambil data Category 
  const fetchCategory = async (page = 1) => {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:8000/api/categories",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { page }
      });
      setCategories(res.data.data || []);
      setMeta(res.data.meta || {});
      setCurrentPage(page);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  //  INPUT CHANGE
  const handleChangeCategory = (e: any) => {
    setFormCategory({
      ...formCategory,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ ADD
  const handleSubmitCategory = async () => {
    try {
      await axios({
        method: "POST",
        url: "http://localhost:8000/api/categories",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: formCategory,
      });
      fetchCategory();
      setOpenModal(false);
      setFormCategory({});
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalDelete = (id: number) => {
    setId(id);
    setOpenModalDelete(true);
  };
  // ✅ DELETE
  const handleDeleteCategory = async () => {
    try {
      await axios({
        method: "DELETE",
        url: `http://localhost:8000/api/categories/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Delete Successfully")
      fetchCategory();
      setOpenModalDelete(false);
    } catch (error: any) {
      alert(error.response?.data?.message || "cannot delete");
    }
  };

  return (
    <>
      <div className="bg-white/80 p-6 rounded-lg shadow">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-black">Categories</h1>

          <button
            onClick={() => {
              setOpenModal(true);
              setFormCategory({});
            }}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-900 cursor-pointer"
          >
            <IoIosAdd /> Add Category
          </button>
        </div>

        {/* Listing category */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white p-4 rounded shadow items-center">
              <h3 className='font-semibold text-blue-500'>{cat.name}</h3>
              <p className='text-sm text-gray-500'>{cat.description}</p>

              {/* 🔥 tampilkan usage */}
              {cat.movies_count && cat.movies_count > 0 && (
                <p className="text-xs text-red-500 mt-1">
                  Used by {cat.movies_count} movie(s)
                </p>
              )}

              <div className="flex gap-2">
                <button className="text-blue-500 hover:bg-blue-700 cursor-pointer" onClick={() => navigate(`/categories/edit/${cat.id}`)}>
                  <AiFillEdit />
                </button>
                <button
                  onClick={() => handleModalDelete(cat.id)}
                  disabled={cat.movies_count! > 0}
                  className={`${cat.movies_count! > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-red-500 hover:text-red-800"
                    }`}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex gap-2 mt-6">
          {Array.from({ length: meta?.last_page || 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => fetchCategory(i + 1)}
              className={`px-3 py-1 border rounded cursor-pointer
                ${currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-400"
                }`}
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
        handleChange={handleChangeCategory}
        handleSubmit={handleSubmitCategory}
        title='Add new category'
      />
      <CategoryModalConfirmation
        openModal={openModalDelete}
        setOpenModal={setOpenModalDelete}
        title="Delete User"
        description="Are you sure you want to delete this category?"
        handleSubmit={handleDeleteCategory}
      />
    </>
  );
}