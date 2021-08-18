import React, { useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createCarFunction } from "../../../functions/callsToCarRoutes";
import CarCreateForm from "../../../components/formComponents/carFormsComponents/CarCreateForm";
import FileUpload from "../../../components/formComponents/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

//Cars DB API: https://parse-dashboard.back4app.com/apps/7e730946-c9c1-4aca-90f3-87f9abc2842c/browser/Carmodels_Car_Model_List
//https://www.back4app.com/docs/react/quickstart

const initialState = {
  brand: [],
  model: "Car model",
  registrationPlate: "999999",
  revisions: [],
  km: "",
  year: [],
  client: "client name",
  referenceToClient: "client id"
};

const CarCreatePage = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // GEt the user from Redux Store
  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = (e) => {
    e.preventDefault();
    createCarFunction(values, user.token)
      .then(() => {
        window.alert( "Car added is created" );
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    //Dynamically update each of the initialState values by their name parameter.
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCarBrandChange = (e) => {
    e.preventDefault();
    console.log("Clicked car brand: ", e.target.value);
    setValues({ ...values, brand: e.target.value });
  };  

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Add new vehicle:</h4>
          )}
          <hr />    

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <CarCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCarBrandChange={handleCarBrandChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CarCreatePage;
