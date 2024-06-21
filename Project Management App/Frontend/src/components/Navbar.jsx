import React from 'react'
import { useState} from 'react'
import { Link } from 'react-router-dom';
import AddProject from './AddProject';

const Navbar = ({fetchProjects }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  

  

  const handleAddProjectClick = () => {
    setIsFormVisible(true);
  }
  const handleFormSubmit = async() => {
    setIsFormVisible(false);
    await fetchProjects();
   
   
  };
  const handleCancel = () => {
    setIsFormVisible(false); 
  };
 
  return (
    <>
    <nav className="bg-gray-600 flex justify-between  py-5">
        <Link to="/"className="text-white text-2xl px-4">ProjectPro</Link>
        <div className="px-4">
        <button  onClick={handleAddProjectClick} className="bg-white text-blue-500 px-4 py-2 rounded">Add Project</button>
        </div>
    </nav>
     {isFormVisible && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
      <AddProject onSubmit={handleFormSubmit} onCancel={handleCancel}/>
      </div>
      </div>
       )}
       
      </>
  )
}

export default Navbar

