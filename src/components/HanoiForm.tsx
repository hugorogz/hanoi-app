import { Button, Input } from "@mui/material"
import { useDispatch } from 'react-redux';
import { GetHanoiSolution } from "../api/hanoi-api";
import { AppDispatch } from "../store";
import { setResults } from "../redux/hanoiSlice";
import { useState } from "react";

const HanoiForm = () => {
  const [rings, setRings] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  return  <div>
    <Input 
      id="rings-input" 
      placeholder="Number of rings"
      onChange={(e) => setRings(e.currentTarget.value)}
      inputProps={{
        type: 'number'
      }}
    />
    <Button 
      id="hanoi-solve-button"
      style={{ 
        backgroundColor: `${!rings ? 'grey' : '#007FFF'}`, 
        marginLeft: 16, 
        color: 'white' 
      }} 
      onClick={async () => {
        const results =  await GetHanoiSolution(rings);
        console.log(results)
        dispatch(setResults(results))
      }}
      disabled={!rings}
    >
      Resolve Hanoi
    </Button>
  </div>
}

export default HanoiForm