import React, { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form/Form';
import HexTile from './components/Hextile/HexTile.jsx';
import Modal from './components/Modal/Modal';

const App = () => {
  const [images, setImages] = useState();
  const [showModal, setModal] = useState(false);
  const [img, setImg] = useState();

  useEffect(() => {
    console.time('fetchImages'); // Start timer
    fetch('images?limit=10')
      .then(res => res.json())
      .then(data => {
        console.log('Success:', data);
        console.timeEnd('fetchImages'); // End timer
        setImages(data);
        setImg(data[0]);
      })
      .catch(error => {
        console.timeEnd('fetchImages'); // End timer
        console.error('Error:', error);
      });
  }, []);

  const showHideModal = (show, img) => {
    if(show) {
      setImg(img);
      document.getElementsByTagName('body')[0].classList.add('modal-open');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('modal-open');
    }
    setModal(show);
  };

  return (
    <div className="app">
      <div className="main">
        <div className="hexagon-container">
          {
            images && images.map(img => (
              <HexTile key={img.id} img={img} onClick={()=>{showHideModal(true, img)}} />
            ))
          }
        </div>
      </div>
      <Modal show={showModal} handleClose={()=>{showHideModal(false)}} img={img}/>
      <Form />
    </div>
  );
}

export default App;
