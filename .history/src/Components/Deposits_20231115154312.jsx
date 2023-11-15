import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
// import Title from './Title';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import GaugeChart from './GaugeChart';


function preventDefault(event) {
  event.preventDefault();
}
const Title = styled(Typography)(({ theme }) => ({
  fontSize: "13px",
  color: "#042A57",
  fontWeight: "bold",
  textAlign: "left",
  margin: theme.spacing(4, 0, 4, 0),
  [theme.breakpoints.down("sm")]: {
    fontSize: "20px",
  },
}))
export default function Deposits() {
  return (
    <React.Fragment>
<Title variant="h4" sx={{color: "#042A57"}}>
RETIREMENT SAVINGS PROGRESS 
            </Title>
            
            <div style={{
           display: 'inline-flex',
           alignItems: 'center', // Align items vertically in the center
           border: '0.5px solid #4B5162',
           paddingRight: '20px',
           paddingLeft: '20px',
           borderRadius: '30px'
    }}>
     
     
       <p >Who We Are</p>
        {/* <GaugeChart/> */}
    </div>
     
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
        </Link>
      </div>
    </React.Fragment>
  );
}