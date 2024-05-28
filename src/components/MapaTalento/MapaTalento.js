import { useRef, useState } from "react"
//Mui:
import { Button, Grid, IconButton, InputAdornment, InputLabel, TextField, Tooltip, Typography } from "@mui/material"
import { NearMe } from "@mui/icons-material"
//Assets:
import fotoPerfil from '../../assets/perfil/seba-perfil.jpg'
//Data:
import { infoPersonal } from '../../data/mapaTalento'
import { nivel, englishLevel, experiencia, idiomas, metodologiasAgiles, 
    sistemasOperativosServidores, lenguajesFrameworks } from '../../data/listados'
//Components:
import CardBox from "./CardBox"
import TalentCard from "./TalentCard"
import jsPDF from "jspdf"

const MapaTalento = () => {

    const [personalInfo, setPersonalInfo] = useState(infoPersonal)

    const personalRef = useRef()
    const idiomasRef = useRef()
    const metodologiasAgilesRef = useRef()
    const sistemasOperativosRef = useRef()
    const lenguajesFrameworksRef = useRef()

    const disableEdition = true

    const secciones = [
        {title: 'Personal', ref: personalRef},
        {title: 'Idiomas',  ref: idiomasRef},
        {title: 'Metodologías Ágiles', ref: metodologiasAgilesRef},
        {title: 'Sistemas Operativos y Servidores', ref: sistemasOperativosRef},
        {title: 'Lenguajes/Frameworks', ref: lenguajesFrameworksRef}
    ]

    const handleDescargarPdf = () => {
        const doc = new jsPDF()
        const pageHeight = doc.internal.pageSize.height
        const pageWidth = doc.internal.pageSize.width
        const marginTop = 20
        const marginLeft = 10
        const marginBottom = 20
        const lineHeight = 8
        let cursorX = marginLeft
        let cursorY = marginTop
        let currentPage = 1

        const addPageNumber = (pageNum) => {
            doc.setFontSize(10)
            doc.text(`Page ${pageNum}`, pageWidth / 2, pageHeight - 10, { align: 'center' })
        }

        //Foto de perfil:
        doc.addImage(fotoPerfil, 'JPG', cursorX, cursorY, 50, 50)
        cursorX += 60 
        //InfoPersonal:
        doc.setFontSize(14)
        doc.text(infoPersonal.nombre, cursorX, cursorY)
        doc.setFontSize(12)
        cursorY += 10
        doc.text(`Legajo: ${infoPersonal.legajo}`, cursorX, cursorY)
        cursorY += 10
        doc.text(`Fecha de Ingreso: ${infoPersonal.fechaIngreso}`, cursorX, cursorY)
        cursorY += 10
        doc.text(`Puesto: ${infoPersonal.puesto}`, cursorX, cursorY)
        cursorY += 10
        doc.text(`Seniority: ${infoPersonal.seniority}`, cursorX, cursorY)
        cursorY += 10
        if (infoPersonal.cv) {
            doc.textWithLink('Curriculum Vitae', cursorX, cursorY, { url: infoPersonal.cv })
        }
        cursorY += 25
        //Maximo nivel de estudios:
        cursorX = marginLeft
        doc.setFontSize(16)
        doc.text('Estudio Máximo:', cursorX, cursorY)
        doc.line(cursorX, cursorY + 2, pageWidth - marginLeft, cursorY + 2)
        cursorY += 15
        doc.setFontSize(12)
        doc.text(`Nivel: ${infoPersonal.estudioMaximo.nivel}`, cursorX, cursorY)
        cursorY += 10
        doc.text(`Título: ${infoPersonal.estudioMaximo.titulo}`, cursorX, cursorY)
        cursorY += 10
        if (infoPersonal.estudioMaximo.certificado) {
            doc.textWithLink('Certificado', cursorX, cursorY, { url: infoPersonal.estudioMaximo.certificado })
            
        }else{
            doc.text(`Sin certificado`, cursorX, cursorY)
        }
        
        const drawSection = (title, items) => {
            cursorY += 25
            //Salto de pagina
            if (cursorY + lineHeight * 6 > pageHeight - marginBottom) {
                doc.addPage()
                currentPage++
                addPageNumber(currentPage)
                cursorY = marginTop
            }
            //Section Title:
            doc.setFontSize(16)
            doc.text(title, cursorX, cursorY)
            doc.line(cursorX, cursorY + 2, pageWidth - marginLeft, cursorY + 2)
            cursorY += 15
            //Section Body:
            items.forEach(item => {
                doc.setFontSize(14)
                doc.text(`${item.valor}`, cursorX, cursorY)
                cursorY += 7
                doc.setFontSize(12)
                doc.text(`Nivel: ${item.nivel}`, cursorX, cursorY)
                cursorX += 50
                doc.text(`Experiencia: ${item.experiencia}`, cursorX, cursorY)
                cursorX += 70
                if (item.certificado) {
                    doc.textWithLink('Certificado', cursorX, cursorY, { url: item.certificado })
                }else{
                    doc.text('Sin certificado', cursorX, cursorY)
                }
                cursorX -= 120
                cursorY += 15
            })
        }

        addPageNumber(currentPage)

        drawSection('Idiomas', infoPersonal.idiomas)
        drawSection('Metodologías Ágiles', infoPersonal.metodologiasAgiles)
        drawSection('Sistemas Operativos/Servidores', infoPersonal.sistemasOperativosServidores)
        drawSection('Lenguajes/Frameworks', infoPersonal.lenguajesFrameworks)

        doc.save('infoPersonal.pdf')
    }
   
    return (
        <Grid container justifyContent='center' sx={{padding:'0 0 20px 0'}}>
            
            {/* NavBar */}
            <Grid item xs={12} 
                container justifyContent='center' 
                sx={{
                    backgroundColor:'white', 
                    position:'sticky',
                    top:0, 
                    padding:'25px 0', 
                    zIndex:100,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
                }}
            >
                {secciones.map( (it, index) => (
                    <Grid item key={index}>
                        <Typography 
                            onClick={() => {
                                // console.log(it.ref.current)
                                it.ref.current.style.scrollMargin = '150px'
                                it.ref.current.scrollIntoView({behavior:'smooth'})
                            }}
                            sx={{
                                display: 'inline',
                                fontSize: '.9em',
                                color: '#1B4987',
                                cursor: 'pointer', 
                                transition: 'opacity .5s ease-in-out',
                                ':hover': { opacity: '0.7' }
                            }}
                        >{it.title}</Typography>
                        { (index + 1) !== secciones.length ?
                            <Typography sx={{display: 'inline', fontSize: '.9em'}}>
                                &nbsp;&nbsp;-&nbsp;&nbsp;
                            </Typography> 
                        : null}
                    </Grid>
                ))}
            </Grid>

            {/* Descargar PDF */}
            <Grid item xs={11} container justifyContent='flex-end' sx={{marginTop:'20px'}}>
                <Button
                    variant='outlined'
                    sx={{color:'#8E8E8E', border:'1px solid #8E8E8E', ':hover':{border:'1px solid #8E8E8E'}}}
                    onClick={handleDescargarPdf}
                >Descargar PDF</Button>
            </Grid>

            {/* Biografía */}
            <CardBox>
                <span ref={personalRef} />
                <Grid container spacing={4}>
                    <Grid item xs={4} container direction='column' alignItems='center'>
                        <img 
                            src={fotoPerfil} 
                            alt='foto perfil' 
                            style={{width:'80%', maxWidth:'80%'}}
                        />
                        <Typography style={{fontSize:'1.3em', textAlign:'center', marginTop:'20px', color: '#1B4987' }}>
                            {personalInfo.nombre}
                        </Typography>
                    </Grid>
                    <Grid item xs={8} container spacing={2} ssx={{marginTop:'20px'}}>
                        <Grid item xs={9}>
                            <InputLabel>Nombre Completo</InputLabel>
                            <TextField 
                                fullWidth
                                variant='standard'
                                InputLabelProps={{shrink: true}}
                                placeholder='Completar'
                                value={personalInfo.nombre ?? ''}
                                onChange={(e)=> setPersonalInfo({...personalInfo, nombre: e.target.value})}
                                disabled={disableEdition}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <InputLabel>Legajo</InputLabel>
                            <TextField 
                                fullWidth
                                variant='standard'
                                InputLabelProps={{shrink: true}}
                                placeholder='Completar'
                                value={personalInfo.legajo ?? ''}
                                onChange={(e)=> setPersonalInfo({...personalInfo, legajo: e.target.value})}
                                disabled={disableEdition}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <InputLabel>Fecha de ingreso</InputLabel>
                            <TextField 
                                type='date'
                                fullWidth
                                variant='standard'
                                InputLabelProps={{shrink: true}}
                                value={personalInfo.fechaIngreso ?? ''}
                                onChange={(e)=> setPersonalInfo({...personalInfo, fechaIngreso: e.target.value})}
                                disabled={disableEdition}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <InputLabel>Puesto</InputLabel>
                            <TextField 
                                fullWidth
                                variant='standard'
                                InputLabelProps={{shrink: true}}
                                value={personalInfo.puesto ?? ''}
                                onChange={(e)=> setPersonalInfo({...personalInfo, puesto: e.target.value})}
                                disabled={disableEdition}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <InputLabel>Seniority</InputLabel>
                            <TextField 
                                fullWidth
                                variant='standard'
                                InputLabelProps={{shrink: true}}
                                placeholder='Completar'
                                value={personalInfo.seniority ?? ''}
                                onChange={(e)=> setPersonalInfo({...personalInfo, seniority: e.target.value})}
                                disabled={disableEdition}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel>Estudio máximo alcanzado</InputLabel>
                        </Grid>
                        <Grid item xs={4}>
                            <InputLabel>Nivel</InputLabel>
                            <TextField 
                                fullWidth
                                variant='standard'
                                placeholder='Completar'
                                InputLabelProps={{shrink: true}}
                                value={personalInfo.estudioMaximo.nivel ?? ''}
                                onChange={(e)=> 
                                    setPersonalInfo({
                                        ...personalInfo, 
                                        estudioMaximo: {
                                            ...personalInfo.estudioMaximo,
                                            nivel: e.target.value
                                    }})
                                }
                                disabled={disableEdition}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <InputLabel>Título</InputLabel>
                                <TextField 
                                    fullWidth
                                    variant='standard'
                                    placeholder='Completar'
                                    InputLabelProps={{shrink: true}}
                                    value={personalInfo.estudioMaximo.titulo ?? ''}
                                    onChange={(e)=> 
                                        setPersonalInfo({
                                            ...personalInfo, 
                                            estudioMaximo: {
                                                ...personalInfo.estudioMaximo,
                                                titulo: e.target.value
                                        }})
                                    }
                                    disabled={disableEdition}
                                />
                        </Grid>
                        <Grid item xs={4}>
                            <InputLabel>Certificado</InputLabel>
                            <TextField 
                                fullWidth
                                variant='standard'
                                placeholder='Completar'
                                InputLabelProps={{shrink: true}}
                                value={personalInfo.estudioMaximo.certificado ?? ''}
                                onChange={(e)=> 
                                    setPersonalInfo({
                                        ...personalInfo, 
                                        estudioMaximo: {
                                            ...personalInfo.estudioMaximo,
                                            certificado: e.target.value
                                    }})
                                }
                                disabled={disableEdition}
                                InputProps={{
                                    endAdornment: (
                                        <Tooltip title='Visitar Sitio'>
                                            <InputAdornment position="end">
                                                <IconButton 
                                                    disabled={!personalInfo.estudioMaximo.certificado}
                                                    onClick={()=> window.open(personalInfo.estudioMaximo.certificado,'_black')}
                                                >
                                                    <NearMe />
                                                </IconButton>
                                            </InputAdornment>
                                        </Tooltip>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <InputLabel>CV Actualizado</InputLabel>
                            <TextField 
                                fullWidth
                                variant='standard'
                                placeholder='Completar'
                                InputLabelProps={{shrink: true}}
                                value={personalInfo.estudioMaximo.certificado ?? ''}
                                onChange={(e)=> 
                                    setPersonalInfo({
                                        ...personalInfo, 
                                        estudioMaximo: {
                                            ...personalInfo.estudioMaximo,
                                            certificado: e.target.value
                                    }})
                                }
                                disabled={disableEdition}
                                InputProps={{
                                    endAdornment: (
                                        <Tooltip title='Visitar Sitio'>
                                            <InputAdornment position="end">
                                                <IconButton 
                                                    disabled={!personalInfo.estudioMaximo.certificado}
                                                    onClick={()=> window.open(personalInfo.estudioMaximo.certificado,'_black')}
                                                >
                                                    <NearMe />
                                                </IconButton>
                                            </InputAdornment>
                                        </Tooltip>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </CardBox>

            {/* Idiomas */}
            <CardBox>
                <span ref={idiomasRef} />
                <TalentCard 
                    title='Idiomas'
                    data={personalInfo.idiomas}
                    setData={(value) => setPersonalInfo({...personalInfo, idiomas: value})}
                    col1={{nombre: 'Idioma', options: idiomas}}
                    col2={{nombre: 'Nivel', options: nivel}}
                    col3={{nombre: 'Internacional', options: englishLevel}}
                />
            </CardBox>

            {/* Metodologías Ágiles */}
            <CardBox>
                <span ref={metodologiasAgilesRef} />
                <TalentCard 
                    title='Metodologías Ágiles'
                    data={personalInfo.metodologiasAgiles}
                    setData={(value) => setPersonalInfo({...personalInfo, metodologiasAgiles: value})}
                    col1={{nombre: 'Nombre', options: metodologiasAgiles}}
                    col2={{nombre: 'Nivel', options: nivel}}
                    col3={{nombre: 'Experiencia', options: experiencia}}
                />
            </CardBox>

            {/* Sistemas Operativos y Servidores */}
            <CardBox>
                <span ref={sistemasOperativosRef} />
                <TalentCard 
                    title='Sistemas Operativos y Servidores'
                    data={personalInfo.sistemasOperativosServidores}
                    setData={(value) => setPersonalInfo({...personalInfo, sistemasOperativosServidores: value})}
                    col1={{nombre: 'Sistema', options: sistemasOperativosServidores}}
                    col2={{nombre: 'Nivel', options: nivel}}
                    col3={{nombre: 'Experiencia', options: experiencia}}
                />
            </CardBox>

            {/* Lenguajes y Frameworks */}
            <CardBox>
                <span ref={lenguajesFrameworksRef}/>
                <TalentCard 
                    title='Lenguajes y Frameworks'
                    data={personalInfo.lenguajesFrameworks}
                    setData={(value) => setPersonalInfo({...personalInfo, lenguajesFrameworks: value})}
                    col1={{nombre: 'Lenguaje', options: lenguajesFrameworks}}
                    col2={{nombre: 'Nivel', options: nivel}}
                    col3={{nombre: 'Experiencia', options: experiencia}}
                />
            </CardBox>
            
        </Grid>
    )
}

export default MapaTalento