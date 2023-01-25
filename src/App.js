import "./App.css";
import {Heading, Text, Box} from "@chakra-ui/react"
import SimpleSidebar from "./components/Sidebar";

import { NewForm } from "./components/Form/Form_new";
import { ChakraProvider } from "@chakra-ui/react";
import { ScoreCard } from "./components/Scores/Scorecard";
import { TimerCard } from "./components/Timer/timer";
import { useEffect,useState} from "react";


export default function App() {
  
  // keep track of if the form is submitted
  const [formSubmitted, setFormSubmitted] = useState(false)

  // save the data submitted in the form
  const[formData, setFormData] = useState()
  
  // a callback function to retrieve data from child component by sending this
  // function as a prop to the child (NewForm)

  function getFormDataFromChild(data){
    console.log(data)
    // set the data from the child component (NewForm) and save it to the FormData
    // set formSubmitted to true so the component can be hidden and the game interface
    // can load
    setFormSubmitted(true)
    setFormData(data)
  }


  return (
    <div className="App">
      {/* wrap the components in ChakraProvider to be able to use Chakra UI theme palettes and such */}
      <ChakraProvider>
        {//if the form is not submitted yet then show the Form component
        !formSubmitted? <NewForm parentCallback={getFormDataFromChild}/>: 
        <div>
          {/*Otherwise show the score interface and pass the data collected
          from the form as a prop */}
           <ScoreCard formData={formData}/>
           
          
        </div>
       }
        
      </ChakraProvider>
    </div>


  );
}
