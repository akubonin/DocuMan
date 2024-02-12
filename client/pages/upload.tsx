import '../styles/globals.css';
import Header from "@/components/header-component/header-component";
import NavBar from "@/components/navbar-component/navbar-component";
import DragDrop from '@/components/upload-component/upload-component';


function Upload() : React.ReactNode {

  return (

    <div className = 'container-dashboard-all'>
        <Header />
      <div className='container'>
            <NavBar />
      <div className='container-box'>
            <DragDrop />
      </div>
    </div>
  </div>
    )
  }


  export default Upload;