import { useState, useEffect } from "react";

import getCourses from "../api/get-courses";

export default function useCourses() {
  // Here we use the useState hook to create a state variable called courses and a function to update it called setCourses. We initialize the state variable with an empty array.
    const [courses, setCourses] = useState([]);

  // We also create a state variable called isLoading and error to keep track of the loading state and any errors that might occur.
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

  // We use the useEffect hook to fetch the courses from the API and update the state variables accordingly.
  // This useEffect will only run once, when the component this hook is used in is mounted.
    useEffect(() => {
        getCourses().then((courses) => {
            setCourses(courses);
            setIsLoading(false);
        
        }).catch((error) => {
            setError(error);
            setIsLoading(false);
        });
    }, []);

  // Finally, we return the state variables and the error. As the state in this hook changes it will update these values and the component using this hook will re-render.
    return { courses, isLoading, error };
}