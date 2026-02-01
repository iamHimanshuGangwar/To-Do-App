import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react';

function App() {

  const [text, setText] = useState('');
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  // Add item
  function change() {
    if (text.trim() === '') return;

    let a = [...items, text];
    setItems(a);

    localStorage.setItem("myarr", JSON.stringify(a));
    setText('');
  }

  // Delete item
  function del(e) {
    let index = e.target.parentElement.id;

    let a = [...items];
    a.splice(index, 1);

    setItems(a);
    localStorage.setItem("myarr", JSON.stringify(a));
  }

  // Load data from localStorage
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("myarr")) || [];
    setItems(data);
    setFilteredItems(data);
  }, []);

  // Search functionality using useEffect
  useEffect(() => {

    let result = items.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredItems(result);

  }, [search, items]);

  return (
    <>
      <div className='container-fluid bg-primary text-white p-3'>
        <h1>To Do List</h1>
      </div>

      <div className='container bg-warning p-2'>

        {/* Add Note Input */}
        <input
          type="text"
          className="form-control m-1"
          placeholder='Enter your message'
          value={text}
          onChange={e => setText(e.target.value)}
        />

        <input
          type="button"
          className='btn btn-primary text-white m-1'
          value="Add Note"
          onClick={change}
        />

        {/* Search Input */}
        <input
          type="text"
          className="form-control m-1"
          placeholder='Search...'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {/* Show Items */}
        <div>
          {filteredItems.map((ele, index) => (
            <div
              key={index}
              id={index}
              className='bg-success justify-content-between d-flex m-1 p-1 text-white'>
              {ele}

              <input
                type="button"
                onClick={del}
                className='btn btn-danger m-1'
                value="X"
              />
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default App;
