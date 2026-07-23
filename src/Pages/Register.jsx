import { useState } from "react";

function Register() {

  const [user,setUser]=useState({
    name:"",
    email:"",
    password:"",
  });

  const handleChange=(e)=>{

    setUser({
      ...user,
      [e.target.name]:e.target.value,
    });

  };

  const handleSubmit=(e)=>{
    e.preventDefault();

    console.log(user);
  };

  return(

<div className="min-h-screen flex justify-center items-center bg-gray-100">

<form
onSubmit={handleSubmit}
className="bg-white p-10 rounded-xl shadow-xl w-96"
>

<h1 className="text-3xl font-bold text-center mb-8">
Register
</h1>

<input
type="text"
name="name"
placeholder="Name"
className="w-full border p-3 mb-4 rounded"
onChange={handleChange}
/>

<input
type="email"
name="email"
placeholder="Email"
className="w-full border p-3 mb-4 rounded"
onChange={handleChange}
/>

<input
type="password"
name="password"
placeholder="Password"
className="w-full border p-3 mb-6 rounded"
onChange={handleChange}
/>

<button
className="bg-blue-600 w-full text-white py-3 rounded"
>

Register

</button>

</form>

</div>

  );
}

export default Register;