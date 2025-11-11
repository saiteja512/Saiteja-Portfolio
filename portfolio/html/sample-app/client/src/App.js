import React, {useEffect, useState} from 'react';

function App(){
  const [msg,setMsg] = useState('');
  useEffect(()=>{
    fetch('/api/ping').then(r=>r.text()).then(t=>setMsg(t)).catch(()=>setMsg('error'));
  },[]);
  return (
    <div style={{padding:40,fontFamily:'Inter, sans-serif'}}>
      <h1>Sample React client</h1>
      <p>Ping response from server: {msg}</p>
    </div>
  );
}

export default App;
