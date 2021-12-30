import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AxiosConfig from '../utils';
function AddList() {
  const [value, setvalue] = useState({
    id: '',
    title: '',
    marked: false,
    date: '',
  });
  const { id } = useParams();

  console.log('id ', id);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(value);
    if (value.title && value.marked && value.date) {
      const poyload = {
        title: value.title,
        duedate: value.date,
        marked: value.marked,
      };
      const result = await AxiosConfig.put('/update-todo/' + id, poyload);
      console.log('result ', result.data.success);
      if (result.data.success) {
        setvalue({ title: '', marked: false, date: '' });
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

  useEffect(() => {
    initialCall();
  }, []);
  return (
    <div className="container m-5">
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
              setvalue({ ...value, date: event.target.value });
            }}
            name="date"
            type="date"
            value={value.date}
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
