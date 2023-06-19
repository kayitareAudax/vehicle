import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

const New = () => {
  const [loading, setLoading] = useState(false);
  const [laptops, setLaptops] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [laptop, setLaptop] = useState("");
  const navigator=useNavigate()
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  const fetchLaptops = async () => {
    const res = await axios.get("/laptop", config);
    setLaptops(res.data.laptops);
  };
  useEffect(() => {
    fetchLaptops();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        console.log(laptop);
      const response = await axios.post(
        `/employee`,
        {
          firstName,
          lastName,
          nationalId,
          telephone,
          email,
          department,
          position,
          laptop,
        },
        config
      );

      if (response.data.success) {
        toast.success("Employee registered successfully");
        return navigator("/dashboard")
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("An error occurred");
    }

    setLoading(false);
  };

  return (
    <div className="pb-12">
      <ToastContainer />
      <div className="flex flex-col items-center mt-8   mx-auto py-8 px-16">
        <h1 className="font-black text-black mb-4 text-xl">
          Employee Registration
        </h1>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-2 mb-6 iphone:w-full">
              <input
                type="text"
                id="firstName"
                className="w-full px-6 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="w-1/2 iphone:w-full px-2 mb-6">
              <input
                type="text"
                id="lastName"
                className="w-full px-6 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="w-1/2 px-2 iphone:w-full mb-6">
              <input
                type="text"
                id="nationalId"
                className="w-full px-6 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
                placeholder="National ID"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
              />
            </div>

            <div className="w-1/2 px-2 iphone:w-full mb-6">
              <input
                type="text"
                id="telephone"
                className="w-full px-6 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
                placeholder="Telephone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </div>

            <div className="w-1/2 px-2 iphone:w-full mb-6">
              <input
                type="text"
                id="email"
                className="w-full px-6 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="w-1/2 px-2 iphone:w-full mb-6">
              <input
                type="text"
                id="department"
                className="w-full px-6 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>

            <div className="w-1/2 px-2 iphone:w-full mb-6">
              <input
                type="text"
                id="position"
                className="w-full px-6 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
                placeholder="Position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>

            <div className="w-1/2 px-2  iphone:w-full mb-6">
              <select
                id="laptop"
                className="w-full px-6 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
                value={laptop}
                onChange={(e) => setLaptop(e.target.value)}
              >
                <option value="">Select a Laptop</option>
                {laptops.map((laptop) => (
                  <option key={laptop.id} value={laptop.id}>
                    {laptop.manufacturer}-{laptop.model}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-[30%] mb-6 iphone:w-full flex justify-center bg-mainColor mx-auto text-sm px-4 py-3 text-white  rounded-3xl hover:bg-red-500"
            disabled={loading}
          >
            {loading ? "Registering employee..." : "Register Employee"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default New;
