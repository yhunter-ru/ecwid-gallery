import { useFetching } from "react-concurrent";

import { useState, useEffect } from 'react';

import './assets/scss/style.scss';

import FileLoader from './components/FileLoader';
import Gallery from './components/Gallery';

function App() {
  //Загрузка json хуками
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
        setData(myJson)
      });
  }
  //useEffect(()=>{
  //  getData()
  //},[])
  
  //Остальное 
  function getFileExtFromUrl(_url) { //Получаем расширение файла
    return decodeURI(_url.split('.').pop());
  }

  const urlCallback = (_url) => {//Callback для передачи в компонент загрузчика
    const _picExt = ["jpg", "jpeg", "png", "gif"]; //Допустимые расширения изображений    
    let _ext = getFileExtFromUrl(_url);
    let _state = GalleryState.GalleryArray;

    if (_picExt.indexOf(_ext) != -1) { //Если расширение файла входит в массив допустимых расширений изображений 
      _state.push({"url": _url}); //Добавляем картинку 
      SetGalleryState( //Вносим изменения в состояние галереи
        {
          GalleryArray: _state
        }
      );      
    }
    else {
      if (_ext === "json") {//Если расширение json - грузим его
        console.log('json');
        getData(_url);
        //const [data, loading] = useFetch(
        //  _url
        //);
      }
    }

    //console.log(GalleryState);
  } 

  const [GalleryState, SetGalleryState] = useState({ //Стейт формы добавления заведения
    GalleryArray: [
      {
        "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550746.jpg",
        "width": 640,
        "height": 426
      },
      {
        "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964007.jpg",
        "width": 1920,
        "height": 1200
      },
      {
        "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550739.jpg",
        "width": 640,
        "height": 426
      },
      {
        "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964009.jpg",
        "width": 436,
        "height": 650
      },
      {
        "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550740.jpg",
        "width": 600,
        "height": 400
      },
      {
        "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964008.jpg",
        "width": 509,
        "height": 339
      },
      {
        "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964011.jpg",
        "width": 900,
        "height": 450
      },
      {
        "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550755.jpg",
        "width": 480,
        "height": 640
      },
      {
        "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964013.jpg",
        "width": 472,
        "height": 640
      },
      {
        "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550745.jpg",
        "width": 640,
        "height": 425
      },
      {
        "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964014.jpg",
        "width": 240,
        "height": 320
      },
      {
        "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964016.jpg",
        "width": 540,
        "height": 337
      },
      {
        "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964020.jpg",
        "width": 1600,
        "height": 1000
      },
      {
        "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964010.jpg",
        "width": 1506,
        "height": 575
      },
      {
        "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550754.jpg",
        "width": 1280,
        "height": 1276
      },
      {
        "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964021.jpg",
        "width": 1280,
        "height": 800
      },
      {
        "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964012.jpg",
        "width": 787,
        "height": 787
      }
    ]        
  });



  return (
    <div className="App">
      <div className="wrapper">
        <FileLoader loaderCallBack={urlCallback} />
        <Gallery images={GalleryState} />   
      </div>
   
      
    </div>
  );
}

export default App;
