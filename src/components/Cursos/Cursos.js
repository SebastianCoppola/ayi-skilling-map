import { useState } from 'react'
//Mui:
import { Button, Grid } from '@mui/material'
//Components:
import Curso from './Curso'
import DrawerCurso from './DrawerCurso'
//Data:
import cursos from '../../data/cursos'
//PDF:
import jsPDF from 'jspdf'

const Cursos = () => {

    const [drawer, setDrawer] = useState({open: false, title:'', editar: false})
    const [dataCursos, setDataCursos] = useState(cursos)
    const [selectedCurso, setSelectedCurso] = useState(null)

    const handleEditarCurso = (curso) => {
        setSelectedCurso(curso)
        setDrawer({open: true, title: 'Editar curso', editar: true})
    }

    const handleAgregarCurso = (curso) => {
        setSelectedCurso(null)
        setDrawer({open: true, title: 'Agregar nuevo curso', editar: false})
    }

    const handleDescargarPdf = () => {
        let doc = new jsPDF()
        doc.text('Hola, este es un documento PDF creado con jsPDF.', 10, 10);
        doc.save('pdfnuevo')
    }

    return (
        <Grid container justifyContent='center' sx={{padding:'0 0 20px 0'}}>
            
            {/* Buttons */}
            <Grid item xs={11} container justifyContent='flex-end' sx={{marginTop:'20px'}}>
                <Button
                    variant='outlined'
                    sx={{color:'#8E8E8E', marginX:'2px', border:'1px solid #8E8E8E', ':hover':{border:'1px solid #8E8E8E'}}}
                    onClick={handleAgregarCurso}
                >Nuevo Curso</Button>
                <Button
                    variant='outlined'
                    sx={{color:'#8E8E8E', marginX:'2px', border:'1px solid #8E8E8E', ':hover':{border:'1px solid #8E8E8E'}}}
                    onClick={handleDescargarPdf}
                >Descargar PDF</Button>
            </Grid>

            {/* Cursos */}
            <Grid item xs={9} container gap={4} sx={{marginTop:'40px'}}>
                {dataCursos.map(curso => (
                    <Curso 
                        key={curso.orden} 
                        curso={curso} 
                        handleEditarCurso={()=>handleEditarCurso(curso)}
                    />
                ))}
            </Grid>

            {/* Drawer */}
            <DrawerCurso 
                openDrawer={drawer.open}
                closeDrawer={()=>setDrawer({open: false, title: '', editar: false})}
                isEditar={drawer.editar}
                title={drawer.title}
                width={700}
                curso={selectedCurso}
                setCurso={setSelectedCurso}
                setDataCursos={setDataCursos}
            />
        </Grid>
    )
}

export default Cursos