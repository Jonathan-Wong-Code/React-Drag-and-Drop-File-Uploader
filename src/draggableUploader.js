import React, { useState, useRef } from "react";
import { v4 as uuid } from "uuid";

export default function DraggableUploader() {
  const [loadedFiles, setLoadedFiles] = useState([]);
  let fileInput = useRef();

  const addLoadedFile = (file) => {
    setLoadedFiles((files) => [...files, file]);
  };

  const removeLoadedFile = (file) => {
    setLoadedFiles((files) =>
      files.filter((loadedFile) => loadedFile.name !== file.name)
    );
  };

  let onFileLoad = (e) => {
    const file = e.currentTarget.files[0];

    const fileReader = new FileReader();
    fileReader.onload = () => {
      const newFile = {
        name: file.name,
        size: file.size,
        type: file.type, // MIME type
        data: fileReader.result,
        isUploading: false,
        id: uuid(),
      };

      addLoadedFile(newFile);
    };

    fileReader.onabort = () => {
      alert("Reading aborted");
    };

    fileReader.onerror = () => {
      alert("File reading error");
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className="inner-container"
    >
      <h1 className="sub-header">Drag an Image</h1>
      <div className="draggable-container">
        <input
          type="file"
          id="file-browser-input"
          name="file-browser-input"
          ref={(input) => (fileInput = input)}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onChange={(e) => onFileLoad(e)}
        />
        <div className="files-preview-container ip-scrollbar">
          {loadedFiles.map((file, idx) => {
            return (
              <button
                className="file"
                key={file.id}
                onClick={() => {
                  removeLoadedFile(file);
                }}
              >
                <img src={file.data} />
                <div className="container">
                  <button
                    className="remove-btn"
                    onClick={() => removeLoadedFile(file)}
                  >
                    REMOVE
                  </button>
                </div>
              </button>
            );
          })}
        </div>
        <p className="helper-text">Drag and Drop Images Here</p>
        <div className="file-browser-container">
          <button onClick={() => fileInput.click()}>Browse</button>
        </div>
      </div>
    </div>
  );
}
