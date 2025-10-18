import TopNav from "@components/TopNav.jsx";
import Editor from "@components/Editor.jsx";
import SideBarContent from "@components/SideBarContent.jsx";

function App() {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar (hidden on small, visible on md and above) */}
            <div
                style={{
                    height: "95dvh"
                }}
                className="hidden md:block w-64"
            >
                <SideBarContent />
            </div>

            {/* Main content */}
            <div className="flex flex-col flex-1">
                {/* Top navigation */}
                <div className="h-14 flex items-center shadow">
                    <TopNav />
                </div>

                {/* Editor area */}
                <div
                    style={{
                        overflow: "hidden",
                        height: "82dvh"
                    }}
                >
                    <Editor />
                </div>
            </div>
        </div>
    );
}

export default App;
