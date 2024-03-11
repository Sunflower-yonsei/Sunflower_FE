import React, { useState, useRef } from "react";

const FileUploadDragDrop: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadClick = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/transcriptions`, {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error("File upload failed");
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
  };

  return (
    <div>
      <div className="m-auto flex justify-center items-center flex-col">
        <label
          htmlFor="input_file"
          className="cursor-pointer"
          aria-labelledby="fileLabel"
        >
          <span id="fileLabel" className="sr-only">
            파일 선택하기
          </span>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-300 p-10 text-center cursor-pointer"
          >
            Drag & Drop files here or{" "}
            <span className="text-blue-600 underline">Select File</span>
          </div>
          {selectedFile && (
            <div className="mt-4">Selected file: {selectedFile.name}</div>
          )}
          <input
            type="file"
            id="input_file"
            name="pdf_file"
            accept=".pdf"
            onChange={handlePdfChange}
            aria-describedby="fileLabel"
            className="hidden"
            ref={fileInputRef}
          />
        </label>
        <button
          type="submit"
          onClick={handleUploadClick}
          disabled={!selectedFile}
          className={`w-[170px] h-[50px] ${
            !selectedFile ? "bg-gray-500" : "bg-stone-800 hover:bg-stone-600"
          } rounded mr-4 flex justify-center items-center transition duration-300 ease-in-out`}
        >
          <div className="text-white text-base font-medium leading-none">
            파일 업로드하기
          </div>
        </button>
      </div>
    </div>
  );
};

export default FileUploadDragDrop;
