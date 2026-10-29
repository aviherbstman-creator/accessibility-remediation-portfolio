import React, {useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';

const params = new URLSearchParams(location.search);
const fixed = params.get('mode') !== 'broken';
const showDemo = params.has('demo');

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
    <p className="mode">Practice mode: <strong>{fixed?'Remediated':'Intentionally broken'}</strong> — <a href="?demo=1&mode=broken">Broken</a> / <a href="?demo=1&mode=fixed">Fixed</a> / <a href="./">Portfolio home</a></p>
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
function Landing(){
  return <div className="portfolio">
    <a className="skip" href="#main">Skip to content</a>
    <header className="portfolio-header">
      <a className="brand" href="./">Accessibility Remediation <span>Portfolio</span></a>
      <nav aria-label="Portfolio navigation">
        <a href="#services">Services</a><a href="#projects">Projects</a><a href="#approach">Approach</a><a href="#contact">Contact</a>
      </nav>
    </header>
    <main id="main">
      <section className="hero">
        <div className="eyebrow">React · JavaScript · ASP.NET Core · WCAG 2.2</div>
        <h1>Accessible software is better software.</h1>
        <p className="lead">I help development teams identify, remediate, and verify accessibility barriers in web applications—combining hands-on engineering with practical testing.</p>
        <div className="actions"><a className="primary-link" href="?demo=1&mode=fixed">Explore the React demo</a><a className="secondary-link" href="#projects">View projects</a></div>
        <p className="note">Independent portfolio and learning demonstrations. Examples are not a certification of WCAG conformance.</p>
      </section>
      <section id="services" className="portfolio-section">
        <p className="eyebrow">What I can help with</p><h2>Focused accessibility services</h2>
        <div className="service-grid">
          <article><span className="service-num">01</span><h3>Accessibility reviews</h3><p>Prioritized findings with reproduction steps, impact, and relevant WCAG success criteria.</p></article>
          <article><span className="service-num">02</span><h3>Code remediation</h3><p>Targeted fixes for semantic HTML, forms, keyboard interaction, focus, and dynamic updates.</p></article>
          <article><span className="service-num">03</span><h3>Verification & handoff</h3><p>Keyboard and screen-reader checks, regression notes, and developer-friendly documentation.</p></article>
        </div>
      </section>
      <section id="projects" className="portfolio-section">
        <p className="eyebrow">Selected work</p><h2>Hands-on remediation examples</h2>
        <div className="project-grid">
          <article className="project-card">
            <span className="project-type">Live interactive demo</span><h3>React Customer Portal</h3>
            <p>Compare intentionally broken and improved forms, dialogs, keyboard controls, table headers, and status announcements.</p>
            <div className="project-links"><a href="?demo=1&mode=broken">Broken version</a><a href="?demo=1&mode=fixed">Remediated version</a></div>
            <a className="repo-link" href="https://github.com/aviherbstman-creator/accessibility-remediation-portfolio/tree/main/react-customer-portal">Review React source code</a>
          </article>
          <article className="project-card">
            <span className="project-type">Source-code case study</span><h3>ASP.NET Core Invoice Portal</h3>
            <p>Razor Pages examples of form labeling, validation, data table semantics, and accessible action feedback.</p>
            <p className="note">ASP.NET Core requires a server and is not hosted on GitHub Pages.</p>
            <a className="repo-link" href="https://github.com/aviherbstman-creator/accessibility-remediation-portfolio/tree/main/aspnet-invoice-portal">Review .NET source code</a>
          </article>
        </div>
      </section>
      <section id="approach" className="portfolio-section approach">
        <p className="eyebrow">How I work</p><h2>Find it. Fix it. Verify it.</h2>
        <p>Start with a defined scope, document the barrier and expected behavior, implement the smallest maintainable correction, then retest with automated tools and real keyboard and screen-reader interactions.</p>
        <p>Sample projects illustrate remediation patterns; real client engagements require environment-specific testing and agreed acceptance criteria.</p>
      </section>
      <section id="contact" className="portfolio-section contact">
        <p className="eyebrow">Get in touch</p><h2>Have accessibility issues in your backlog?</h2>
        <p>Connect through GitHub to discuss a focused review or remediation engagement.</p>
        <a className="primary-link" href="https://github.com/aviherbstman-creator">Visit my GitHub profile</a>
        <p className="note">Add a professional email address or LinkedIn link here when you're ready to accept inquiries.</p>
      </section>
    </main>
    <footer>Accessibility Remediation Portfolio · Built with React · <a href="https://github.com/aviherbstman-creator/accessibility-remediation-portfolio">Source on GitHub</a></footer>
  </div>;
}
createRoot(document.getElementById('root')).render(showDemo ? <App/> : <Landing/>);
