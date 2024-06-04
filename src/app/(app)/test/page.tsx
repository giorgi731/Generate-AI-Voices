'use client';
import React, { useState } from 'react';
import AppContainer from '../components/AppContainer';
import axios from 'axios';

function page() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  const uploadAudio = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    setUploadSuccess(false);
    setUploadError(false);
    const file = e.target.files?.[0]!;
    const filename = encodeURIComponent(file.name);
    const fileType = encodeURIComponent(file.type);

    const res = await fetch(
      `/api//models/train?file=${filename}&fileType=${fileType}`
    );
    const { url, fields } = await res.json();
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.upload.onprogress = function (e) {
      if (e.lengthComputable) {
        const percentCompleted = Math.round((e.loaded * 100) / e.total);
        setUploadProgress(percentCompleted);
      }
    };
    xhr.onload = function () {
      setUploading(false);
      if (xhr.status === 200 || xhr.status === 204) {
        setUploadSuccess(true);
        setUploadProgress(0);
      } else {
        setUploadError(true);
        setUploadProgress(0);
      }
    };
    xhr.send(formData);
  };

  const onSend = async () => {
    const formData = new FormData();
    // formData.append('audio', selectedAudioFile || file); // no longer upload the file, but the s3_url instead
    formData.append(
      'training_data_url',
      'https://revocalize.s3.us-east-2.amazonaws.com/output/1112345/30_05_2023_11_00_07_None.wav'
    );
    formData.append('model_name', 'Andra1');
    formData.append('model_gender', 'Female');
    formData.append('model_age', 'young adult');
    formData.append('description', 'Trained from API');
    formData.append('user_id', 'e04cbaa5-1bce-40e0-9530-f6677075206a');

    const response = await fetch('/api/models/train', {
      method: 'POST',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMTEyMzQ1IiwiaWF0IjoxNjgyMzQxNjIyfQ.J1tKZY2yk-StXtTHHkHlnWBw__ZCdFzysoh35LPfBPs',
      },
      body: formData,
    });
  };

  return (
    <>
      <AppContainer>
        <p onClick={onSend}>Upload an .mp3 or .wav audio file (max 5MB).</p>
        <input onChange={uploadAudio} type="file" accept="audio/*" />
        {uploading && (
          <>
            <p>Upload progress: {uploadProgress}%</p>
            <div className="relative pt-1">
              <div className="flex h-2 mb-4 overflow-hidden text-xs bg-pink-200 rounded">
                <div
                  style={{ width: `${uploadProgress}%` }}
                  className="flex flex-col justify-center text-center text-white bg-pink-500 shadow-none whitespace-nowrap"
                ></div>
              </div>
            </div>
          </>
        )}
        {uploadSuccess && <p>Your audio has been uploaded!</p>}
        {uploadError && <p>Upload failed. Please try again.</p>}
      </AppContainer>
    </>
  );
}

export default page;
