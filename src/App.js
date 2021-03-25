import Dropzone from 'react-dropzone';

import { useState} from 'react';

import './assets/scss/style.scss';

import FileLoader from './components/FileLoader';
import Gallery from './components/Gallery';

function App() {
  
  //Загрузка json 
  const [data,setData]=useState([]);
  const getData=(_url)=>{//Загрузка json
    fetch(_url,
      {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function(response){
        //console.log(response)
        return response.json();
      })
      .then(function(myJson) {

        let _state = [...GalleryState.GalleryArray, ...myJson.galleryImages]; //Добавляем список картинок
        SetGalleryState( //Вносим изменения в состояние галереи
          {
            GalleryArray: _state
          }
        );  
        setData(myJson);
      });
  };  
  
  function getFileExtFromUrl(_url) { //Получаем расширение файла
    return decodeURI(_url.split('.').pop());
  }

  const urlCallback = (_url) => {//Callback для передачи из компонента строки загрузчика
    const _picExt = ["jpg", "jpeg", "png", "gif"]; //Допустимые расширения изображений    
    let _ext = getFileExtFromUrl(_url);

    if (_picExt.indexOf(_ext) != -1) { //Если расширение файла входит в массив допустимых расширений изображений 
      addPicture(null, _url);   
    }
    else {
      if (_ext === "json") {//Если расширение json - грузим его
        getData(_url);
      }
    }

  };

  const deleteImgCallback = (_img) => { //Удаление картинки из галереи по индексу _img
    GalleryState.GalleryArray.splice(_img, 1);
    SetGalleryState( //Вносим изменения в состояние галереи
      {
        GalleryArray: GalleryState.GalleryArray
      }
    );
  };

  const addPicture = (_file=null, _url=null) => {//Функция добавления картинки (_file - загруженной перетаскиванием или по _url)
    let _state = GalleryState.GalleryArray; 
    const image = new Image();
      image.addEventListener('load', () => { //Определяем размеры картинки

          _state.push({"url": image.src, "width": image.width, "height": image.height}); //Добавляем картинку
          SetGalleryState( //Вносим изменения в состояние галереи
            {
              GalleryArray: _state
            }
          );
      });
      if (_url===null) {
        image.src = URL.createObjectURL(_file);
      }
      else {
        image.src = _url;
      }
      
    
  };

  const dragNdropAdd = (_newPics) => { //Добавление картинок перетаскиванием на галерею
    _newPics.map(file => {
        addPicture(file);      
    });  
  };

  const [GalleryState, SetGalleryState] = useState({ //Стейт галереи
    GalleryArray: []        
  });


  return (
    <div className="App">
      <div className="wrapper">
        <FileLoader loaderCallBack={urlCallback} />
        <Dropzone accept={"image/*"} noClick={true} onDrop={acceptedFiles => dragNdropAdd(acceptedFiles)}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Gallery images={GalleryState} galleryCallBack={deleteImgCallback} /> 
                <div className="example">
                  Перетащите изображения на галерею для добавления
                </div> 
              </div>
            </section>
          )}
        </Dropzone>
         
      </div>
   
      
    </div>
  );
}

export default App;
