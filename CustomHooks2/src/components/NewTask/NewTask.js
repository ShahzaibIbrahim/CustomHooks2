import { useCallback } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
  
  const createTask = useCallback((taskObj) => {
    const generatedId = taskObj.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: "random" };

    props.onAddTask(createdTask);
  }, [props] );


  const httpData = useHttp(createTask);
  
  const {isLoading, error, sendRequest: sendTaskRequest} = httpData;

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest({
      url : 'https://react-learning-a77f0-default-rtdb.firebaseio.com/tasks.json',
      method: 'POST',
      body: { text: taskText }, 
    });
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
