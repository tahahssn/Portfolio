import React from "react";

import ProjectIntro from "./ProjectIntro";
import ProjectHorizontal from "./ProjectHorizontal";

const ProjectSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#080808]">
      <ProjectIntro />
      <ProjectHorizontal />
    </section>
  );
};

export default ProjectSection;