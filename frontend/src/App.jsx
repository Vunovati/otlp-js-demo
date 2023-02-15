import { useState } from "react";
import "./App.css";

import "./tracing.js";

import opentelemetry from "@opentelemetry/api";
import AxiosExample from "./AxiosExample";

const tracer = opentelemetry.trace.getTracer("my-service-tracer");

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div className="card">
        <button
          onClick={() => {
            setCount((count) => count + 1);
            tracer.startActiveSpan("counter", (span) => {
              span.setAttribute("counter value", count);

              // Be sure to end the span!
              span.end();
            });
          }}
        >
          count is {count}
        </button>
      </div>
      <AxiosExample />
    </div>
  );
}

export default App;
