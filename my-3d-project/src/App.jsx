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

  useEffect(() => {
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
  }, [])

  return (
    <>
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
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
          <Product layout='left'/>
        </div>
        <div className='px-4 py-10 scroll-section'>
          <Product layout='right'/>
        </div>
        <div className='px-4 pb-10 scroll-section'>
          <Product layout='left'/>
        </div>
      </div>
    </>
  )
}

export default App
