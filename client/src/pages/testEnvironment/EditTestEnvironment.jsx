import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ButtonPreloader from "../../components/ButtonPreloader";
import DefaultLayout from "../../components/DefaultLayout";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import axios from "../../sevices/axios";
import { toast } from "react-toastify";

function EditTestEnvironment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [testEnvironment, setTestEnvironment] = useState({
    operatingsystem: "",
    description: "",
    browser: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTestEnvironment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // Getting Query From URL
  let search = useLocation().search;
  const id = new URLSearchParams(search).get("edit");

  // To Get Current Details
  useEffect(() => {
    axios.get(`/testenvironment/?edit=${id}`).then((response) => {
      setTestEnvironment(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`/testenvironment/${id}`, {
        operatingsystem: testEnvironment?.operatingsystem,
        description: testEnvironment?.description,
        browser: testEnvironment?.browser,
      })
      .then((res) => {
        toast.success(res.data);
        setLoading(false);
        navigate("/test_environment", { replace: true });
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
  };

  return (
    <DefaultLayout>
      <div className="p-6 h-screen">
        <div
          className={`lg:mx-24 xl:mx-64 mt-4 xl:mt-0 px-12 flex flex-col justify-center items-center bg-white py-12 rounded-md`}
        >
          <h1 className="font-semibold text-2xl">Edit Enviroment Variable</h1>
          <h2 className="text-sm">
            Create the enviroment variable first. Then combine multiple variable
            values to create a configuration
          </h2>

          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div>
                <Input
                  placeholder={"Windows"}
                  label={"Operating System"}
                  name={"operatingsystem"}
                  type="text"
                  onchange={handleChange}
                  defaultValue={testEnvironment?.operatingsystem}
                />
                <p className="text-gray-400 text-sm">
                  set the name of the variable
                </p>
              </div>

              <div>
                <TextArea
                  label={"Description"}
                  name="description"
                  onchange={handleChange}
                  defaultValue={testEnvironment?.description}
                />
                <p className="text-gray-400 text-sm">Describe your variable</p>
              </div>

              <div>
                <Input
                  placeholder={"chrome"}
                  label={"Browser"}
                  name={"browser"}
                  type="text"
                  onchange={handleChange}
                  defaultValue={testEnvironment?.browser}
                />
                <p className="text-gray-400 text-sm">Set the browser</p>
              </div>
              <div className="flex justify-end items-center gap-12 mt-4 text-sm">
                <Link
                  to={"/test_environment"}
                  className="bg-red-600 px-4 py-2 text-white rounded-sm hover:bg-red-700 cursor-pointer"
                >
                  Cancel
                </Link>
                <button className="bg-green-600 px-4 py-2 text-white rounded-sm hover:bg-green-900">
                  {loading ? <ButtonPreloader /> : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default EditTestEnvironment;
