import { useState } from 'react';

export default function Customize() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async () => {
    const formData = new FormData();
    if (file) formData.append('image', file);
    formData.append('description', description);

    const res = await fetch('/api/analyze', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    setResults(data);
  };

  return (
    <div className="p-8">
      <h1>Upload your room or describe your style</h1>
      <input type="file" onChange={e=>setFile(e.target.files[0])}/>
      <textarea onChange={e=>setDescription(e.target.value)} />
      <button onClick={handleSubmit}>Generate Ideas</button>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {results.map((img,i)=>(
          <img key={i} src={img.url} alt="Generated preview"/>
        ))}
      </div>
    </div>
  );
}