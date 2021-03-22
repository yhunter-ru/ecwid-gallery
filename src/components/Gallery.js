const Gallery = (props) => {
    console.log(props.images.GalleryArray);
    const listItems = props.images.GalleryArray.map(( _image, index ) => //Парсим список полученный в пропсах
        <li key={ index.toString() } className="gallery__item">                      
            <img src={ _image.url } className="gallery__thumb" />
        </li>
    );

    return (
        <div>
            Gallery 
            <ul className="gallery">
                { listItems }
            </ul>
        </div>
        
    );

}

export default Gallery;