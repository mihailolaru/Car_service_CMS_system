// TODO use this for the search logic.
import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
    const dispatch = useDispatch();
    const { search } = useSelector((state) => ({ ...state }));
    //text is the property/state we included in the CMSSearchReducer.js
    const { text } = search;

    const history = useHistory();

    const handleChange = (e) => {
        dispatch({
            // This is the action name we defined in the CMSSearchReducer.js
            type: "SEARCH_QUERY",
            payload: { text: e.target.value },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/shop?${text}`);
    };

    return (
        <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
            <input
                onChange={handleChange}
                type="search"
                value={text}
                className="form-control mr-sm-2"
                placeholder="Search"
            />
            <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
        </form>
    );
};

export default Search;
