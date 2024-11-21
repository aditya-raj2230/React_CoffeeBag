import { memo, Suspense } from 'react';
import answerLogo from '../assets/The Answer Logo.webp';
import { Canvas } from '@react-three/fiber';
import CoffeeBag, { CoffeeOBJ } from './Coffee OBJ';
import { OrbitControls } from '@react-three/drei';

// Add a loader component
const Loader = memo(() => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-[#e6e6e6] border-t-transparent rounded-full animate-spin"></div>
  </div>
));

// Separate the product info into a memoized component
const ProductInfo = memo(() => (
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
));

// Separate the 3D scene setup into its own component
const Scene = memo(({ texturePath }) => (
  <>
    <ambientLight intensity={0.5} />
    <directionalLight position={[10, 10, 5]} intensity={1} />
    <CoffeeOBJ texturePath={texturePath}/>
    <OrbitControls 
      enableZoom={false}
      enablePan={false}
      enableRotate={true}
      rotateSpeed={2}
      dampingFactor={0.02}
      enableDamping={true}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 2}
    />
  </>
));

const Product = ({ layout = 'left', texturePath = '/Pack2.png' }) => {
  return (
    <div className="w-full min-h-screen bg-[#447783] flex justify-center items-center p-5">
      <div className={`flex flex-row w-full gap-8 max-w-7xl ${layout === 'right' ? 'flex-row-reverse' : ''}`}>
        {/* Content Section */}
        <div className="bg-[#0a192f] p-6 w-1/2 flex flex-col items-center relative z-10">
          <div className="flex justify-center w-full mb-4">
            <img 
              src={answerLogo} 
              alt="The Answer Logo" 
              className="max-w-[280px] w-full"
              loading="lazy"
            />
          </div>
          <ProductInfo />
        </div>

        {/* Canvas Section */}
        <div className="w-1/2 relative">
          <Canvas 
            camera={{ position: [0, 0, 22], fov: 45 }}
            dpr={[1, 2]}
            performance={{ min: 0.5 }}
          >
            <Suspense fallback={<Loader />}>
              <Scene texturePath={texturePath} />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default memo(Product);
