import React, { useState } from "react";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "../sevices/axios";
import ButtonPreloader from "./ButtonPreloader";

function DeleteButton({ path, id, record, children }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    confirmAlert({
      title: "Are you sure you want to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            axios.delete(`/${path}/${id}`).then((res) => {
              setLoading(false);
              record();
              toast.success(res.data);
            }),
        },
        {
          label: "No",
          onClick: () => setLoading(false),
        },
      ],
    });
  };

  return (
    <button
      // className="inline-flex items-center justify-center rounded-md bg-danger py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-4"
      onClick={handleDelete}
    >
      {loading ? <ButtonPreloader /> : [children]}
    </button>
  );
}

export default DeleteButton;
