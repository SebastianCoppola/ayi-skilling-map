import { useEffect } from 'react'
//Mui:
import { Grid } from '@mui/material'
//Components:
import MapaTalento from './components/MapaTalento/MapaTalento'
import Cursos from './components/Cursos/Cursos'
import NavDrawer from './components/NavDrawer/NavDrawer'
//Router:
import { Route, Routes, useNavigate } from 'react-router-dom'
//Data:
import usuarios from './data/usuarios'

function App() {

	const navigate = useNavigate()

	const rutas = [
		{
			title: 'mapa de talento',
			path: '/mapa-de-talento',
			element: <MapaTalento />
		},
		{
			title: 'cursos',
			path: '/cursos',
			element: <Cursos />
		},
	]

	const user = usuarios[0]

	useEffect(()=>{
		navigate(rutas[0].path)
	},[])

	return (
		<Grid container>
			<Grid item xs={2.5}>
				<NavDrawer rutas={rutas} user={user}/>
			</Grid>
			<Grid item xs={9.5} 
				sx={{
					height:'100vh', 
					overflowY:'auto', 
					boxSizing:'border-box',
					overflowY: 'scroll',
					scrollbarWidth: 'thin',
					'&::-webkit-scrollbar': { width: '0.4em' },
					'&::-webkit-scrollbar-track': { background: "#f1f1f1" },
					'&::-webkit-scrollbar-thumb': { backgroundColor: '#888' },
					'&::-webkit-scrollbar-thumb:hover': { background: '#555' },
				}}
			>
				<Routes>
					{ rutas?.map((ruta, index) => (
						<Route 
							key={index} 
							path={ruta.path}
							element={ruta.element}
						/>
					))}
				</Routes>
			</Grid>		
		</Grid>
	)
}

export default App
