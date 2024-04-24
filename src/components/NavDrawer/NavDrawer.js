//Mui:
import { Logout } from '@mui/icons-material'
import { Button, Grid, Typography } from '@mui/material'
//Nav:
import { useLocation, useNavigate } from 'react-router-dom'
//Assets:
import logoAyi from '../../assets/logos/ayigroup.png'

const NavDrawer = ({ rutas, user }) => {

    const navigate = useNavigate()
    const location = useLocation()

    return (
        <Grid 
            container
            direction='column'
            justifyContent='space-between'
            sx={{
                padding: '20px 20px',
                backgroundColor: '#1B4987', 
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                zIndex:'1000',
                height:'100vh'
            }}
        >
            <Grid container>
                <Grid container justifyContent='center'>
                    <img src={logoAyi} alt='logo-ayi' style={{width:'80%'}}/>
                </Grid>

                <Grid container direction='column' sx={{marginTop:'60px'}} gap={2}>
                    { rutas?.map((ruta, index) => (
                        <Typography
                            key={index}
                            onClick={()=>navigate(ruta.path)}
                            sx={{
                                cursor:'pointer', 
                                textTransform:'uppercase', 
                                color:'white', 
                                width:'100%',
                                boxSizing:'border-box',
                                padding:'5px 12px',
                                borderRadius:'5px',
                                border: location.pathname === ruta.path && '1px solid white',
                                background: location.pathname === ruta.path && '#80808080',
                                transition: 'all .6s ease-in-out',
                                ':hover':{
                                    background: '#80808080',
                                }

                            }}
                        >
                            {ruta.title}
                        </Typography>
                        
                    ))}
                </Grid>
            </Grid>

            <Grid container justifyContent='center' alignItems='center' gap={1}>            
                <Button 
                    onClick={()=>console.log('cerrar sesión')}
                    startIcon={<Logout />}
                    variant='outlined'
                    sx={{
                        fontSize:'.7em', 
                        color:'white', 
                        marginX:'10px', 
                        border:'none',
                        transition:'background .4s ease-in-out',
                        ':hover':{
                            border:'none',
                            background:'#80808080'
                        }
                    }}
                >Cerrar Sesión</Button>
            </Grid>
        </Grid>
    )
}

export default NavDrawer