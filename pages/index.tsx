import { useState,useEffect  } from 'react';
import type { NextPage } from 'next';
import { Card, CardContent, CardHeader, Grid } from '@mui/material';

import { Layout } from '../components/layouts';
import { ComboBox, StandardImageList} from '../components/ui';

const HomePage: NextPage = () => {

  // console.log(process.env.NEXT_PUBLIC_CLIENT_KEY);
  // console.log(process.env.SECRET_KEY);
  const [dataimagesBreeds, setDataImagesBreeds] = useState([{'img':'https://dog.ceo/img/dog-api-logo.svg'}]);
    


  return (
    <Layout title='Home - OpenJira'>
      
      <Grid container spacing={ 2 }>
        <Grid item xs={ 12 } sm={ 4 }> 
          <ComboBox setDataImagesBreeds={setDataImagesBreeds}/>
        </Grid>

        <Grid item xs={ 12 } sm={ 4 }> 
          <StandardImageList dataimagesBreeds={dataimagesBreeds}/>
        </Grid>



      </Grid>

    </Layout>
  )
}

export default HomePage;