import { useState } from 'react'
import './ocr.css'
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'

const Uploader = () => {

  const [image, setImage] = useState(null)
  const [filename, setFilename] = useState("No file selected")
  return (
    <main>
      <form
        action=""
        onClick={() => document.querySelector(".input-field").click()}>
        <input className='input-field' type="file" accept='image/*' hidden 
        onChange={({target: {files}}) => {
          files[0] && setFilename(files[0].name)
          if(files) {
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
        <AiFillFileImage color='#1475cf'/>
        
          {filename}
          <MdDelete
            onClick={() => {
              setImage(null)
              setFilename("No file selected")
            }}
          />
        
      </section>
    </main>
  )
}

export default Uploader