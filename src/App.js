import "./App.css";
import {Heading, Text, Box} from "@chakra-ui/react"
import SimpleSidebar from "./components/Sidebar";

import { NewForm } from "./components/Form/Form_new";
import { ChakraProvider } from "@chakra-ui/react";
import { ScoreCard } from "./components/Scores/Scorecard";
import { TimerCard } from "./components/Timer/timer";
import { useEffect,useState} from "react";
import { Films } from "./data/films";

export default function App() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const[formData, setFormData] = useState()
  const[randomMovie, setRandomMovie] = useState("Movie here")
  
  function getFormDataFromChild(data){
    console.log(data)
    setFormSubmitted(true)
    setFormData(data)
  }


  return (
    <div className="App">
      <ChakraProvider>
        {!formSubmitted? <NewForm parentCallback={getFormDataFromChild}/>: 
        <div>
           <ScoreCard formData={formData}/>
           
          
        </div>
       }
        
      </ChakraProvider>
    </div>


  );
}
