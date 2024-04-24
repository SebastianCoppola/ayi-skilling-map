//Mui:
import { Grid } from '@mui/material'

const CardBox = ({ children }) => {
    return (
        <Grid item xs={9} 
            sx={{
                marginTop: '30px',
                padding: '30px 40px 30px 25px',
                borderRadius: '15px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
            }}
        >
            { children }
        </Grid>
    )
}

export default CardBox