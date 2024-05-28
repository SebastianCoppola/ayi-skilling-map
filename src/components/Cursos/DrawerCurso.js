import { useState } from 'react'
//Mui:
import { Drawer, Divider, Grid, IconButton, Typography, Button, TextField, 
    Select, MenuItem, InputLabel, InputAdornment } from '@mui/material'
import { Close, Delete } from '@mui/icons-material'

const DrawerRight = (props) => {

    const { openDrawer, closeDrawer, title, width, isEditar, curso, setCurso, setDataCursos } = props

    const [newLink, setNewLink] = useState()

    const handleSaveCurso = () => {
        //loading true
        setTimeout(()=>{
            if(isEditar){
                setDataCursos(dataCursos => dataCursos.map(it => {
                    if(it.orden !== curso.orden) return it
                    else return curso
                }))
            }else{
                setDataCursos(dataCursos => [...dataCursos, curso])
            }
            //loadingfalse
            //alerttrue
            closeDrawer()
        },1000)
    }

    const handleDeleteCurso = () => {
        //loading true
        setTimeout(()=>{
            setDataCursos(dataCursos => dataCursos.filter(it => it.orden !== curso.orden))
            //loadingfalse
            //alerttrue
            closeDrawer()
        },1000)
    }
        
    return (
        <Drawer anchor='right' open={openDrawer} onClose={closeDrawer}>
            
            <Grid style={{width: width, maxWidth: width, padding:'10px 20px', height:'100vh'}} container alignItems='flex-start'>

                <Grid item xs={12} container alignItems='center'>
                    <Grid item xs={12} container justifyContent='space-between' alignItems='center'>
                        <Typography style={{fontSize:'17px', fontWeight:600}}>
                            {title}
                        </Typography>
                        <IconButton onClick={closeDrawer}>
                            <Close />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} sx={{margin:'10px 0'}}>
                        <Divider />
                    </Grid>
                </Grid>

                <Grid item xs={12} style={{display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'20px 20px'}}>
                    <Grid item>
                        <Grid container alignItems='center' style={{boxSizing:'content-box'}} spacing={2}>
                            <Grid item xs={6}>
                                <InputLabel>Nombre del curso</InputLabel>
                                <TextField 
                                    variant='standard'
                                    fullWidth
                                    InputLabelProps={{shrink: true}}
                                    placeholder='Completar'
                                    value={curso?.curso ?? ''}
                                    onChange={(e)=> setCurso({...curso, curso: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>Estado</InputLabel>
                                <Select
                                    variant='standard'
                                    fullWidth
                                    value={curso?.estadoGeneralId ?? 0}
                                    onChange={(e)=> setCurso({...curso, estadoGeneralId: e.target.value})}
                                >
                                    <MenuItem value={0}><em>Seleccione</em></MenuItem>
                                    <MenuItem value={1}>Teorico en curso</MenuItem>
                                    <MenuItem value={2}>Practico en curso</MenuItem>
                                    <MenuItem value={3}>Aprobado</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>Deadline Teorico</InputLabel>
                                <TextField 
                                    variant='standard'
                                    type='date'
                                    fullWidth
                                    InputLabelProps={{shrink: true}}
                                    placeholder='Completar'
                                    value={curso?.deadlineTeorico ?? ''}
                                    onChange={(e)=> setCurso({...curso, deadlineTeorico: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>Duración Teorico</InputLabel>
                                <TextField 
                                    variant='standard'
                                    fullWidth
                                    InputLabelProps={{shrink: true}}
                                    placeholder='Completar'
                                    value={curso?.duracionTeorico ?? ''}
                                    onChange={(e)=> setCurso({...curso, duracionTeorico: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>Deadline Práctico</InputLabel>
                                <TextField 
                                    variant='standard'
                                    type='date'
                                    fullWidth
                                    InputLabelProps={{shrink: true}}
                                    placeholder='Completar'
                                    value={curso?.deadlinePractico ?? ''}
                                    onChange={(e)=> setCurso({...curso, deadlinePractico: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>Duración Práctico</InputLabel>
                                <TextField 
                                    variant='standard'
                                    fullWidth
                                    InputLabelProps={{shrink: true}}
                                    placeholder='Completar'
                                    value={curso?.duracionPractico ?? ''}
                                    onChange={(e)=> setCurso({...curso, duracionPractico: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>Referente</InputLabel>
                                <TextField 
                                    variant='standard'
                                    fullWidth
                                    InputLabelProps={{shrink: true}}
                                    placeholder='Completar'
                                    value={curso?.referente ?? ''}
                                    onChange={(e)=> setCurso({...curso, referente: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Plan Práctica</InputLabel>
                                <TextField 
                                    multiline
                                    variant='standard'
                                    fullWidth
                                    InputLabelProps={{shrink: true}}
                                    placeholder='Completar'
                                    value={curso?.planPractica ?? ''}
                                    onChange={(e)=> setCurso({...curso, planPractica: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{marginTop:'20px'}}>
                                <InputLabel>Links de entrega</InputLabel>
                                <TextField 
                                    variant='standard'
                                    fullWidth
                                    InputLabelProps={{shrink: true}}
                                    placeholder='Agregar link de entrega'
                                    value={newLink ?? ''}
                                    onChange={(e)=> setNewLink(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton 
                                                    disabled={!newLink}
                                                    onClick={()=>{
                                                        setCurso({
                                                            ...curso,
                                                            repositorio: [...curso.repositorio, newLink]
                                                        })
                                                        setNewLink('')
                                                    }} 
                                                >
                                                    <Typography>
                                                        ADD
                                                    </Typography>
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Grid sx={{marginTop:'10px'}}>
                                    {curso?.repositorio?.length > 0 &&
                                        curso.repositorio.map((link, index) => (
                                            <Grid key={index} container alignItems='center' justifyContent='space-between'>
                                                <Typography>
                                                    {link}
                                                </Typography>
                                                <IconButton 
                                                    onClick={()=> 
                                                        setCurso({
                                                            ...curso,
                                                            repositorio: curso.repositorio.filter(it => it !== link)
                                                        })
                                                    }
                                                >
                                                    <Delete fontSize='small'/>
                                                </IconButton>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{marginTop:'20px'}}>
                                <InputLabel>Certificado</InputLabel>
                                <TextField 
                                    variant='standard'
                                    fullWidth
                                    InputLabelProps={{shrink: true}}
                                    placeholder='Completar'
                                    value={curso?.certificado ?? ''}
                                    onChange={(e)=> setCurso({...curso, certificado: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{marginTop:'20px'}}>
                                <InputLabel>Feedback</InputLabel>
                                <TextField 
                                    variant='standard'
                                    fullWidth
                                    InputLabelProps={{shrink: true}}
                                    placeholder='Completar'
                                    value={curso?.feedback ?? ''}
                                    onChange={(e)=> setCurso({...curso, feedback: e.target.value})}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item style={{marginTop:'40px'}} container justifyContent='space-between'>
                        <Grid item>
                            <Button
                                variant='contained'
                                color='grey'
                                onClick={closeDrawer}
                            >Cancelar</Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant='contained'
                                color='primary'
                                sx={{marginX:'2px'}}
                                onClick={handleDeleteCurso}
                            >Eliminar</Button>
                            <Button
                                variant='contained'
                                color='primary'
                                sx={{marginX:'2px'}}
                                onClick={handleSaveCurso}
                            >Guardar</Button>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
            
        </Drawer>
    )
}

export default DrawerRight