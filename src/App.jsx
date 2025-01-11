import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Chat from './pages/ChatPage'
import Login from './pages/Login'
import { AuthProvider } from './pages/AuthContext'
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/room/:room_uuid' element={<Chat />} />
					<Route path='/login' element={<Login />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App
