import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './contexts/authContext'

export default function PrivateRoute( {children} ) {
    const navigate = useNavigate()
    const { currentUser } = useAuth()
        useEffect(() => {
            if (!currentUser) {
                navigate('/login', { replace: true })
            }
        }, [currentUser, navigate])
    return children
}