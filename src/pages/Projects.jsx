import React from 'react'
import ProjectGallery from '../components/projects/ProjectGallery'
import ProjectHorizontal from '../components/projects/ProjectHorizontal'

const Projects = () => {
  return (
    <div className="h-full w-full overflow-hidden">
      {/* <ProjectGallery/> */}
      <ProjectHorizontal/>
    </div>
  )
}

export default Projects