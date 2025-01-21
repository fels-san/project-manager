import React from "react";

import Sidebar from "./components/Sidebar";
import CurrentPage from "./components/currentPage/CurrentPage";
import Navigation from "./components/Navigation";
import ProjectManagementContextProvider from "./store/project-management-context";

function MainContent() {
  return (
    <main className="w-4/5 h-full flex flex-col items-center">
      <Navigation />
      <CurrentPage />
    </main>
  );
}

function App() {
  return (
    <ProjectManagementContextProvider>
      <div className="h-screen flex pt-8">
        <Sidebar />
        <MainContent />
      </div>
    </ProjectManagementContextProvider>
  );
}

export default App;
