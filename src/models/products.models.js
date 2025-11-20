import { db } from "../data/data.js";
import { doc, getDoc, collection, getDocs, setDoc, addDoc, updateDoc, deleteDoc, } from "firebase/firestore";

export function obtenerProducto(id) {
  return new Promise(async (res, rej) => {
    try {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document ID:", docSnap.id);
        console.log("Document data:", docSnap.data());
        res({ ...docSnap.data(), id: docSnap.id });
      } else {
        console.log("No such document!");
        res()
      }
    } catch (error) {
      console.log(error)
      rej(error)
    }
  })

}
//obtenerProducto(id)

export function obtenerProductos() {
  return (
    new Promise(async (res, rej) => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productos = []

        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          productos.push({ ...doc.data(), id: doc.id })
        });
        console.log(productos)
        res(productos)
      } catch (error) {
        console.log(error)
        rej(error)
      }
    })
  )
}
obtenerProductos()

export function agregarProducto(producto) {
  //si no pasamos el id por que es autoincremental o random por firebase se usa addDoc
  //sino usamos setDoc
  return (
    new Promise(async (res, rej) => {
      try {
        const docRef = await addDoc(collection(db, "products"), producto);
        console.log("Producto creado:", {
          ...producto,
          id: docRef.id
        });
        res({ ...producto, id: docRef.id })
      } catch (error) {
        console.log(error)
        rej(error)
      }
    })
  )
}
//agregarProducto({nombre: "Eliminar", categoria: "Bebida", precio: 9999})

export function actualizarProducto(id, producto) {
  //se pasa el id del producto a actualizar, y se actualiza el campo necesario, sea uno o mas de un campo
  return (
    new Promise(async (res, rej) => {
      try {
        // Verificar si existe
        const ref = doc(db, "products", id);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          return res(null);
        }

        // Si existe actualizo
        await updateDoc(doc(db, "products", id), {
          ...producto
        })
        console.log("producto actualizado")
        res({ id, ...producto })
      } catch (error) {
        console.log(error)
        rej(error)
      }
    })
  )
}


export function eliminarProducto(id) {
  return new Promise(async (res, rej) => {
    try {
      const ref = doc(db, "products", id);
      const snap = await getDoc(ref);
      // si no existe devuelvo null 
      if (!snap.exists()) {
        return res(null);
      }
      // Si existe lo elimina
      await deleteDoc(ref);
      res({ id });
    } catch (error) {
      console.log(error);
      rej(error);
    }
  });
}
//eliminarProducto({id:"adaMFvdtWRyFZHqiXuyA"})
