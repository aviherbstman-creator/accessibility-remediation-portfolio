import React, {useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';

const fixed = new URLSearchParams(location.search).get('mode') !== 'broken';

function Dialog({onClose}) {
  const closeRef=useRef(null), dialogRef=useRef(null);
  useEffect(()=>{
    if(!fixed) return;
    const previous=document.activeElement;
    closeRef.current?.focus();
    const handleKey=(e)=>{
      if(e.key==='Escape') onClose();
      if(e.key==='Tab'){
        const focusables=[...dialogRef.current.querySelectorAll('button,a[href],input')];
        const first=focusables[0],last=focusables.at(-1);
        if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}
        else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
      }
    };
    document.addEventListener('keydown',handleKey);
    return ()=>{document.removeEventListener('keydown',handleKey);previous?.focus();};
  },[onClose]);
  return <div className="overlay">
    <section ref={dialogRef} className="dialog" {...(fixed?{role:'dialog','aria-modal':'true','aria-labelledby':'dialogTitle'}:{})}>
      <h2 id="dialogTitle">Account information</h2>
      <p>Your account is active. This dialog demonstrates focus management.</p>
      <button ref={closeRef} onClick={onClose}>Close dialog</button>
    </section>
  </div>;
}

function App(){
 const [email,setEmail]=useState('');
 const [error,setError]=useState('');
 const [status,setStatus]=useState('');
 const [dialog,setDialog]=useState(false);
 const openButton=useRef(null);
 function submit(e){
   e.preventDefault();
   if(!email.includes('@')) {setError('Enter a valid email address.');setStatus('');return;}
   setError('');setStatus('Preferences saved for '+email);
 }
 const closeDialog=()=>setDialog(false);
 return <div className="shell">
   <header><h1>Customer Portal</h1><nav aria-label="Main navigation"><a href="#preferences">Preferences</a><a href="#invoices">Invoices</a></nav></header>
   <main>
    <p className="mode">Practice mode: <strong>{fixed?'Remediated':'Intentionally broken'}</strong> — <a href="?mode=broken">Broken</a> / <a href="?mode=fixed">Fixed</a></p>
    <section id="preferences" aria-labelledby="prefTitle">
      <h2 id="prefTitle">Notification preferences</h2>
      <form onSubmit={submit} noValidate>
        {fixed?<label htmlFor="email">Email address</label>:<span>Email address</span>}
        <input id={fixed?'email':undefined} type="text" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)}
          {...(fixed?{'aria-invalid':Boolean(error),'aria-describedby':error?'emailError':undefined}: {})}/>
        {error && <p id="emailError" className="error" {...(fixed?{role:'alert'}:{})}>{error}</p>}
        <button type="submit">Save preferences</button>
      </form>
      <p {...(fixed?{role:'status','aria-live':'polite'}:{})}>{status}</p>
    </section>
    <section id="invoices" aria-labelledby="invoiceTitle">
      <h2 id="invoiceTitle">Recent invoices</h2>
      <table><caption>Invoices and payment status</caption><thead><tr>{fixed?<><th scope="col">Invoice</th><th scope="col">Amount</th><th scope="col">Status</th></>:<><td>Invoice</td><td>Amount</td><td>Status</td></>}</tr></thead><tbody><tr><td>INV-1001</td><td>$125.00</td><td>Paid</td></tr><tr><td>INV-1002</td><td>$89.00</td><td>Pending</td></tr></tbody></table>
    </section>
    <section><h2>Account tools</h2>
      {fixed?<button ref={openButton} onClick={()=>setDialog(true)}>View account details</button>:<div className="fakeButton" onClick={()=>setDialog(true)}>View account details</div>}
    </section>
   </main>
   {dialog && <Dialog onClose={closeDialog}/>}
 </div>;
}
createRoot(document.getElementById('root')).render(<App/>);
