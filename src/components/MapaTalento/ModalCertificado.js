import React, { useState } from 'react'
//Mui:
import { Button, Dialog, Divider, Grid, IconButton, TextField, Typography } from '@mui/material/'
import { Close } from '@mui/icons-material'

const ModalCertificado = ({ open, handleClose, data, changeCertificado }) => {

    const [certificado, setCertificado] = useState(data.certificado)

    const handleSave = () => {
        changeCertificado(certificado)
        handleClose()
    }
    
    return (
        <Dialog open={open} keepMounted onClose={handleClose}>
            <Grid  width='500px' px={3} py={2} container>
                <Grid item xs={12} container justifyContent='space-between' alignItems='center'>
                    <Typography sx={{fontSize:'1.3em', color:'#1B4987'}}>
                        Certificado
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <Close />
                    </IconButton>
                </Grid>
                <Grid item xs={12} mt={1}>
                    <Divider />
                </Grid>
                <Grid item xs={12} mt={3}>
                    <Typography sx={{fontSize:'1em', marginBottom:'15px'}}>
                        Agregue la url del certificaco de {data.valor}.
                    </Typography>
                    <TextField 
                        fullWidth
                        variant='standard'
                        InputLabelProps={{shrink: true}}
                        placeholder='Completar'
                        value={certificado ?? ''}
                        onChange={(e)=> setCertificado(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} mt={3} container justifyContent='flex-end'>
                    <Button onClick={handleClose} sx={{color:'#1B4987'}}>Cancelar</Button>
                    <Button onClick={handleSave} sx={{color:'#1B4987'}}>Guardar</Button>
                </Grid>
            </Grid>
        </Dialog>
    )
}

export default ModalCertificado




