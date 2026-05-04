import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../../../components/modals/user/UserModal';
import UserModalConfirmation from '../../../components/modals/user/UserModalConfirmation';
import { IoIosAdd } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
export default function ListProducts() {
  const [perPage, setPerPage] = useState<number>(5);
  const [pager, setPager] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [formUser, setFormUser] = useState<any>({});
  const [users, setUsers] = useState<User[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false); //Trigger untuk menekkan button add
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [id, setId] = useState<any>(null);
  const navigate = useNavigate();

  const handleChangeUser = (event: any) => {
    setFormUser({
      ...formUser,
      [event.target.name]: event.target.value,
    });
  }
  //untuk ambil semua data yang ada di DB 
  const fetchUser = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8000/api/users",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response, "response");

      await setUsers(response.data.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmitUser = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:8000/api/users",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: formUser,
      });
      console.log(response, "response");
      fetchUser();
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleModalDelete = (id: number) => {
    setId(id);
    setOpenModalDelete(true);
  };

  const handleDeleteUser = async () => {
    try {
      await axios({
        method: "DELETE",
        url: `http://localhost:8000/api/users/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchUser();
      setOpenModalDelete(false);
    } catch (error) {
      console.log(error, "error");
    }
  }

  return (
    <>
      {/* List table users*/}
      <div className='bg-white p-4 mt-8 shadow rounded-lg'>
        <h1 className=''>Users data</h1>
        <div className='text-end'>
          <button onClick={() => setOpenModal(true)} className="flex items-center text-md bg-blue-900 hover:bg-blue-700 text-white py-1 px-4 rounded hover:cursor-pointer"><IoIosAdd />
            Add New User</button>
        </div>
        <table className="mt-4 w-full">
          <thead className="border border-gray-300">
            <tr className="border border-gray-300">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">password</th>
              <th className="border border-gray-300 p-2">Password Confirmation</th>
              <th className="border border-gray-300 p-2">Action</th>


            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={index} className={`${index % 2 === 0 ? "bg-gray-200 hover:bg-gray-300" : "hover:bg-gray-300"}`}>
                <td className="border border-gray-300 p-2">{u.name}</td>
                <td className="border border-gray-300 p-2">{u.email}</td>
                <td className="border border-gray-300 p-2">{u.password}</td>
                <td className="border border-gray-300 p-2">{u.password_confirmation}</td>
                <td className="border border-gray-300 p-2 flex gap-4">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded hover:cursor-pointer" onClick={() => navigate(`/users/edit/${u.id}`)}>
                    <AiFillEdit />
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded hover:cursor-pointer" onClick={() => handleModalDelete(u.id)}> <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleChange={handleChangeUser}
        handleSubmit={handleSubmitUser}
        title="Add New User"
      />

      <UserModalConfirmation
        openModal={openModalDelete}
        setOpenModal={setOpenModalDelete}
        title="Delete User"
        description="Are you sure you want to delete this user?"
        handleSubmit={handleDeleteUser}
      />

    </>
  );
}