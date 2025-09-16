import TopNav from "@components/TopNav.jsx";
import SideBar from "@components/SideBar.jsx"
import Editor from "@components/Editor.jsx"

function App() {
   return (
      <>
         <div>
            <TopNav />
            <SideBar/>
            <Editor/>
         </div>
      </>
   );
}

export default App;
