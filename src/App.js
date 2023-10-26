import "./App.css";

import { NewForm } from "./components/Form/Form_new";
import { Button, ChakraProvider } from "@chakra-ui/react";
import { ScoreCard } from "./components/Scores/Scorecard";
import { useEffect,useState} from "react";



export default function App() {
  let socket = new WebSocket("wss://mgoq7j2xyc.execute-api.us-east-1.amazonaws.com/production")
  // keep track of if the form is submitted
  const [formSubmitted, setFormSubmitted] = useState(false)

  // save the data submitted in the form
  const[formData, setFormData] = useState()
  const[sock, setSock] = useState()
  const [viewerMode, setViewerMode] = useState(false)
  const [realtimeData, setRealtimeData] = useState({})
  // a callback function to retrieve data from child component by sending this
  // function as a prop to the child (NewForm)


  function getFormDataFromChild(data){
    console.log(data)
    localStorage.setItem('gameConfig', JSON.stringify(data))
    // set the data from the child component (NewForm) and save it to the FormData
    // set formSubmitted to true so the component can be hidden and the game interface
    // can load
    setFormSubmitted(true)
    setFormData(data)
  }


  useEffect(() => {
      socket.onmessage = (e)=>{
          console.log(realtimeData)
          let r = JSON.parse(e.data)
          setRealtimeData(r)

        
      }


  },[realtimeData]);

  useEffect(() => {
    let gameConfigData = localStorage.getItem('gameConfig')
    console.log("gameconfig data")
    console.log(gameConfigData)
  
    if(gameConfigData){
      setFormData(JSON.parse(gameConfigData))
      setFormSubmitted(true)
    }
    //let socket = new WebSocket("wss://mgoq7j2xyc.execute-api.us-east-1.amazonaws.com/production")
    setSock(socket)

      socket.onmessage = (e)=>{
          console.log(realtimeData)
          let r = JSON.parse(e.data)
          setRealtimeData(r)

        
      }


  },[]);
  return (
    <div className="App">
      {/* wrap the components in ChakraProvider to be able to use Chakra UI theme palettes and such */}
      <ChakraProvider>
      <div>
        <Button
          onClick={(e) => {
            console.log("viwermode ")
            console.log(viewerMode)
            setViewerMode(!viewerMode)
          }}
          color={viewerMode?"blue.800":"red.800"}
          background={viewerMode?"blue":"red"}
        >Viewer Mode</Button>
      </div>
      <div>
              {//if the form is not submitted yet then show the Form component
                !formSubmitted? <NewForm parentCallback={getFormDataFromChild}/>: 
                <div>
                  {/*Otherwise show the score interface and pass the data collected
                  from the form as a prop */}
                  <ScoreCard
                   formData={formData} 
                   viewerMode={viewerMode} 
                   sock={sock}
                   realtimeData={realtimeData}
                   />
                </div>
              }
            </div>
      </ChakraProvider>
    </div>
  );
}
