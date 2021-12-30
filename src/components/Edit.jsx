import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AxiosConfig from '../utils';
function AddList() {
  const [value, setvalue] = useState({
    id: '',
    title: '',
    marked: false,
    duedate: '',
  });
  const { id } = useParams();

  console.log('id ', id);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(value);
    if (value.title && value.marked && value.duedate) {
      const poyload = {
        title: value.title,
        duedate: value.duedate,
        marked: value.marked,
      };
      const result = await AxiosConfig.put('/update-todo/' + id, poyload);
      console.log('result ', result.data.success);
      if (result.data.success) {
        setvalue({ title: '', marked: false, duedate: '' });
        alert('data updated successfully');
      }
    } else {
      alert('all fields are required');
    }
  };

  const initialCall = async () => {
    const result = await AxiosConfig.get(`/get-todo/${id}`);
    if (result.data.success) {
      setvalue(result.data.data);
    }
  };

  // var curr2 =
  // curr2.setDate(curr.getDate());
  // var date2 = curr2.;

  useEffect(() => {
    initialCall();
  }, []);
  return (
    <div className="container m-5">
           <h2>Edit Todo</h2>

      <form action="container">
        <div class="mb-3">
          <label class="form-label">Enter title</label>
          <input
            name="title"
            type="text"
            value={value.title}
            onChange={(event) => {
              setvalue({ ...value, title: event.target.value });
            }}
            class="form-control"
            placeholder="title"
          />
        </div>

        <div class="form-check">
          <label class="form-check-label">marked</label>
          <input
            class="form-check-input"
            name="marked"
            checked={value.marked}
            onChange={(event) => {
              setvalue({ ...value, marked: event.target.checked });
            }}
            type="checkbox"
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Due Date</label>
          <input
            onChange={(event) => {
              setvalue({ ...value, duedate: event.target.value });
            }}
            name="duedate"
            type="date"
            value={value.duedate}
            class="form-control"
            placeholder="title"
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddList;
