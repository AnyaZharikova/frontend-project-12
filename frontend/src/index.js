import './styles'

import ReactDOM from 'react-dom/client'
import initApp from './main.jsx'
import initSocket from './services/socket.js'
import { restoreAuth } from './slices/authSlice.js'
import store from './services/index.js'

const token = store.dispatch(restoreAuth())
const socket = initSocket(token)

const app = initApp(socket)

const mountNode = document.getElementById('root')
const root = ReactDOM.createRoot(mountNode)
root.render(app)
