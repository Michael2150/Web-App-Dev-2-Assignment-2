import AuthProvider from "./authContext"
import MoviesContextProvider from "./moviesContext"

export default function Contexts ({ children }) {
    return (
        <AuthProvider>
            <MoviesContextProvider>
                {children}
            </MoviesContextProvider>
        </AuthProvider>
    )
}