import React from 'react'
import Grid from '@material-ui/core/Grid';

import StudentCard from '../../components/cards/studentcard'
import TeacherCard from '../../components/cards/teachercard'

const selectrole = () => {
    return (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          >
          <h1>Select Role</h1>

          <Grid
          container 
          spacing={8}
          direction="row"
          justify="center"
          alignItems="center"
          >
          <Grid item xs={12} sm={6} md={4}>
          <StudentCard/>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
          <TeacherCard/>
          </Grid>
          </Grid>
        
          </Grid>

       
    )
}

export default selectrole
