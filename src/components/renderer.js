import React, { useState } from "react";
import ReactDOM from "react-dom";
import DraggableUploader from "./draggableUploader";

import "./style.scss";

export default function Renderer() {
  return (
    <div>
      <DraggableUploader />
    </div>
  );
}
