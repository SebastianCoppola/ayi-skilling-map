import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'

const theme = createTheme({
    palette: {
        ayiBlue: '#1B4987',
    },
    themes: {
        darkMode: {
            backgroundColor: '#17202A',
            color: '#ffff',
            transition: 'all 0.7s ease-in-out'
        },
        lightMode: {
            backgroundColor: '#ffff',
            color: '#17202A',
            transition: 'all 0.7s ease-in-out'
        },
    }
  
  })

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
)