import IconButton from '@material-ui/core/IconButton';
import {Paper} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

const Gallery = (props) => { //Компонент галереи // images={GalleryState} galleryCallBack={deleteImgCallback}
    const _scale = 130; //Подбираем масштаб
    const listItems = props.images.GalleryArray.map(( _image, index ) => {//Парсим список изображений полученный в пропсах
        const aspect = _image.width/_image.height;
        return(
            <li key={ index.toString() } className="gallery__item" style={{width: _scale*aspect+'px', flexGrow: aspect}}>                      
                <img src={ _image.url } className="gallery__thumb" onLoad={console.log('loaded')} />
                <IconButton  className="gallery__button" aria-label="directions" onClick={() => {props.galleryCallBack(index);}}>
                    <CancelIcon /> 
                </IconButton>

            </li>
        );
        }
    );

    return (
        <div>
            <h2>Галерея</h2>
            <Paper>
                <ul className="gallery">
                    { listItems }
                </ul>
            </Paper>
        </div>
        
    );

}

export default Gallery;