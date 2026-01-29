
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react';


function App() {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);
  function change(){
    if(text.trim() === '') return;
    let a=[...items,text]
    setItems(a)
    localStorage.setItem("myarr",JSON.stringify(a))
    setText('')
  }
  function del(e)
  {
    let index=e.target.parentElement.id
    let a=[...items]
    a.splice(index,1)
    setItems(a)
    localStorage.setItem("myarr",JSON.stringify(a))
  }
  useEffect(()=>{
    setItems(JSON.parse(localStorage.getItem("myarr")))
  },[])
  return (
      <>
  <div className='container-fluid bg-primary text-white p-3'> 
    <h1>To Do List</h1>
  </div>
  <div className='container bg-warning p-1'>
    <input type="text" className="form-control m-1" placeholder='enter your meassage' id='text1' value={text} onChange={e=>setText(e.target.value)} />
    <input type="button" className='btn btn-primary text-white m-1' value="add note" onClick={change} />
    <div>
      {items.map((ele, index) =>
      <div id={index} className='bg-success justify-content-between d-flex m-1 p-1 text-white'>
        {ele} <input type="button" onClick={del} className='btn btn-danger m-1' value="X" />
      </div>
    )}
    </div>
  </div>
      </>
  );
};

export default App;
