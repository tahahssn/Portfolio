// npm install unicornstudio-react
// or
// yarn add unicornstudio-react
// or
// pnpm add unicornstudio-react

// then import the component
import { div } from "three/src/nodes/math/OperatorNode.js";
import UnicornScene from "unicornstudio-react";

// documentation: https://www.npmjs.com/package/unicornstudio-react
export default function Backdrop() {
  return (
    <div className="h-screen w-screen overflow-hidden">
        <UnicornScene
        projectId="QqHTye7T0Ht4S4a41TMQ"
        width="100%"
        height="700px"
        scale={1.0}
        dpi={1.5}
        sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.9/dist/unicornStudio.umd.js"
        />
    </div>
  );
}
