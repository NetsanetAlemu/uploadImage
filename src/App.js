import "./App.css";
import { useState, useEffect } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "images/");

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url])
      })
    });
  };
  useEffect(() => {
    listAll(imageListRef)
      .then((response) => {
        // Create an array of promises for fetching download URLs
        const promises = response.items.map((item) =>
          getDownloadURL(item).then((url) => url)
        );

        // Wait for all promises to resolve
        return Promise.all(promises);
      })
      .then((urls) => {
        // Clear the existing imageList before adding new URLs
        setImageList([]);

        // Update state with the resolved URLs
        setImageList((prev) => [...prev, ...urls]);
      })
      .catch((error) => {
        console.error("Error listing images:", error);
      });
  }, []);

  return (
    <div className="App">
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}> Upload Image </button>
      {imageList.map((url) => (
        <img src={url} key={v4()} alt={`Image ${url}`} />
      ))}
    </div>
  );
}

export default App;
