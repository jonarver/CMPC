import { useState,useEffect  } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


export const StandardImageList = (props) => {
  const [dataimagesBreeds, setDataImagesBreeds] = useState([{}]);
  
  useEffect(() => {   
    // Creamos una función para actualizar el estado 
    const set = () => {
      setDataImagesBreeds(props.dataimagesBreeds)
    }
    set()
    // Nos suscribimos al evento resize de window
    window.addEventListener("resize", set)
  })

  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {dataimagesBreeds.map((item) => (
        
        
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

