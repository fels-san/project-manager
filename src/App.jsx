import Sidebar from "./components/Sidebar";
import CurrentPage from "./components/CurrentPage";
import ProjectManagementContextProvider from "./store/project-management-context";

function App() {
  return (
    <ProjectManagementContextProvider>
      <div className="h-screen flex pt-8">
        <Sidebar />
        <CurrentPage />
      </div>
    </ProjectManagementContextProvider>
  );
}

export default App;
