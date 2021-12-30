import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosConfig from "../utils";

function App() {
  const [data, setData] = useState([{ title: "", marked: false, date: "" }]);

  console.log("data ", data);
  const navigation = useNavigate();

  const initialCall = async () => {
    const result = await AxiosConfig.get("/get-todos");
    if (result.data.success) {
      setData(result.data.data);
    }
  };

  const handledeleteclick = async (id) => {
    const result = window.confirm("are you sure want to dell?");
    if (result) {
      const result = await AxiosConfig.delete("/delete/" + id);
      if (result.data.success) {
        const result = await AxiosConfig.get("/get-todos");
        if (result.data.success) {
          setData(result.data.data);
        }
      }
    }
  };

  useEffect(() => {
    initialCall();
  }, []);

  const handleClick = (id) => {
    navigation(`/${id}/edit`);
  };
  return (
    <div className="App">
      <div>
        <button
          onClick={() => {
            navigation(`/add`);
          }}
          type="button"
          style={{ float: "right" }}
          class="btn btn-primary m-2"
        >
          Create Todo
        </button>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Marked</th>

            <th scope="col">Due Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length !== 0 ? (
            data.map((data, index) => {
              return (
                <tr>
                  <th scope="row">{data.id}</th>
                  <td>{data.title}</td>
                  <td>{data.marked ? "selected" : "not selected"}</td>
                  <td>{data.duedate}</td>

                  <td>
                    <Link style={{ margin: "2px" }} to={`/${data.id}/edit`}>
                      Edit
                    </Link>
                    <button
                      onClick={() => handledeleteclick(data.id)}
                      className="btn btn-sm btn-primary"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <div className="text">No record found</div>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
