import './header-component.css';
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineDocumentScanner } from "react-icons/md";


function Header() : React.ReactNode {
  return (
    <div id='header-component'>
      <div id='header-component-left'>
      <MdOutlineDocumentScanner id='MdOutlineDocumentScanner' />
      <h1>Docu.ai</h1>
      </div>
      <div id='header-component-right'>
        <div id = 'header-component-options'>
          <IoIosLogOut className='item-icon'/>
          <p>Logout</p>
        </div>
      </div>
    </div>
  )
}


export default Header;