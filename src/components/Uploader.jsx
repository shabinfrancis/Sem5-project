import { useState } from 'react'
import './ocr.css'
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'

const Uploader = () => {

  const [image, setImage] = useState(null)
  const [filename, setFilename] = useState("No file selected")
  const [uploaded, setUploaded] = useState(false)
  const [ocrText, setOcrText] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!setFilename) return;

    setUploaded(true);

    const formData = new FormData();
    formData.append('image', filename);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      setOcrResult(result.text);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to perform OCR');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <form
        action=""
        onClick={() => document.querySelector(".input-field").click()}
        onSubmit={handleSubmit}
      >
        <input className='input-field' type="file" accept='image/*' hidden
          onChange={({ target: { files } }) => {
            files[0] && setFilename(files[0].name)
            if (files) {
              setImage(URL.createObjectURL(files[0]))
            }
          }}
        />
        {
          image ?
            <img src={image} height={120} width={120} alt={filename} />
            :
            <>
              <MdCloudUpload color='#1475cf' size={60} />
              <p><b>Browse files to Upload</b></p>
            </>
        }
      </form>
      <section className='uploaded-row'>
        <AiFillFileImage color='#1475cf' />

        {filename}
        <MdDelete
          onClick={() => {
            setImage(null)
            setFilename("No file selected")
          }}
        />

      </section>
      {uploaded && <p>Processing image...</p>}
      {ocrResult && <div><h3>OCR Result:</h3><p>{ocrResult}</p></div>}
    </main>
  )
}

export default Uploader