import { Button, Input } from "@mui/material"
import { useDispatch } from 'react-redux';
import { GetHanoiSolution } from "../api/hanoi-api";
import { AppDispatch } from "../store";
import { setSteps } from "../redux/hanoiSlice";
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
        backgroundColor: `${Number(rings) < 1 ? 'grey' : '#007FFF'}`, 
        marginLeft: 16, 
        color: 'white' 
      }} 
      onClick={async () => {
        dispatch(setSteps([]))
        const steps =  await GetHanoiSolution(rings);
        dispatch(setSteps(steps))
      }}
      disabled={Number(rings) < 1}
    >
      Resolve Hanoi
    </Button>
  </div>
}

export default HanoiForm