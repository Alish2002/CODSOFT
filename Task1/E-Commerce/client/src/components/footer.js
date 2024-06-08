import {FaInstagramSquare} from 'react-icons/fa'
import {BiLogoLinkedinSquare} from 'react-icons/bi'
import {BiLogoFacebookCircle} from 'react-icons/bi'

function Footer(){
  console.log("footer")
    return <div className="footer">
      <p className='footerContent'>Follow us at &nbsp;&nbsp;
      <FaInstagramSquare/> &nbsp;&nbsp;
      <BiLogoLinkedinSquare/>&nbsp;&nbsp;
      <BiLogoFacebookCircle/> 
      </p>
      <p  className='footerContent'>Copyright © 2023 FitFeet Fashions.All Rights Reserved.</p>
      


    </div>
    }
    
export default Footer