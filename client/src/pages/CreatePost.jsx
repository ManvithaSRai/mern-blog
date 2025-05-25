import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
  
      setImageUploadError(null);
      setImageUploadProgress(10);
  
      // Step 1: Get auth params from backend
      const authRes = await axios.get("/api/imagekit/auth");
      const { signature, token, expire } = authRes.data;
  
      // Step 2: Prepare FormData for upload
      const form = new FormData();
      form.append("file", file);
      form.append("fileName", new Date().getTime() + "-" + file.name);
      form.append("publicKey", "public_nmTWPWenmejodvfcBBvAXjSNU1A="); //  This line is key!
      form.append("signature", signature);
      form.append("token", token);
      form.append("expire", expire);

      // Step 3: Upload directly to ImageKit
      const uploadRes = await axios.post(
        "https://upload.imagekit.io/api/v1/files/upload",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setImageUploadProgress(percentCompleted);
          },
        }
      );
  
      // Step 4: Set uploaded image URL
      const imageUrl = uploadRes.data.url;
      setFormData((prev) => ({ ...prev, image: imageUrl }));
      setImageUploadProgress(null);
    } catch (error) {
      console.error("Image upload error:", error.response?.data || error.message);
      setImageUploadError("Image upload failed. Please check console.");
      setImageUploadProgress(null);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      setPublishError(null);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="flex-1"
          />
          <Select
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="uncategorized">Select a category</option>
            <option value="tech&innovation">Tech & Innovation</option>
            <option value="culture&society">Culture & Society</option>
            <option value="science&environment">Science & Environment</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            className='bg-gradient-to-r from-indigo-600 via-purple-400 to-pink-400 rounded-lg text-white'
            size="sm"
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress}%`} />
              </div>
            ) : (
              "Upload"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img src={formData.image} alt="uploaded" className="w-full h-72 object-cover" />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => setFormData((prev) => ({ ...prev, content: value }))}
        />
        <Button type="submit" className='bg-gradient-to-r from-indigo-600 via-purple-400 to-pink-400 rounded-lg text-white'>
          Publish
        </Button>
        {publishError && <Alert color="failure">{publishError}</Alert>}
      </form>
    </div>
  );
};

export default CreatePost;
