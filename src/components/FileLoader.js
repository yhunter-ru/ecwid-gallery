import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import DirectionsIcon from '@material-ui/icons/CloudDownload';



const FileLoader = (props) => {// В пропсах получем callback

  function fileLoad() {// Исполняем при клике на кнопку загрузки
      let fileUrl = document.getElementById('fileUrl').value;

      let testUrl = "https://www.yhunter.ru/temp/ecwid/gallery-images.json";
      testUrl = "https://don16obqbay2c.cloudfront.net/frontend-test-task/gallery-images.json";
      //testUrl = "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550746.jpg";
        
      console.log(fileUrl);
      //console.log(testUrl);
      props.loaderCallBack(testUrl); //Передаем url через callback
  }

  return (
    <div className="LoaderWrapper">
        <Paper component="form" className="FileLoader">
        <InputBase
            className="FileLoader__input"
            placeholder="URL картинки или JSON"
            id="fileUrl"
        />
        <Divider className="FileLoader__divider" orientation="vertical" />
        <IconButton color="primary" className="FileLoader__button" aria-label="directions" onClick={fileLoad}>
            <DirectionsIcon />
        </IconButton>
        </Paper>
        <div className="example">
            Например, https://www.yhunter.ru/temp/ecwid/gallery-images.json
        </div>
    </div>
  );

}

export default FileLoader;