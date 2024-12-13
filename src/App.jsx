import { useRef, useState } from "react";

import NewProject from "./components/NewProject";
import Sidebar from "./components/Sidebar";
import EmptyPage from "./components/EmptyPage";

import Project from "./components/Project";

function App() {
  const [projects, setProjects] = useState([]);

  const [actionType, setActionType] = useState("none");

  const projectCounter = useRef(0);

  const selectedProject = projects.find((item) => item.status === "selected");

  function handleAddingProject(project) {
    setProjects((prevProjects) => {
      const updatedProjects = [
        ...prevProjects,
        { ...project, id: projectCounter.current++ },
      ];
      return updatedProjects;
    });
    setActionType("none");
  }

  function handleCreateProject() {
    setProjects((prevProjects) =>
      prevProjects.map((project) => ({
        ...project,
        status: "unselected",
      }))
    );
    setActionType("creating");
  }

  function handleCancelProject() {
    setActionType("none");
  }

  function handleSelectProject(selectedId) {
    setProjects((prevProjects) =>
      prevProjects.map((project) => ({
        ...project,
        status: project.id === selectedId ? "selected" : "unselected",
      }))
    );
    setActionType("editing");
  }

  function handleDeleteProject(removedProjectId) {
    setActionType("none");
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== removedProjectId)
    );
  }

  function handleAddTask(projectId, taskTitle, taskId) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: [...project.tasks, { title: taskTitle, id: taskId }],
            }
          : project
      )
    );
  }

  function handleDeleteTask(projectId, taskId) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.filter((task) => task.id !== taskId),
            }
          : project
      )
    );
  }

  function currentPage() {
    if (actionType === "none") {
      return <EmptyPage onCreateProject={handleCreateProject} />;
    }
    if (actionType === "creating") {
      return (
        <NewProject
          onCancelProject={handleCancelProject}
          onAddProject={handleAddingProject}
        />
      );
    }
    if (actionType === "editing") {
      return (
        <Project
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          onDeleteProject={handleDeleteProject}
          project={selectedProject}
        />
      );
    }
  }

  return (
    <div className="h-screen flex pt-8">
      <Sidebar
        onCreateProject={handleCreateProject}
        onSelectProject={handleSelectProject}
        projects={projects}
      />
      {currentPage()}
    </div>
  );
}

export default App;
