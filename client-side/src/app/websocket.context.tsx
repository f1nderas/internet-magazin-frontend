// websocket.context.tsx
import { createContext, useContext, useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'

import { SERVER_URL } from '@/config/api.config'

interface SocketContextProps {
	socket: Socket | null
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined)

export const useSocket = () => {
	const context = useContext(SocketContext)
	if (!context) {
		throw new Error('useSocket must be used within a SocketProvider')
	}
	return context.socket
}

export const WebSocketProvider = ({
	children
}: {
	children: React.ReactNode
}) => {
	const [socket, setSocket] = useState<Socket | null>(null)

	useEffect(() => {
		// Устанавливаем соединение с WebSocket-сервером
		const newSocket = io(SERVER_URL)

		setSocket(newSocket)

		// Закрываем соединение при размонтировании компонента
		return () => {
			newSocket.close()
		}
	}, [])

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	)
}
