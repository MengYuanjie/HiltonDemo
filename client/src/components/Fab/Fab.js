import React, { useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AddClient from '../Reservation/AddClient';


const FabButton = () => {

  const location = useLocation()
  const mainButtonStyles = { backgroundColor: '#1976D2' }
  const [open, setOpen] = useState(false)
  const history = useHistory();



  return (
    <div>
      <AddClient setOpen={setOpen} open={open} />
      <Fab
        mainButtonStyles={mainButtonStyles}
        icon={<AddIcon />}
        alwaysShowTitle={true}
      >

        {location.pathname !== '/reservation' && (
          <Action
            text="New Reservation"
            onClick={() => history.push('/reservation')}
          >
            <CreateIcon />
          </Action>
        )}

        <Action
          text="New Customer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <PersonAddIcon />
        </Action>

      </Fab>
    </div>
  )
}

export default FabButton
