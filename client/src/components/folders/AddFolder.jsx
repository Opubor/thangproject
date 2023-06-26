import React, { useState } from "react";
import { toast } from "react-toastify";
import ButtonPreloader from "../ButtonPreloader";
import Input from "../Input";
import axios from "../../sevices/axios";

function AddFolder({ styles, cancelButton }) {
  const [loading, setLoading] = useState(false);
  const [folder, setFolder] = useState({
    foldername: "",
  });
  function handleChange(e) {
    setFolder((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/folder", {
        foldername: folder?.foldername,
      })
      .then((res) => {
        toast.success(res.data);
        setLoading(false);
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err.response?.data);
        setLoading(false);
      });
  };
  return (
    <div
      className={`bg-black bg-opacity-70 absolute z-50 left-0 right-0 top-0 flex justify-center items-center h-screen ${styles}`}
    >
      <div className="bg-white p-8 w-3/12 rounded-md">
        <h1 className="text-center text-lg font-semibold">Add Folder</h1>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <Input
              placeholder={"Folder 1"}
              label={"Folder Name"}
              name={"foldername"}
              type="text"
              onchange={handleChange}
            />
          </div>
          <div className="flex justify-center items-center gap-12 mt-8">
            <span
              onClick={cancelButton}
              className="bg-red-600 px-4 py-2 text-white rounded-md hover:bg-red-700 cursor-pointer"
            >
              Cancel
            </span>
            <button className="bg-green-600 px-4 py-2 text-white rounded-md hover:bg-green-900">
              {loading ? <ButtonPreloader /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFolder;
