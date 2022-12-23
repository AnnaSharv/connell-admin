import { createContext, useContext, useState, useEffect } from "react";
import {signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { auth } from "./pages/firebase";
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "./pages/firebase";


//Auth
const UserAuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const user = auth
    const signIn =  (email, password) => signInWithEmailAndPassword(auth, email, password)
    const logOut = (auth) => signOut(auth)

    return(
        <UserAuthContext.Provider value={{signIn, logOut, user}}>
            {children}
        </UserAuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserAuthContext)
}


//Get data
const DataContext = createContext()


export const DataContextProvider = ({children}) => {
    const [data, setData] = useState([])
    const [blogs, setblogs] = useState([])
    const [members, setmembers] = useState([])
    const [transactions, settransactions] = useState([])

    useEffect(() => {
      const fullData = async() => {
          
          let list = []

        // const querySnapshotBlogs = await getDocs(collection(db, "blogs"));
        // querySnapshotBlogs.forEach((doc) => {
        //     list.push(doc.data())
        // });

        // const querySnapshotTransactions = await getDocs(collection(db, "transactions"));
        // querySnapshotTransactions.forEach((doc) => {
        //     list.push(doc.data())
        // });

        // const querySnapshotTeam = await getDocs(collection(db, "team"));
        // querySnapshotTeam.forEach((doc) => {
        //     list.push(doc.data())
        // });
     
        setData(list)
      }

      fullData()
    }, [])
    
    return(
        <DataContext.Provider value={{data}}>
            {children}
        </DataContext.Provider>
    )
}

export const AllData = () => {
    return useContext(DataContext)
}