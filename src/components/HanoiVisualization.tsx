import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import '../styles/HanoiVisualization.scss';
import { animateSteps, Step, TowerState } from "../utils";

const HanoiVisualization = () => {
  const { steps } = useSelector((state: RootState) => state.steps);
  const [towers, setTowers] = useState<TowerState>({
    A: [],
    B: [],
    C: [],
  });

  // track if animation is running
  const [animating, setAnimating] = useState(false);

  // Calculate height of towers based in the total number of rings 
  const totalRings = steps.reduce((max: number, step: any) => Math.max(max, step.ring), 0);
  const towerHeight = totalRings > 0 ? totalRings * 32 : 300; // 24px ring + 8px margin
  const towerWidth = Math.min(totalRings * 20 + 16, 200); // width ring + padding

  // Initialize towers when steps arrive
  useEffect(() => {
    if (!steps || steps.length === 0) return;

    // Get highest ring number from steps
    const maxRing = steps.reduce((max: number, step: Step) => (
      Math.max(max, step.ring)
    ), 0);

    // Setup initial tower A with all the rings
    const initialTowers: TowerState = {
      // Create an array of rings in descending order [maxRing, ..., 1] to represent the initial tower state
      A: Array.from({ length: maxRing }, (_, i) => maxRing - i), // [n, ..., 1]
      B: [],
      C: [],
    };

    // set initialTowers as towers
    setTowers(initialTowers);
   
    // function to run the animation function each 500 ms
    const startAnimation = async () => {
      await new Promise((res) => setTimeout(res, 500)); // wait a bit befote start each tiime calling animateSteps
      animateSteps(steps, initialTowers, setAnimating, setTowers);
    };

    // run the animation
    startAnimation();
  }, [steps]);

  // Render a tower column with rings
  const renderTower = (name: "A" | "B" | "C") => {
    const rings = towers[name]; // gets the rings for each tower name
    return (
      <div className="tower" style={{ height: `${towerHeight}px`, width: `${towerWidth}px` }}>
        {rings.map((ring, i) => (
          // the numbers in the towers
          <div
            key={i}
            className="disk"
            style={{
              width: `${Math.min(ring * 20, towerWidth - 16)}px`,
              backgroundColor: `hsl(${ring * 60}, 70%, 60%)`,
            }}
          >
            {ring}
          </div>
        ))}
      </div>
    );
  };

  return (
    // the container of the towers and render the Labels (Head) of each tower, 
    // and below, render teach tower's content (the numbers representing the rings)
    <div style={{ textAlign: "center", marginTop: 32 }}>
      <div className="towers-container">
        {["A", "B", "C"].map((name) => (
          <div key={name} className="tower-wrapper">
            <div className="tower-label">{name}</div>
            {renderTower(name as "A" | "B" | "C")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HanoiVisualization;
