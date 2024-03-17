// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore , collection , getDocs, query, where, addDoc, DocumentSnapshot, DocumentData, updateDoc, deleteDoc} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEnMQjr5_6bb7NorIo-1-ZrrYO38fgrRU",
  authDomain: "fir-d7a63.firebaseapp.com",
  projectId: "fir-d7a63",
  storageBucket: "fir-d7a63.appspot.com",
  messagingSenderId: "625523350480",
  appId: "1:625523350480:web:bbe443ab9a7279d96737d5",
  measurementId: "G-Q197165QQM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


//Init services
const db = getFirestore();

export const fetchData = async()=>{
const colRef = collection(db, 'demo');

//get collection data
const snapshot = await getDocs(colRef);
return snapshot.docs.map(doc => doc.data());


}

export const dashboardData = async (text:String) => {
  try {
      const querySnapshot = await getDocs(query(collection(db, 'demo'), where('AdminUserName', '==', text)));
      
      const data = querySnapshot.docs.map(doc => doc.data());
      return data;
  } catch (error) {
      console.error(error);
      throw error;
  }
}

export const Validation = async (text:String) => {
  try {
      const querySnapshot = await getDocs(query(collection(db, 'demo'), where('Username', '==', text)));
      const id = querySnapshot.docs[0]?.id
      if (id ){
        return true;
      }
      else{
        return false;
      }

  } catch (error) {
      console.error(error);
      throw error;
  }
}

export const updateDocuments = async(updateData: any) =>{
  try{
    const querySnapshot = await getDocs(query(collection(db, 'demo'), where('Username', '==', updateData.Username)));
    const updates: Promise<void>[] = [];
    querySnapshot.forEach((doc: DocumentSnapshot<DocumentData>) => {
    updates.push(updateDoc(doc.ref, updateData));
  
});
    
    await Promise.all(updates)
    return updates;
}
catch (error) {
  console.error(error);
  throw error;
}
  
  }


export const insertData = async(user:any)=>{
  const colRef = collection(db, 'demo');
      const res = await addDoc(colRef, user);
      if (res?.id){
        return true;
      } 
      else{
        return false;
      }
      
}

export const deleteDocuments = async(oldData:any)=>{
  try{

      const querySnapshot = await getDocs(query(collection(db, 'demo'), where('Username', '==', oldData.Username)));
      const updates: Promise<void>[] = [];
      querySnapshot.forEach((doc: DocumentSnapshot<DocumentData>) => {
         updates.push(deleteDoc(doc.ref ));
  
});
    
    await Promise.all(updates)
    return updates;
}
catch (error) {
  console.error(error);
  throw error;
}
}

export const userDetails =async (text:String)=>{
  const querySnapshot = await getDocs(query(collection(db, 'demo'), where('Username', '==', text)));
  const data = querySnapshot.docs.map(doc => doc.data());
  return data;
}

 




