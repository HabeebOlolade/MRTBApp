import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import { fetchRegistrants } from "../../redux/thunks/registrant";
import RegistrantItem from "./RegistrantItem";
import { registrantStoreActions } from "../../redux/slices/registrant";
import { AppDispatch, RootState } from "../../redux/store";
import { SortDirection, SortColumnName, IRegistrant } from "../../type/type";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";

export default function Registrants() {
  const dispatch = useDispatch<AppDispatch>();
  const registrantsState = useSelector((state: RootState) => state.registrants);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const itemsPerPageOptions = [10, 20, 30, 50];

  const sortMethodMap = {
    [`${SortDirection.ascending}`]: {
      method: (a: IRegistrant, b: IRegistrant) => {
        if (typeof a[`${registrantsState.sortColumnName}`] === "number") {
          return (
            Number(a[`${registrantsState.sortColumnName}`]) -
            Number(b[`${registrantsState.sortColumnName}`])
          );
        }
        if (
          a[`${registrantsState.sortColumnName}`] >
          b[`${registrantsState.sortColumnName}`]
        ) {
          return 1;
        } else {
          return -1;
        }
      },
    },
    [`${SortDirection.descending}`]: {
      method: (a: IRegistrant, b: IRegistrant) => {
        if (typeof a[`${registrantsState.sortColumnName}`] === "number") {
          return (
            Number(b[`${registrantsState.sortColumnName}`]) -
            Number(a[`${registrantsState.sortColumnName}`])
          );
        }
        if (
          a[`${registrantsState.sortColumnName}`] >
          b[`${registrantsState.sortColumnName}`]
        ) {
          return -1;
        } else {
          return 1;
        }
      },
    },
  };

  useEffect(() => {
    dispatch(fetchRegistrants());
  }, [dispatch]);

  const registrantsMap = [...registrantsState.registrants]
    .sort(sortMethodMap[registrantsState.sortDirection]?.method)
    .slice(pageNumber * itemsPerPage - itemsPerPage, pageNumber * itemsPerPage)
    .map((p: IRegistrant) => <RegistrantItem registrant={p} key={p.id} />);

  const emptyState = <h1 style={{ color: "red" }}>No registrant found</h1>;

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");}

  return (
    <div>
      <div className="App_navbar">
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs maxItems={2} aria-label="breadcrumb">
            <Link to="/">
              <li>Home</li>
            </Link>

            <Link to="/favourite">
              <Badge color="secondary">
                <li>Registrants</li>
              </Badge>
            </Link>
          </Breadcrumbs>
        </div>
      </div>
      <div className="App_registrant">
        <h1>Physiotherapist</h1>
        <div className="form">
          <div className="sortForm">
            <p>Sort</p>
            <select
              onChange={(event) => {
                dispatch(
                  registrantStoreActions.setSortColumn(
                    event.target.value as SortColumnName
                  )
                );
              }}
              value={registrantsState.sortColumnName}
              placeholder="sort"
            >
              {Object.values(SortColumnName).map((key) => (
                <option value={key} key={key}>
                  {key}
                </option>
              ))}
            </select>
            <select
              onChange={(event) => {
                dispatch(
                  registrantStoreActions.setSortDirection(
                    event.target.value as SortDirection
                  )
                );
              }}
              value={registrantsState.sortDirection}
              placeholder="sort"
            >
              {Object.values(SortDirection).map((key) => (
                <option value={key} key={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          <div className="searchForm">
            <input
              type="text"
              placeholder="search..."
              onChange={(event) => {
                dispatch(registrantStoreActions.searchItem(event.target.value));
              }}
            />
          </div>
        </div>

        {registrantsMap.length ? (
          <div className="registrantItems">
            <div className="registrant_item">
              <p>s/n</p>
              <p>image</p>
              <p>Name</p>
              <p>profession</p>
              <p>Reg. No</p>
              <p>Fisrt Reg.</p>
              <p>Reg Status</p>
              <p></p>
            </div>
            {registrantsMap}
          </div>
        ) : (
          emptyState
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "2vh" }}>
          <select
            onChange={(event) => {
              setItemsPerPage(event.target.value as unknown as number);
            }}
            placeholder="items per page"
          >
            {itemsPerPageOptions.map((key) => (
              <option value={key} key={key}>
                {key}
              </option>
            ))}
          </select>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={(event) => {
              setPageNumber(event.selected + 1);
            }}
            activeClassName={"item active"}
            breakClassName={"item break-me"}
            nextClassName={"item next"}
            previousClassName={"item previous"}
            disabledClassName={"disabled-page"}
            pageClassName={"item pagination-page"}
            containerClassName={"pagination"}
            pageRangeDisplayed={2}
            pageCount={Math.ceil(
              registrantsState.registrants.length / itemsPerPage
            )}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </div>
  );
}
