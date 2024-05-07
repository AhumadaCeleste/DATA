import React from 'react';
import { Link } from 'react-router-dom';
import email2 from "../IMAGES/email2.png";



//traer imagen whatsapp
  

const Footer = ()=>{

return (
  <div className='fixed bottom-0 left-0 w-full p-2'>
  <hr />
  <ul className='flex space-x-3'>
  <div className='instagram hover:hover:bg-sky-700 boton_footermd-3 p-2'>
  <Link to='https://mail.google.com/mail'>
            <img src={email2} width="30" alt="E-mail" style={{ borderRadius: '90px' }} />
            <p>datawave@gmailcom</p>
          </Link>
    </div>
  </ul>
</div>
  )
}

export default Footer

