//TODO Finish the page.
import React, {useEffect, useState} from "react";
import ClientPhoto from "../../images/usr_avatar.png";
import { mongoDBGetCurrentUserFunction } from "../../functions/callsToAuthRoutes";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { mongoDBDeleteUserFunction } from "../../functions/callsToAdminRoutes";

export default function AdminSingleUserPage( { history, match } ) {
    console.log("AdminSingleUserPage() worked");
    const initialState = {
        _id: "",
        company_name: "loading...",
        current_residence: "loading...",
        current_city: "loading...",
        current_province: "loading...",
        official_residence: "loading...",
        official_city: "loading...",
        official_province: "loading...",
        fiscal_code: "loading...",
        email: "loading...",
        images: [
            {
                public_id: "loading...",
                url: "loading...",
            },
        ],
    };

    const [ userInfo, setUserInfo ] = useState( initialState );
   
    const{
        _id,
        company_name,
        current_residence,
        current_city,
        current_province,
        official_residence,
        official_city,
        official_province,
        fiscal_code,
        email,
        images,
    } = userInfo;

    //console.log( "match.params", match.params );

    const { reduxStoreUser } = useSelector( ( state ) => ( { ...state } ) );
    const { slug } = match.params;

    const getUserInfo = () => {
        mongoDBGetCurrentUserFunction( reduxStoreUser.token, slug )
            .then( ( res ) => {
                // Add data to the React Store.
                if ( res.data!==null ){
                    setUserInfo( res.data );
                    console.log( "LoginPage.js mongoDBGetCurrentUserFunction() response: ", JSON.stringify( res ) );
                } else {
                    toast.error( "Could not find user info in the mongoDB database. Unable to proceed" );
                };
            } ).catch( ( err ) => {
                console.log( "Login page get user info error: ", err );
                toast.error( `Login page get user info error: ${ err }` );
            } );
    };

    const deleteUserFromDB = ( id, email ) => {
        console.log("deleteUserFromDB() worked");
        mongoDBDeleteUserFunction( id, email, reduxStoreUser.token )
            .then( () => {
                toast.success( `User with ${email} removed successfully. Do not forget to delete the user from the Firebase admin dashboard.` );
                //history.push("admin_dashboard");
            } )
            .catch( err => toast.error( "deleteUserFromDB() err: ",  err ) );
    };

    useEffect( () => {
        getUserInfo();
        // eslint-disable-next-line
    }, [] );

    return(
        <main>
            <div className="container mx-auto py-20">
                <center><span style={{fontWeight: "bold", fontSize: "25px"}}>USER</span></center>

                <div className="bg-grayL shadow-shadow rounded p-12">
                    <div className="flex mb-20">
                        <div className="w-400 h-auto border border-border rounded-md mr-6">
                            { images.map( ( image ) => ( <img className="" src={ image.status==="default" ? ClientPhoto : image.url } alt=""/> ) ) }
                        </div>
                        <ul>
                            <li className="text-xl text-black font-bold uppercase mb-4 bg-white px-2">
                                Ragione sociale: <span className="font-normal text-text text-lg"> { company_name } </span>
                            </li>

                            <li className="mb-4 bg-white px-2">
                                <div className='text-xl text-black font-bold uppercase'>
                                    Sede Operativa: <span className='font-normal text-text text-lg'> { current_residence } </span>
                                </div>
                                <div className='text-base font-bold uppercase'>
                                    Citta: <span className='font-medium text-sm text-text'> { current_city } </span>
                                </div>
                                <div className='text-base font-bold uppercase'>
                                    Provincia: <span className='font-medium text-sm text-text'> { current_province } </span>
                                </div>
                            </li>

                            <li className="mb-4 bg-white px-2">
                                <div className="text-xl text-black font-bold">
                                    Sede Legale: <span>{ official_residence }</span>
                                </div>
                                <div className='text-base font-bold uppercase'>
                                    Citta: <span className='font-medium text-sm text-text'> { official_city } </span>
                                </div>
                                <div className='text-base font-bold uppercase'>
                                    Provincia: <span className='font-medium text-sm text-text'> { official_province } </span>
                                </div>
                            </li>

                            <li className='text-xl text-black font-bold uppercase mb-4 bg-white px-2'>
                                P. Iva: <span className='font-normal text-text text-lg'> { fiscal_code } </span>
                            </li>

                            <li className='text-xl text-black font-bold uppercase mb-4 bg-white px-2'>
                                EMAIL: <span className='font-normal text-text text-lg'> { email } </span>
                            </li>

                        </ul>
                    </div>
                    <div className='flex justify-end'>
                        <button
                            className='text-xl text-white bg-blue uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70'
                            onClick={ () => deleteUserFromDB( _id, email ) }

                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}