import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { mongoDBCreateCarFunction } from "../../functions/callsToCarRoutes";

// TODO implement the cascader.
/* Use the Ant cascader for cars select. https://ant.design/components/cascader/ */

//Cars DB API: https://parse-dashboard.back4app.com/apps/7e730946-c9c1-4aca-90f3-87f9abc2842c/browser/Carmodels_Car_Model_List
//https://www.back4app.com/docs/react/quickstart

const initialState = {
    brand: "brand",
    model: "model",
    licensePlate: "licensePlate",
    revisions: "revisions date",
    km: "99999",
    year: "9999",
    client: "Client",
};

export default function CarCreatePage( { history } ){
    const [ carParamsState, setCarParamsState ] = useState( initialState );
    const {
        brand,
        model,
        licensePlate,
        revisions,
        km,
        year,
        client
    } = carParamsState;

    // Get the user from Redux Store
    const { reduxStoreUser } = useSelector(( state) => ( { ...state }));

    const handleSubmit = async ( event ) => {
        event.preventDefault();
        console.log( "CarCreatePage() handleSubmit() worked!" );

        try {
            console.log( "carParamsState: ", carParamsState );
            mongoDBCreateCarFunction( reduxStoreUser.token, carParamsState ).then( () => {
                console.log( "mongoDBCreateCarFunction() worked in CarCreatePage.js" );
                toast.success( "Car added successfully." );
                history.push( "/cars_archive" );
            })
                .catch( ( error ) => {
                    console.log( "mongoDBCreateCarFunction() error: ", error );
                    toast.error( "Session expired. Please re-login in order to be able to perform this action." );
                //Logout logic.
                });
        } catch (error) {
            console.log( "mongoDBCreateCarFunction() in handleSubmit try catch error: ", error.message );
            toast.error("Error adding car: ", error.message );
        }
    };

    const handleUserInput = ( event ) => {
        // Dynamically update each of the initialState values by their name parameter.
        setCarParamsState({ ...carParamsState, [ event.target.name ] : event.target.value } );
    };

    return (
        <main>

            <h1>CarCreatePage.js</h1>

            <div className="container mx-auto py-20">
                <form onSubmit={ handleSubmit }>
                    {/*TODO Add here inputs from the database with cascader.*/}
                    <label className="block mb-8 text-xl max-w-600">
                        MARCA
                        <input
                            className="block container px-2 py-1 border outline-none rounded border-border mt-1.5"
                            type="text"
                            name="brand"
                            value={ brand }
                            onChange={ handleUserInput }
                        />
                    </label>

                    <label className="block mb-8 text-xl max-w-600">
                        MODELLO
                        <input
                            type="text"
                            className="block container px-2 py-1 border outline-none rounded border-border mt-1.5"
                            name="model"
                            value={ model }
                            onChange={ handleUserInput }
                        />
                    </label>

                    <label className="block mb-8 text-xl max-w-600">
                        TARGA
                        <input
                            className="block container px-2 py-1 border outline-none rounded border-border mt-1.5"
                            type="text"
                            name="licensePlate"
                            value={ licensePlate }
                            onChange={ handleUserInput }
                        />
                    </label>

                    <label className="block mb-8 text-xl max-w-600">
                        REVISIONE
                        <input
                            className="block container px-2 py-1 border outline-none rounded border-border mt-1.5"
                            type="text"
                            name="revisions"
                            value={ revisions }
                            onChange={ handleUserInput }
                        />
                    </label>

                    <label className="block mb-8 text-xl max-w-600">
                        KM
                        <input
                            className="block container px-2 py-1 border outline-none rounded border-border mt-1.5"
                            type="text"
                            name="km"
                            value={ km }
                            onChange={ handleUserInput }
                        />
                    </label>

                    <label className="block mb-8 text-xl max-w-600">
                        ANNO
                        <input
                            className="block container px-2 py-1 border outline-none rounded border-border mt-1.5"
                            type="text"
                            name="year"
                            value={ year }
                            onChange={ handleUserInput }
                        />
                    </label>

                    <label className="block mb-8 text-xl max-w-600">
                        CLIENTE
                        {/*TODO consider adding live search algorithm from the clients database.*/}
                        <input
                            className="block container px-2 py-1 border outline-none rounded border-border mt-1.5"
                            type="text"
                            value={ client }
                            name="client"
                            onChange={ handleUserInput }
                        />
                    </label>

                    <div className="flex justify-end">
                        <button
                            className="flex items-center text-xl text-white bg-green uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70"
                            type="submit"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"> </path>
                            </svg>
                            Salva
                        </button>
                    </div>
                </form>
            </div>

        </main>
    );
}