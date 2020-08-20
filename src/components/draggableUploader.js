import React, { useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import { ProgressBar, Icon } from "@blueprintjs/core";
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

  const removeAllLoadedFiles = () => {
    setLoadedFiles([]);
  };

  let onFileLoad = (e) => {
    console.log("hi");
    const file = e.currentTarget.files[0];
    console.log(file);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      console.log("IMAGE LOADED: ", fileReader.result);
      const newFile = {
        name: file.name,
        size: file.size,
        type: file.type, // MIME type
        data: fileReader.result,
        isUploading: false,
        id: uuid(),
      };

      // Add File
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
      <div className="sub-header">Drag an Image</div>
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
                  console.log("hello");
                }}
              >
                <img src={file.data} />
                <div className="container">
                  <span className="progress-bar">
                    {file.isUploading && <ProgressBar />}
                  </span>
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
        <div className="helper-text">Drag and Drop Images Here</div>
        <div className="file-browser-container">
          <button onClick={() => fileInput.click()}>Browse</button>
        </div>
      </div>
    </div>
  );
}
