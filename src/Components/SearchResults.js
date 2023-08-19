import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import LeftNav from "./LeftNav";
import NavBar from "./NavBar";
import "./searchresults.css";

function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTitle = queryParams.get("title");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    function getSearchResult() {
      fetch(
        `http://sefdb02.qut.edu.au:3000/movies/search?title=${searchTitle}`
      )
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data.data);
        })
        .catch((error) => {
          alert(`Error: ${error.message}`);
        });
    }
    getSearchResult();
  }, [searchTitle]);

  const navigate = useNavigate();

  const columnDefs = [
    {
      headerName: "Title",
      field: "title",
      cellRenderer: "titleCellRenderer",
    },
    { headerName: "Year", field: "year" },
    { headerName: "IMDB Rating", field: "imdbRating" },
    { headerName: "Rotten Tomatoes Rating", field: "rottenTomatoesRating"},
    { headerName: "Metacritic Rating", field: "metacriticRating" },
    { headerName: "Classification", field: "classification" },
    { headerName: "IMDB ID", field: "imdbID", hide: true },
  ];

  const titleCellRenderer = (params) => {
    const handleClick = () => {
      navigate(`/movie/${params.data.imdbID}`);
    };

    return (
      <div className="title-cell" onClick={handleClick}>
        {params.data.title}
      </div>
    );
  };

  return (
    <div className="search-results">
      <NavBar />
      <LeftNav />
      <div className="search-results-content">
        <h1>Search Results for "{searchTitle}"</h1>
        {searchResults.length > 0 ? (
          <div className="ag-theme-alpine-dark" style={{ height: "100%", width: "100%" }}>
            <AgGridReact
              rowData={searchResults}
              columnDefs={columnDefs}
              rowHeight={100}
              onFirstDataRendered={(params) => params.api.sizeColumnsToFit()}
              headerHeight={60}
              defaultColDef={{
                sortable: true,
                filter: true,
                resizable: true,
              }}
              frameworkComponents={{ titleCellRenderer }}
              onCellClicked={(params) => {
                if (params.colDef.field === "title") {
                  params.event.stopPropagation();
                }
              }}
            />
          </div>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
