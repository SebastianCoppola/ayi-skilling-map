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
        const doc = new jsPDF()
        const pageHeight = doc.internal.pageSize.height
        const pageWidth = doc.internal.pageSize.width
        const marginTop = 10
        const marginBottom = 20
        const lineHeight = 8
        const headerHeight = 30
        let currentPage = 1
    
        const addPageNumber = (pageNum) => {
            doc.setFontSize(10)
            doc.text(`Pagina ${pageNum}`, pageWidth / 2, pageHeight - 10, { align: 'center' })
        }
    
        /* HEADER */
        doc.setFontSize(14)
        doc.text('Sebastián Coppola', marginTop, marginTop)
        doc.setFontSize(12)
        doc.text('Legajo: 619', marginTop, marginTop + 5)
        doc.setFontSize(16)
        doc.text('Historial de Cursos:', marginTop, marginTop + 15)
        doc.line(marginTop, marginTop + 18, 200, marginTop + 18)
    
        addPageNumber(currentPage)
    
        let startX = marginTop
        let startY = marginTop + headerHeight
        const width = 190
    
        dataCursos.forEach(it => {
            let cursorX = startX + 5
            let cursorY = startY + 10
            //Compruebo las dimensiones:            
            let blockHeight = 0;
            blockHeight += lineHeight // Title
            blockHeight += lineHeight // Estado
            blockHeight += lineHeight // Fecha de entrega teórico
            blockHeight += lineHeight // Duración teórico
            blockHeight += lineHeight // Fecha de entrega práctico
            blockHeight += lineHeight // Duración práctico
            let planPracticaHeight = doc.getTextDimensions(doc.splitTextToSize(`Plan de práctica: ${it.planPractica}`, width - 10)).h + 5
            blockHeight += planPracticaHeight
            blockHeight += lineHeight // Referente
            if (it.repositorio) blockHeight += lineHeight // Assuming 1 line per link  
            if (it.certificado) blockHeight += lineHeight // Link Certificado           
            blockHeight += marginBottom
    
            // Si el bloque no entra en la pagina agrego otra:
            if (cursorY + blockHeight > pageHeight - marginBottom) {
                doc.addPage()
                currentPage++
                addPageNumber(currentPage)
                startY = marginTop
                cursorY = startY + 10
            }
    
            //Title:
            doc.setFontSize(12)
            doc.text(it.curso, cursorX, cursorY)
            cursorY += lineHeight
    
            //Body:
            doc.setFontSize(11)
            doc.text(`Estado: ${it.estadoGeneral ?? '-'}`, cursorX, cursorY)
            cursorY += lineHeight
            doc.text(`Fecha de entrega teórico: ${it.deadlineTeorico ?? '-'}`, cursorX, cursorY)
            cursorX += 80
            doc.text(`Duración teórico: ${it.duracionTeorico ?? '-'}`, cursorX, cursorY)
            cursorX -= 80
            cursorY += lineHeight
            doc.text(`Fecha de entrega práctico: ${it.deadlinePractico ?? '-'}`, cursorX, cursorY)
            cursorX += 80
            doc.text(`Duración teórico: ${it.duracionPractico ?? '-'}`, cursorX, cursorY)
            cursorX -= 80
            cursorY += lineHeight
            const planPractica = doc.splitTextToSize(`Plan de práctica: ${it.planPractica ?? '-'}`, width - 10)
            doc.text(planPractica, cursorX, cursorY)
            cursorY += planPracticaHeight
            doc.text(`Referente: ${it.referente ?? '-'}`, cursorX, cursorY)
            cursorY += lineHeight
            let marginLeft = cursorX
            if (it.repositorio) {
                it.repositorio.forEach((link, index) => {
                    doc.textWithLink(`Link Entrega #${index}`, marginLeft, cursorY, { url: link })
                    marginLeft += 30
                })
                cursorY += lineHeight
            }
            if (it.certificado) {
                doc.textWithLink('Link Certificado', cursorX, cursorY, { url: it.certificado })
                cursorY += lineHeight
            }
            doc.rect(startX, startY, width, cursorY - startY)
            startY += (cursorY - startY + 10)
            cursorY += 20
        })
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