import { useState,useEffect  } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import Button from '@mui/material/Button';
import { stepButtonClasses, Typography } from '@mui/material';

/**
 * Filter Component.
 * @ComboBox
 */

export const Filter = (props) => {
  /**
 * State.
 */
  const [breeds, setBreeds] = useState({data:{message:{}}});
  const [optionsBreeds, setOptionsBreeds] = useState([{}]);
  const [valueBreeds, setValueBreeds] = useState<string| null>('Select');
  const [optionsSubBreeds, setOptionsSubBreeds] = useState([{  label: 'Select'}]);
  const [valueSubBreeds, setValueSubBreeds] = useState<string| null>('Select');
  const [imagesBreeds, setImagesBreeds] = useState([{}]);
  const [isSubBreeds,setIsSubBreeds] = useState(true)
  const [disabledButom,setDisabledButom] = useState(true)

 /**
 *  Get list of breeds
 * @useEffect.
 */

  useEffect(
    () => {
      getBreeds()
    }, []
  );
/**
 *  format list of breeds
 * @formatDataBreeds.
 * @param {obj} 
 */
  const formatDataBreeds = (obj:{data:{message:{}}}) => {
    let arr:[{}] = [
      { label: 'Select'}
    ]
    for(const [key, value] of Object.entries(obj.data.message)){
      let opt = {
        label:key
      }      
      arr.push(opt)
    }
    setBreeds(obj)    
    setOptionsBreeds(arr)
  }
  /**
 *  format list of images
 * @formatArrImages.
 * @param {obj} 
 */
  const formatArrImages = (obj:{data:{message:{}}}) => {
    let arr:[{}] = []
    for(const [key, value] of Object.entries(obj.data.message)){
      let opt = {
        img:value
      }    
      arr.push(opt)
    }    
    props.setDataImagesBreeds(arr)  
  }
  /**
 *  format list of Subbreeds
 * @formatDataBreeds.
 * @param [] 
 */
  const formatDataSubBreeds = (arrSubBreeds:never[] | string[]) => {
    let arr:[{}] = [
      { label: 'Select'}
    ]
    arrSubBreeds.forEach(element => {
      let opt = {
        label:element
      }     
      arr.push(opt)
    });  
    setOptionsSubBreeds(arr)
  }

  /**
 *  Check if you have Subbreeds
 * @subBreedsOpt.
 * @param String
 */

  const subBreedsOpt = (newInputValue: {'label':string}|null) => {
    let arr:[{}] = [
      { label: 'SubBreeds'}
    ]    
    setDisabledButom(false)    
    for(const [key, value] of Object.entries(breeds.data.message)){      
     if (newInputValue?.label===key) {
      if (value.length>0) {
        setIsSubBreeds(false)
        formatDataSubBreeds(value)
      }else{
        setValueSubBreeds('Select')
        setIsSubBreeds(true)
      }
     }
    }    
  }
  /**
 *  Call api dog.ceo list breeds
 * @getBreeds.
 */

  const getBreeds = async () => {
    let url = `https://dog.ceo/api/breeds/list/all`;
    await axios.get(url)    
    .then(response=>{
      formatDataBreeds(response)
    })
    .catch(error => {
        console.log(error)
    })
  }
  /**
 *  Call api dog.ceo  breeds images
 * @getBreedsImage.
 */

  const getBreedsImage = async () => {
    let url=''
    if (!isSubBreeds && valueSubBreeds.label !=undefined) {
      url = `https://dog.ceo/api/breed/${valueBreeds.label}/${valueSubBreeds.label}/images`;
    }else{
      url = `https://dog.ceo/api/breed/${valueBreeds.label}/images`;
    }    
    await axios.get(url)    
    .then(response=>{
     formatArrImages(response)
    })
    .catch(error => {
        console.log(error)
    })
  }

return (
    
    <> 
    <Typography> Filter Breeds</Typography>
  <Autocomplete
    style={{margin:'10px'}}
    disablePortal
    id="breeds"
    options={optionsBreeds}
    sx={{ width: 300 }}
    renderInput={(params) => <TextField {...params} label="Breeds" />}
    value={valueBreeds}
    onChange={(event, newInputValue: {'label':string}|null) => {
      setValueBreeds(newInputValue)
      subBreedsOpt(newInputValue)
      
    }}
    
  />
  <Autocomplete
    style={{margin:'10px'}}
    disablePortal
    disabled= {isSubBreeds}
    id="sub-breeds"
    options={optionsSubBreeds}
    sx={{ width: 300 }}
    renderInput={(params) => <TextField {...params} label="Breeds" />}
    value={valueSubBreeds}
    onChange={(event, newInputValue: {'label':string}|null) => {
     
      setValueSubBreeds(newInputValue)
      subBreedsOpt(newInputValue)
         
    }}
    
  />
  <Button 
  disabled= {disabledButom}
  style={{margin:'10px'}}
  variant="contained" onClick={() => {
   
   getBreedsImage()
   
  }}>
      Buscar
    </Button>
  
    
    </>
  );
}

