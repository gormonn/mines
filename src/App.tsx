import "./styles.css";
import { Grid } from "./modules/Grid";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

// todo: сьехало освещение

export default function App() {
  const [width, setWidth] = useState(6);
  const [height, setHeight] = useState(6);
  return (
    <div className="App">
      <label>
        Width:
        <input
          onChange={(e) => setWidth(Number(e.target.value))}
          defaultValue={width}
          type="number"
        />
      </label>
      <label>
        Height:
        <input
          onChange={(e) => setHeight(Number(e.target.value))}
          defaultValue={height}
          type="number"
        />
      </label>
      <Container>
        <Grid width={width} height={height} />
      </Container>
    </div>
  );
}
