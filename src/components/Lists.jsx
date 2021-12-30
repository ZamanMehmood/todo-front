import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  useEffect(() => {
    initialCall();
  }, []);

  const handleClick = (id) => {
    navigation(`/${id}/edit`);
  };
  return (
    <div className="App">
      <button
        onClick={() => {
          navigation(`/add`);
        }}
        type="button"
        style={{ float: "left" }}
        class="btn btn-primary m-2"
      >
        Create Todo
      </button>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Date</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => {
            return (
              <tr>
                <th scope="row">{data.id}</th>
                <td>{data.title}</td>
                <td>{data.marked ? "selected" : "not selected"}</td>
                <td onClick={() => handleClick(data.id)}>
                  <a>Edit</a>
                </td>
                <td>
                  <a>Delete</a>
                </td>
              </tr>
            );
            {
              /* <div>{data.title}</div>
                <div>{data.marked ? "selected" : "not selected"}</div> */
            }
            {
              /* <div>{data.date}</div> */
            }
            {
              /* </div> */
            }
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
