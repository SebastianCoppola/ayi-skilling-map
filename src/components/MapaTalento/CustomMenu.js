import { useState } from 'react'
//Mui:
import { IconButton, Menu, MenuItem } from '@mui/material'
import { Menu as IconMenu } from "@mui/icons-material"
//Components:
import ModalCertificado from './ModalCertificado'

const CustomMenu = ({data, setData, handleEliminar}) => {

    const [openModal, setOpenModal] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    const open = Boolean(anchorEl)

    return (
        <>
            {/* Open Menu */}
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={(event)=>setAnchorEl(event.currentTarget)}
            ><IconMenu/></IconButton>
            
            {/* Menu */}
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={()=>setAnchorEl(null)}
            >
                <MenuItem 
                    onClick={()=>{
                        setAnchorEl(null)
                        window.open(data.certificado,'_blanck')
                    }}
                    disabled={!data.certificado}
                >Certificado</MenuItem>
                <MenuItem 
                    onClick={()=>{
                        setAnchorEl(null)
                        setOpenModal(true)
                    }}
                >{data.certificado ? 'Editar Certificado' : 'Agregar Certificado'}</MenuItem>
                <MenuItem 
                    onClick={()=>{
                        setAnchorEl(null)
                        handleEliminar()
                    }}
                >Eliminar</MenuItem>
            </Menu>

            {/* Modal Certificado */}
            <ModalCertificado 
                open={openModal}
                handleClose={()=>setOpenModal(false)}
                data={data}
                changeCertificado={(value) => setData({...data, certificado: value})}
            />
        </>
    )
}

export default CustomMenu