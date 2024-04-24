//Mui:
import { PlusOne } from '@mui/icons-material'
import { Button, Divider, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
//Components:
import CustomMenu from './CustomMenu'

const TalentCard = (props) => {

    const { title, data, setData, col1, col2, col3 } = props

    return (
        <Grid container>
            <Grid item xs={12} container justifyContent='space-between' alignItems='center'>
                <Typography style={{fontSize:'1.3em', color:'#1B4987'}}>
                    {title}
                </Typography>
                <Button 
                    startIcon={<PlusOne/>}
                    variant='contained'
                    color='grey'
                    sx={{fontSize:'.8em'}}
                    disabled={data?.some(it => !it.idValor)}
                    onClick={()=>{
                        setData([...data, { idValor: 0, idNivel: 0, idExperiencia: 0, certificado: null}])
                    }}
                >
                    Agregar
                </Button>
            </Grid>
            <Grid item xs={12} sx={{margin:'10px 0'}}>
                <Divider />
            </Grid>
            <Grid item xs={12} container gap={2} pt={2} pb={2}>
                {data?.length ?
                    data.map((so, index) => (
                        <Grid key={index} container spacing={3}>
                            <Grid item xs={4}>
                                <InputLabel>{col1.nombre}</InputLabel>
                                <Select
                                    variant='standard'
                                    fullWidth
                                    value={so.idValor ?? 0}
                                    onChange={(e,a)=> setData(data.map(it => {
                                        if(it.idValor !== so.idValor) return it
                                        else return {...so, idValor: e.target.value, valor: a.props.children}
                                    }))}
                                >
                                    <MenuItem value={0}><em>Seleccione</em></MenuItem>
                                    {col1.options?.map(it=>(
                                        <MenuItem 
                                            value={it.id}
                                            disabled={data.some(ut => ut.idValor === it.id)}
                                        >{it.descripcion}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={3}>
                                <InputLabel>{col2.nombre}</InputLabel>
                                <Select
                                    variant='standard'
                                    fullWidth
                                    value={so.idNivel ?? 0}
                                    onChange={(e)=> setData(data.map(it => {
                                        if(it.idValor !== so.idValor) return it
                                        else return {...so, idNivel: e.target.value}
                                    }))}
                                >
                                    <MenuItem value={0}><em>Seleccione</em></MenuItem>
                                    {col2.options?.map(it=>(
                                        <MenuItem value={it.id}>{it.descripcion}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={4}>
                                <InputLabel>{col3.nombre}</InputLabel>
                                <Select
                                    variant='standard'
                                    fullWidth
                                    value={so.idExperiencia ?? 0}
                                    onChange={(e)=> setData(data.map(it => {
                                        if(it.idValor !== so.idValor) return it
                                        else return {...so, idExperiencia: e.target.value}
                                    }))}
                                >
                                    <MenuItem value={0}><em>Seleccione</em></MenuItem>
                                    {col3.options?.map(it=>(
                                        <MenuItem value={it.id}>{it.descripcion}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={1} container alignItems='flex-end' justifyContent='center'>
                                <CustomMenu 
                                    data={so}
                                    setData={(newVal) => setData(data.map(it => {
                                        if(it.idValor !== so.idValor) return it
                                        else return newVal
                                    }))}
                                    handleEliminar={()=>setData(data.filter(it => it.idValor !== so.idValor))}
                                />
                            </Grid>
                        </Grid>
                    ))
                : 
                    <Grid container justifyContent='center'>
                        <Typography style={{fontSize:'.9em', marginTop:'10px'}}>
                            No hay datos para mostrar
                        </Typography>
                    </Grid>
                }
            </Grid>
        </Grid>
    )
}

export default TalentCard