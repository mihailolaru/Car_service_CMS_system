import React, {useState} from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ClientCreateForm from "../../components/forms/carFormsComponents/CarCreateForm";
import { useSelector } from "react-redux";
import { createClientFunction } from "../../functions/callsToClientRoutes";
import CarCreateForm from "../../components/forms/carFormsComponents/CarCreateForm";

// TODO implement the cascader.
/* Use the the Ant cascader for cars select. https://ant.design/components/cascader/ */

//Cars DB API: https://parse-dashboard.back4app.com/apps/7e730946-c9c1-4aca-90f3-87f9abc2842c/browser/Carmodels_Car_Model_List
//https://www.back4app.com/docs/react/quickstart

const initialState = {
    brand: "Car brand",
    model: "Car model",
    registrationPlate: "999999",
    revisions: "Revisions info",
    km: "999",
    year: "9999",
    client: "Client name",
    referenceToClient: "Client id"
};

export default function AddClientPage() {
    const [clientInfoState, setClientInfoState] = useState(initialState);

    // Get the user from Redux Store
    const { user } = useSelector((state) => ({ ...state }));

    const handleSubmit = (event) => {
        event.preventDefault();
        createClientFunction(clientInfoState, user.token)
            .then(() => {
                window.alert( "New client added." );
                window.location.reload();
            })
            .catch((error) => {
                toast.error(error.response.data.err);
            });
    };

    const handleUserInput = (event) => {
        // Dynamically update each of the initialState values by their name parameter.
        setClientInfoState({ ...clientInfoState, [event.target.name]: event.target.value });
    };

  return (  
    <>
      <label className='block mb-2 text-xl' style={{float: "right", paddingRight: "10px"}}>
        <Link to="/add_service">Click to go to &rArr; Add Service Page </Link>
      </label>   
       <h1>AddClientPage.js</h1>

        <ClientCreateForm
            handleSubmit={handleSubmit}
            handleUserInput={handleUserInput}
            clientInfoState={clientInfoState}
            setClientInfoState={setClientInfoState}
        />


      </>
  );
}