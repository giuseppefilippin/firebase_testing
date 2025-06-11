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
  updateDoc,
} from "firebase/firestore";

function App() {
  const [comentList, setComentList] = useState([]);

  const [newComent, setNewComent] = useState("");

  const comentsCollectionRef = collection(db, "comentarios");

  const [updatedComent, setUpdatedComent] = useState("");

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

  const updateComent = async (id) => {
    const comentDoc = doc(db, "comentarios", id);
    await updateDoc(comentDoc, { coments: updatedComent });
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

            <input
              placeholder="editar comentario"
              onChange={(e) => setUpdatedComent(e.target.value)}
            />
            <button onClick={() => updateComent(comentarios.id)}>Update</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
