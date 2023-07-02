import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import ButtonPreloader from "../ButtonPreloader";
import Input from "../Input";
import axios from "../../sevices/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

function RenameFolder({ styles }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [folder, setFolder] = useState([]);

  // Getting Query From URL
  let search = useLocation().search;
  const id = new URLSearchParams(search).get("renamefolder");

  // To Get Current Details
  useEffect(() => {
    if (id) {
      axios.get(`/folders/?edit=${id}`).then((response) => {
        setFolder(response.data);
        console.log(response?.data);
      });
    }
  }, []);

  const handleSubmit = (values, actions) => {
    setLoading(true);
    axios
      .put(`/folder/${id}`, {
        foldername: values?.foldername,
      })
      .then((res) => {
        navigate("/test_management", { replace: true }),
          setLoading(false),
          window.location.reload(true),
          toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err.response?.data);
        setLoading(false);
      });
    actions.setSubmitting(false);
  };

  return (
    <div
      className={`bg-black bg-opacity-70 absolute z-50 left-0 right-0 top-0 flex justify-center items-center h-screen ${styles}`}
    >
      <div className="bg-white p-8 w-3/12 rounded-md">
        <h1 className="text-center text-lg font-semibold">Rename Folder</h1>
        <Formik
          enableReinitialize={true}
          initialValues={{
            foldername: folder?.foldername,
          }}
          validationSchema={Yup.object().shape({
            foldername: Yup.string().required("Required field"),
          })}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mt-4">
              <label className="font-semibold">Folder Name</label>
              <Field
                className="block bg-gray-50 border border-gray-200 rounded-md p-2 w-full"
                name={"foldername"}
                type="text"
              />
              <ErrorMessage
                component="label"
                name="foldername"
                className="text-sm text-red-500"
              />
            </div>

            <div className="flex justify-center items-center gap-12 mt-8">
              <Link
                to={"/test_management"}
                className="bg-red-600 px-4 py-2 text-white rounded-md hover:bg-red-700 cursor-pointer"
              >
                Cancel
              </Link>
              <button
                className="bg-green-600 px-4 py-2 text-white rounded-md hover:bg-green-900"
                type="submit"
              >
                {loading ? <ButtonPreloader /> : "Submit"}
              </button>
            </div>
          </Form>
        </Formik>
        {/* <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <Input
              label={"Folder Name"}
              name={"foldername"}
              type="text"
              onchange={handleChange}
              defaultValue={folder?.foldername}
            />
          </div>
          <div className="flex justify-center items-center gap-12 mt-8">
            <Link
              to={"/test_management"}
              className="bg-red-600 px-4 py-2 text-white rounded-md hover:bg-red-700 cursor-pointer"
            >
              Cancel
            </Link>
            <button className="bg-green-600 px-4 py-2 text-white rounded-md hover:bg-green-900">
              {loading ? <ButtonPreloader /> : "Submit"}
            </button>
          </div>
        </form> */}
      </div>
    </div>
  );
}

export default RenameFolder;
