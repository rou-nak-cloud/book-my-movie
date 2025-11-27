import {createContext,useContext} from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext()

export const AppProvider = ({children})=> {
    const [isAdmin, setIsAdmin] = useState(false)
    const [shows, setShows] = useState([])
    const [favoriteMovies, setFavoriteMovies] = useState([])


    // from CLERK
    const {user} = useUser()
    const {getToken} = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const fetchIsAdmin = async()=> {
        try {
            const {data} = await axios.get(`/api/admin/is-admin`, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            })
            setIsAdmin(data.isAdmin)

            if(!data.isAdmin && location.pathname.startsWith('/admin')){
                navigate('/')
                toast.error("Not Authorized")
            }
        } catch (error) {
            console.log(error)
        }
    }

// fetch Shows
    const fetchShows = async ()=> {
        try {
            const {data} = await axios.get('/api/show/all')
            if(data.success){
                setShows(data.shows)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

//   



    useEffect(()=>{
        fetchShows()
    },[])
    useEffect(()=>{
        if(user){
            fetchIsAdmin()
        }
    },[user])

    const value = {axios}
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
} 
export const useAppContext = () => useContext(AppContext)