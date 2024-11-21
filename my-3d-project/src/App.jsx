import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Wholesale from './components/Wholesale'
import Product from './components/Product'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [activeSection, setActiveSection] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(true)

  useEffect(() => {
    // Handle loading state
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Add a small delay before removing the transition screen completely
      setTimeout(() => {
        setIsTransitioning(false)
      }, 600) // Matches the transition duration
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isLoading) return // Skip Lenis initialization if still loading
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    const sections = document.querySelectorAll('.scroll-section')
    
    sections.forEach((section, index) => {
      gsap.fromTo(section, 
        {
          opacity: 0,
          y: 100,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
            onEnter: () => setActiveSection(index),
            onEnterBack: () => setActiveSection(index),
          }
        }
      )

      gsap.fromTo(
        section.children,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          }
        }
      )
    })

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [isLoading])

  return (
    <>
      {/* Loading/Transition overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-[#447783] flex items-center justify-center transition-opacity duration-600 ${
          !isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } ${!isTransitioning ? 'hidden' : ''}`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>

      {/* Main content */}
      <div className={`${isTransitioning ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
        <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40">
          {[0, 1, 2, 3].map((dot, index) => (
            <button
              key={index}
              onClick={() => {
                document.querySelectorAll('.scroll-section')[index].scrollIntoView({ behavior: 'smooth' })
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        <div className='min-h-screen w-full bg-[#447783] flex flex-col divide-y-8 divide-[#447783] overflow-x-hidden m-0 p-0' 
          style={{ overflowY: 'clip' }}
        >
          <div className='px-4 pt-10 scroll-section'>
            <Wholesale/>
          </div>
          <div className='px-4 py-10 scroll-section'>
            <Product layout='left' texturePath='/Kercha.png' overlayImageUrl='Ethiopia DoodlePNG.png'/>
          </div>
          <div className='px-4 py-10 scroll-section'>
            <Product layout='right' texturePath='/Night Shift.png' overlayImageUrl='/nightshift-doodle2.png'/>
          </div>
          <div className='px-4 pb-10 scroll-section'>
            <Product layout='left' texturePath='The Answer.png'/>
          </div>
         
        </div>
      </div>
    </>
  )
}

export default App
