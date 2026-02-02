import Double from './MouseScaleProectGallery';
import { projects } from './Projectdata';

function App() {
  return (
    <main className="mt-[5vh] text-white pb-[10vh] bg-black min-h-screen">
      <h1 className="p-5 text-[5vw] max-w-[80%] font-normal">
        We use design and technology to create brands and products that perform, delight, and scale.
      </h1>
      
      <div className="gallery">
        <Double projects={[projects[0], projects[1]]} />
        <Double projects={[projects[2], projects[3]]} reversed={true} />
        {/* <Double projects={[projects[4], projects[5]]} /> */}
        {/* <Double projects={[projects[6], projects[7]]} reversed={true} /> */}
      </div>
    </main>
  );
}

export default App;