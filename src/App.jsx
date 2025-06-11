import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/auth";
import { db } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [comentList, setComentList] = useState([]);

  const [newComent, setNewComent] = useState("");

  const comentsCollectionRef = collection(db, "comentarios");

  const getComentList = async () => {
    try {
      const data = await getDocs(comentsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setComentList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmitComent = async () => {
    try {
      await addDoc(comentsCollectionRef, { coments: newComent });
      getComentList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteComent = async (id) => {
    const comentDoc = doc(db, "comentarios", id);
    await deleteDoc(comentDoc);
  };

  useEffect(() => {
    const getComentList = async () => {
      try {
        const data = await getDocs(comentsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setComentList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getComentList();
  }, [onSubmitComent]);

  return (
    <div className="App">
      <Auth />

      <div>
        <input
          placeholder="comentarios"
          onChange={(e) => setNewComent(e.target.value)}
        />
        <button onClick={onSubmitComent}>Enviar</button>
      </div>
      <div>
        {comentList.map((comentarios) => (
          <div>
            <h1>{comentarios.coments}</h1>
            <button onClick={() => deleteComent(comentarios.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
