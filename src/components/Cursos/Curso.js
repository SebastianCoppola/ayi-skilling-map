import { Accordion, AccordionDetails, AccordionSummary, Button, 
    Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import { ArrowDownward, Edit } from '@mui/icons-material'

const Curso = ({ curso, handleEditarCurso }) => {

    const handleChipColor = (idEstado) => {
        switch(idEstado){
            case 1: return 'green'
            case 2: return 'orange'
            default: return 'grey'
        }
    }

    return (
                
        <Accordion 
            sx={{
                width:'100%', 
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
                '&:before': {
                    display: 'none'
                },
            }}
        >
            <AccordionSummary expandIcon={<ArrowDownward />}>
                <Grid container alignItems='center' justifyContent='space-between' sx={{padding:'0 20px'}}>
                    <Grid item>
                        <Typography sx={{fontSize:'1.1em', fontWeight:700, color:'#1B4987'}}>
                            {curso.curso}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography sx={{border:`1px solid ${handleChipColor(curso.estadoGeneralId)}`, borderRadius:'5px', padding:'3px 7px', color:`${handleChipColor(curso.estadoGeneralId)}`}}>
                            {curso.estadoGeneral}
                        </Typography>
                    </Grid>
                </Grid>                
            </AccordionSummary>
            <AccordionDetails>
                <Grid sx={{padding:'0 20px'}}>
                    <Grid container sx={{marginBottom:'30px'}}>
                        <Divider sx={{width: '100%'}}/>
                    </Grid>
                    <Grid container sx={{marginBottom:'15px'}}>
                        <Typography sx={{fontSize:'1.1em', fontWeight:700}}>
                            Teórico:
                        </Typography>
                    </Grid>
                    <Grid container sx={{marginBottom:'30px'}}>
                        <Grid item xs={4} container alignContent='center' gap={1}>
                            <Typography>
                                Fecha de Entrega:
                            </Typography>
                            <Typography>
                                <i>{curso.deadlineTeorico ?? '-'}</i>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} container alignContent='center' gap={1}>
                            <Typography>
                                Duración:
                            </Typography>
                            <Typography>
                                <i>{curso.duracionTeorico ?? '-'}</i>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container sx={{marginBottom:'15px'}}>
                        <Typography sx={{fontSize:'1.1em', fontWeight:700}}>
                            Práctico:
                        </Typography>
                    </Grid>
                    <Grid container sx={{marginBottom:'30px'}}>
                        <Grid item xs={12} sx={{marginBottom:'15px'}}>
                            <Typography>
                                Plan de práctica: <i>{curso.planPractica ?? '-'}</i>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} container sx={{marginBottom:'15px'}}>
                            <Grid item xs={4}>
                                <Typography>
                                Fecha de Entrega: <i>{curso.deadlinePractico ?? '-'}</i>
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>
                                    Duración: <i>{curso.duracionPractico ?? '-'}</i>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>
                                    Referente: <i>{curso.referente ?? '-'}</i>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container alignContent='center'>
                            <Typography>
                                Urls/Repositorio: {!curso.repositorio && '-'}
                            </Typography>
                            <Grid container>
                                {curso.repositorio?.map((it, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Typography 
                                            onClick={()=>window.open(it, '_blank')}
                                            sx={{
                                                display: 'inline',
                                                cursor: 'pointer', 
                                                transition: 'opacity .5s ease-in-out',
                                                ':hover': { opacity:'0.7' }
                                            }}
                                        ><i>{it}</i></Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='space-between' gap={2}>
                        <Grid item style={{display:'flex', gap:10}}>
                            <Button
                                variant='contained'
                                color='grey'
                                sx={{fontSize:'.8em'}}
                                disabled={!curso.certificado}
                                onClick={()=>window.open(curso.certificado, '_blank')}
                            >Cerificado</Button>
                            <Button
                                variant='contained'
                                color='grey'
                                sx={{fontSize:'.8em'}}
                                disabled={!curso.feedback}
                                onClick={()=>window.open(curso.feedback, '_blank')}
                            >Feedback</Button>
                        </Grid>
                        <Grid item>
                            <Tooltip title='Editar Curso'>
                                <IconButton
                                    sx={{border:'1px solid grey' }}
                                    onClick={handleEditarCurso}
                                >
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid> 
            </AccordionDetails>
        </Accordion>
    )
}

export default Curso