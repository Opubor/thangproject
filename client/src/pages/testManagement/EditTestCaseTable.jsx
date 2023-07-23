import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import ButtonPreloader from "../../components/ButtonPreloader";
import Input from "../../components/Input";
import axios from "../../sevices/axios";

function EditTestCaseTable({ styles }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useState([]);

  // Getting Query From URL
  let search = useLocation().search;
  const id = new URLSearchParams(search).get("edit_table");
  const currentTable = new URLSearchParams(search).get("table");

  // To Get Current Details
  useEffect(() => {
    if (id) {
      axios.get(`/testcasetable/?edit=${id}`).then((response) => {
        setTable(response.data);
        console.log(response?.data);
      });
    }
  }, []);

  const handleSubmit = (values, actions) => {
    setLoading(true);
    axios
      .put(`/testcasetable/${id}`, {
        tablename: values?.tablename,
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
        <h1 className="text-center text-lg font-semibold">
          Rename {currentTable}
        </h1>
        <Formik
          enableReinitialize={true}
          initialValues={{
            tablename: table?.tablename,
          }}
          validateOnMount
          validationSchema={Yup.object().shape({
            tablename: Yup.string().required("Required field"),
          })}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <div className="mt-4">
                  <label className="font-semibold">Table Name</label>
                  <Field
                    className="block bg-gray-50 border border-gray-200 rounded-md p-2 w-full"
                    name={"tablename"}
                    type="text"
                  />
                  <ErrorMessage
                    component="label"
                    name="tablename"
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
                    className={` px-4 py-2 text-white rounded-sm hover:bg-green-900 ${
                      formik.isValid
                        ? "bg-green-600"
                        : "bg-gray-500 hover:bg-gray-700 cursor-not-allowed"
                    }`}
                    type="submit"
                    disabled={!formik.isValid}
                  >
                    {loading ? <ButtonPreloader /> : "Submit"}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default EditTestCaseTable;
