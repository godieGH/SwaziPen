import "@scss/TopNav.scss"
import MenuIcon from "@components/MenuIcon.jsx"
import { FileIcon } from 'react-file-icon';
import { FaSearch, FaPlay } from 'react-icons/fa';

function TopNav() {
   return (
      <>
         <div className="top-nav-bar">
            <div className="menu-icon"><MenuIcon/></div>
            <div className="recent-opened-file-menu">
               <div className="file-icon">
                  <FileIcon extension=".swz" color="#4caf8e" />
               </div>
               <div>
                  app.swz
               </div>
            </div>
            <div className="other-actions">
               <div>
                  <FaSearch color="#9e9e9e"/>
               </div>
               <div>
                  <FaPlay/>
               </div>
            </div>
         </div>
      </>
   );
}

export default TopNav;
