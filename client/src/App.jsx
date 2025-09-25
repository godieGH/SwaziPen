import TopNav from "@components/TopNav.jsx";
import Editor from "@components/Editor.jsx";
import SideBarContent from "@components/SideBarContent.jsx";

function App() {
   return (
      <div className="flex h-screen">
         {/* Sidebar (hidden on small, visible on md and above) */}
         <div className="hidden md:block w-64 p-4">
            <SideBarContent />
         </div>

         {/* Main content */}
         <div className="flex flex-col flex-1">
            {/* Top navigation */}
            <div className="h-14 flex items-center px-4 shadow">
               <TopNav />
            </div>

            {/* Editor area */}
            <div className="flex-1 p-2 overflow-auto">
               <Editor />
            </div>
         </div>
      </div>
   );
}

export default App;
