import { db } from './firebase';
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";




export const  blogsAll = [];
let i = 1



// const blogsRef = collection(db, "blogs");
// const queryAll = query(blogsRef, orderBy("timeStamp", "desc"), where ("blog_type", "==", "deals"));

// const getBlogs = async () => {
//     const querySnapshot = await getDocs(queryAll);
//     querySnapshot.forEach((doc) => {
//         blogsAll.push({ index:i++, id: doc.id, data: doc.data(), tags: [doc.data().blog_status] });
//     });
    
//     console.log(blogsAll)
// }
// getBlogs();










