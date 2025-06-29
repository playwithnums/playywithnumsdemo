
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Gift, Star } from "lucide-react";

const outcomes = [
  { label: "10% OFF", number: 10 },
  { label: "15% OFF", number: 15 },
  { label: "20% OFF", number: 20 },
  { label: "Better Luck Next Time", number: 0 }
];

export default function SpinWheelDemo() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [angle, setAngle] = useState(0);

  const adminSelectedOutcome = outcomes[2]; // Admin-selected fixed outcome

  const spin = () => {
    if (spinning) return;
    const index = outcomes.findIndex(o => o.label === adminSelectedOutcome.label);
    const degreesPerSection = 360 / outcomes.length;
    const rotation = 360 * 5 + index * degreesPerSection + degreesPerSection / 2;
    setAngle(rotation);
    setSpinning(true);
    setTimeout(() => {
      setResult(outcomes[index]);
      setSpinning(false);
    }, 4000);
  };

  return (
    <div style={{ background: 'linear-gradient(to bottom, #000000, #1a1a1a)', minHeight: '100vh', color: 'white', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Sparkles color='#facc15' size={36} />
        Play With Numbers
      </h1>
      <p style={{ marginBottom: '1.5rem', color: '#ccc' }}>Try your luck! Admin controls the result.</p>

      <div style={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '1rem', padding: '1.5rem', textAlign: 'center' }}>
        <motion.div
          animate={{ rotate: angle }}
          transition={{ duration: 4, ease: "easeInOut" }}
          style={{
            width: '15rem',
            height: '15rem',
            borderRadius: '50%',
            border: '8px solid #facc15',
            background: 'conic-gradient(#1abc9c 0% 25%, #3498db 25% 50%, #9b59b6 50% 75%, #e74c3c 75% 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto'
          }}
        >
          <Gift color='#000000' size={40} />
        </motion.div>

        <button
          onClick={spin}
          disabled={spinning}
          style={{
            marginTop: '1.5rem',
            padding: '0.75rem 2rem',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #facc15, #f59e0b)',
            color: '#000',
            borderRadius: '9999px',
            border: 'none',
            cursor: spinning ? 'not-allowed' : 'pointer'
          }}
        >
          {spinning ? "Spinning..." : "Spin Now (Admin Only)"}
        </button>

        {result && (
          <div style={{ marginTop: '1.5rem', animation: 'pulse 2s infinite' }}>
            <Star color='#facc15' size={32} style={{ margin: '0 auto' }} />
            <p style={{ fontSize: '1.5rem', fontWeight: '600' }}>Result: {result.label}</p>
            <p style={{ fontSize: '1.25rem', color: '#ccc' }}>Number: {result.number}</p>
          </div>
        )}
      </div>
    </div>
  );
}
