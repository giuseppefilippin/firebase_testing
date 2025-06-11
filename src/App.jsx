import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/auth";
import { db } from "./config/firebase";
import { getDocs, collection } from "firebase/firestore";

function App() {
  const [comentList, setComentList] = useState([]);
  const comentsCollectionRef = collection(db, "comentarios");

  useEffect(() => {
    const getComentList = async () => {
      try {
        const data = await getDocs(comentsCollectionRef);
        const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
        console.log(filteredData);
        setComentList(filteredData); 
      } catch(err) {console.error(err)};
    };
    getComentList();
  }, []);
  

  return (
    <div className="App">
      <Auth />
    <div>

    {comentList.map((comentarios) => (
      <div>
        <h1>{comentarios.coments}</h1>
        </div>
      ))}
      </div>
    </div>
  );
}
export default App;
