import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


interface formRegister {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export default function Register() {
  const navigate = useNavigate();
  const [formRegister, setFormRegister] = useState<formRegister>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (event: any) => {  //event - adalah event listener
    setFormRegister({
      ...formRegister,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      await axios({
        method: "POST",
        url: "http://localhost:8000/api/auth/registration",
        data: {
          name: formRegister.name,
          email: formRegister.email,
          password: formRegister.password,
          password_confirmation: formRegister.password_confirmation,
        },
      });
      toast.success("Account successfully register")
      navigate('/'); // Redirect login ke dashboard kalau loginnya sukses
    } catch (error: any) {
      console.log(error, "error");
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  console.log(formRegister, "formRegister");


  return (
    <>
      <div className='flex h-screen justify-center items-center'>
        {/* left */}
        <div>
          <div className='bg-gray-300 shadow lg:mx-32 mx-4 p-8 rounded-xl'>
            <h1 className='flex text-4xl text-left mb-4'>
              Register New Account</h1>
            <p className='text-gray-500'>Please fill this form to create your account</p>

            <div className='flex flex-col gap-4 mt-2'>
              <label htmlFor="name">Name</label>
              <input type="name" name="name" onChange={handleChange} className='border border-gray-400 p-2 w-full rounded-xl' placeholder='Please enter your name' required />
            </div>

            <div className='flex flex-col gap-4 mt-2'>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" onChange={handleChange} className='border border-gray-400 p-2 w-full rounded-xl' placeholder='Please enter your email' required />
            </div>

            <div className='flex flex-col gap-4 mt-2'>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" onChange={handleChange} className='border border-gray-400 p-2 w-full rounded-xl' placeholder='Please enter your password' required />
            </div>

            <div className='flex flex-col gap-4 mt-2'>
              <label htmlFor="password_confirmation">Password Confirmation</label>
              <input type="password" name="password_confirmation" onChange={handleChange} className='border border-gray-400 p-2 w-full rounded-xl' />
            </div>


            <p className='text-gray-500 text-xs mt-4'>Already have an account? {" "}</p>
            <span className="text-blue-800 cursor-pointer" onClick={() => navigate("/login")}>Log in</span>

            <button className="bg-blue-900 text-white p-2 w-full rounded-xl mt-4 cursor-pointer" onClick={handleSubmit} disabled={loading}>Register</button>
          </div>
        </div>


      </div>
    </>
  )
}