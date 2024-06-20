import React from 'react';
import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';
import { useParams } from 'react-router-dom';

const ProjectDetail = () => {
  const { projectId } = useParams();

  return (
    <>
     <AddTask projectId={projectId}/>
    <div className="container mx-auto">
      <TaskList projectId={projectId} />
    </div>
    </>
  );
};

export default ProjectDetail;