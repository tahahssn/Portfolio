import FloatingIconsHero from '../components/about/Aboutbg';
import { Code, Sparkles, Rocket, Heart, Star, Coffee } from 'lucide-react'; // example icons

function About() {
  // YOUR ICONS WITH POSITIONS - CHANGE THESE TO WHATEVER ICONS YOU WANT
  const icons = [
    {
      id: 1,
      icon: Code,
      className: "top-[10%] left-[10%]"
    },
    {
      id: 2,
      icon: Sparkles,
      className: "top-[20%] right-[15%]"
    },
    {
      id: 3,
      icon: Rocket,
      className: "top-[50%] left-[5%]"
    },
    {
      id: 4,
      icon: Heart,
      className: "bottom-[20%] right-[10%]"
    },
    {
      id: 5,
      icon: Star,
      className: "bottom-[10%] left-[20%]"
    },
    {
      id: 6,
      icon: Coffee,
      className: "top-[30%] right-[25%]"
    }
  ];

  // YOUR SEPARATE BUTTON COMPONENT
  const YourButton = () => (
    <button className="px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition">
      Click Me
    </button>
  );

  return (
    <div>
      <FloatingIconsHero 
        title="About Us"
        subtitle="This is the about page with floating icons that react to your mouse movement"
        button={<YourButton />}
        icons={icons}
      />
    </div>
  );
}

export default About;