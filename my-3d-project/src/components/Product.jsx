import answerLogo from '../assets/The Answer Logo.webp';
import { Canvas } from '@react-three/fiber';
 // adjust path if needed
import { OrbitControls } from '@react-three/drei';
import CoffeeBag from './Coffee OBJ';



const Product = () => {
  return (
    <div className="w-full min-h-screen bg-[#447783] flex justify-center items-center p-5">
      <div className="flex flex-row w-full gap-8 max-w-7xl">
        {/* Content Section - Left Side */}
        <div className="bg-[#0a192f] p-8 w-1/2 flex flex-col items-center relative z-10">
          <div className="flex justify-center w-full">
            <img 
              src={answerLogo} 
              alt="The Answer Logo" 
              className="max-w-[320px] w-full mb-2.5"
            />
          </div>
          
          <div className="w-full text-sm text-[#e6e6e6] leading-relaxed text-left">
            $11.25/lb || $7.78/10oz || $24.75/Kilo || $56.25/5lb<br/><br/>
            
            Our flagship blend does double duty for both brewed coffee and espresso applications. 
            Pronounced fruit, chocolate, and caramel notes from three separate origins make for a 
            coffee that's incredibly intricate, yet roasted to be beautifully balanced. You can 
            dig in and analyze it, or just turn your brain off and enjoy it. In milk based drinks 
            The Answer melts into pure caramel and butterscotch, with hints of fruit peeking around 
            the corner. We've been working on this one for a while and are incredibly proud of what 
            we've created together.<br/><br/>
            
            Origin // Colombia, Brazil, Ethiopia <br/>
            Region // Huila, Mogiana, Yirgacheffe <br/>
            Farm // Various <br/>
            Variety // Caturra, Yellow Bourbon, Heirloom <br/>
            Elevation // 1,100-1,900 masl <br/>
            Process // Natural, Washed <br/>
            Flavor Notes // Caramel, Berries, Chocolate <br/>
            Espresso Preparation // 19.1 - 19.7 g's in, 31 - 34 g's out, 26 - 32 sec's
          </div>
        </div>

        {/* Canvas Section - Right Side */}
        <div className="w-1/2 relative">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <CoffeeBag/>
            <OrbitControls />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default Product;
