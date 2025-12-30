import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
export default function Buttons(){
return(
<div style={{display:"flex", justifyContent:"space-evenly"}}>
<Button
      component={Link}
      to="/dept"   
    sx={{ fontWeight: '500', color:"black" }}
>
    Department
</Button>
<Button
      component={Link}
      to="/emp"    
    sx={{ fontWeight: '500' , color:"black"}}
>
        Employee
    </Button>
    </div>
);
}
