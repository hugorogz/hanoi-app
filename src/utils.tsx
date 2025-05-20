import { Dispatch, SetStateAction } from "react";

export const hanoiEndpoint = 'http://localhost:5555/hanoi';

export type TowerState = {
  A: number[];
  B: number[];
  C: number[];
};

export type Step = {
  ring: number;
  from: "A" | "B" | "C";
  to: "A" | "B" | "C";
};

// Animate the movement of the rings based on the steps array
export const animateSteps = async (
  steps: Step[], 
  initialState: TowerState, 
  setAnimating: Dispatch<SetStateAction<boolean>>,
  setTowers: Dispatch<SetStateAction<TowerState>>
) => {
  // Mark the animation as running
  setAnimating(true);

  // Make a copy of the initial state to mutate during animation
  let state = { ...initialState };

  // Loop through each step (each step represents moving a ring from one tower to another)
  for (let i = 0; i < steps.length; i++) {
    const { from, to } = steps[i]; // Destructure the source and target towers

    // Create a shallow copy of each tower's stack so React detects the state change
    const newState = {
      A: [...state.A],
      B: [...state.B],
      C: [...state.C],
    };

    // Remove the top ring from the source tower
    const movingRing = newState[from].pop();

    // If there's no ring to move (shouldn't happen, but is a safety check), skip this step
    if (movingRing === undefined) continue;

    // Place the ring on top of the destination tower
    newState[to].push(movingRing);

    // Update the towers' state so it re-renders in the UI
    setTowers(newState);

    // Update the internal state reference for the next iteration
    state = newState;

    // Wait for 500ms before proceeding to the next move (controls animation speed)
    await new Promise((res) => setTimeout(res, 500));
  }

  // Animation complete
  setAnimating(false);
};