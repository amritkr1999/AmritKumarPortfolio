import React, { useState, useEffect } from "react";
import Preloader from "./components/ui/Preloader";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import Prologue from "./features/chronicles/Prologue";
import Chronicles from "./features/chronicles/Chronicles";
import Toolkit from "./features/toolkit/Toolkit";
import Epilogue from "./features/epilogue/Epilogue";
import { useActiveSection } from "./hooks/useActiveSection";

import "./index.css";

function App() {
  const [load, setLoad] = useState(true);
  const [timelineTechHighlight, setTimelineTechHighlight] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const activeSection = useActiveSection(["prologue", "chronicles", "toolkit", "epilogue"], {
    rootMargin: "-45% 0px -45% 0px",
  });

  return (
    <>
      <Preloader load={load} />
      {!load && (
        <div className="App" id="scroll">
          <Navbar activeSection={activeSection || "prologue"} />
          <Prologue />
          <Chronicles timelineTechHighlight={timelineTechHighlight} />
          <Toolkit setTimelineTechHighlight={setTimelineTechHighlight} />
          <Epilogue />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
