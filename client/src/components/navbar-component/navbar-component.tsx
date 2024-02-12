import './navbar-component.css'
import { FaCloudUploadAlt } from "react-icons/fa";
import Link from 'next/link';
import { RiDashboard2Line } from "react-icons/ri";
import { MdInsights } from "react-icons/md";
import { ImWikipedia } from "react-icons/im";



function NavBar () : React.ReactNode {




return (
  <div id='box-container-navbar' >
    <div id='menu-items-navbar'>
      <Link className='link' href='/dashboard'>
        <h2 className='menu-font'>
        <RiDashboard2Line className='navbar-icon'/>
        Dasboard</h2>
    </Link>
      <h2 className='menu-font'>
        <MdInsights className='navbar-icon'/>
      Einsichten</h2>
      <h2 className='menu-font'>
        <ImWikipedia className='navbar-icon'/>
      Wiki</h2>
    </div>
    <Link href='/upload' className='uploadButton'>
      <FaCloudUploadAlt />
      Hochladen</Link>
  </div>

)

}

export default NavBar




