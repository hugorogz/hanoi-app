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
      A: Array.from({ length: maxRing }, (_, i) => maxRing - i), // [n, ..., 1]
      B: [],
      C: [],
    };

    setTowers(initialTowers);
   
    
    const startAnimation = async () => {
      await new Promise((res) => setTimeout(res, 500)); // wait a bit befote start
      animateSteps(steps, initialTowers, setAnimating, setTowers);
    };

    startAnimation();
  }, [steps]);

  // Render a tower column with rings
  const renderTower = (name: "A" | "B" | "C") => {
    const rings = towers[name];
    return (
      <div className="tower" style={{ height: `${towerHeight}px`, width: `${towerWidth}px` }}>
        {rings.map((ring, i) => (
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
