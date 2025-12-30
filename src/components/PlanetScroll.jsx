import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { planetsData } from './PlanetData';
import Navigation from './Navigation';
import { 
  PlanetInfo, 
  BackgroundEffects, 
  OrbitalSystem, 
  MobileControls 
} from './PlanetDisplay';

export default function PlanetScroll() {
  const containerRef = useRef(null);
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAnimatingRef = useRef(false);
  const scrollVelocity = useRef(0);
  const animationRef = useRef(null);
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);
  
  const planetsRef = useRef([]);
  const planetImagesRef = useRef([]);
  const titleRef = useRef(null);
  const infoCardsRef = useRef([]);
  const topLeftGlowRef = useRef(null);
  const topRightGlowRef = useRef(null);

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const planets = planetsRef.current;
    
    planets.forEach((planet, index) => {
      if (!planet) return;
      
      const positionIndex = (index - currentPlanetIndex + planetsData.length) % planetsData.length;
      
      let x, scale, opacity, zIndex;
      
      // For mobile: only show center planet, hide others
      if (isMobile) {
        if (positionIndex === 0) {
          x = 0; scale = 1.2; opacity = 1; zIndex = 30; // Reduced from 1.5 to 1.2
        } else {
          x = 0; scale = 0; opacity = 0; zIndex = 0;
        }
      } else {
        // Desktop positioning (original logic)
        if (positionIndex === 0) {
          x = 0; scale = 1.1; opacity = 1; zIndex = 30;
        } else if (positionIndex === 1) {
          x = 800; scale = 0.6; opacity = 0.9; zIndex = 20;
        } else if (positionIndex === planetsData.length - 1) {
          x = -800; scale = 0.6; opacity = 0.9; zIndex = 20;
        } else {
          x = positionIndex === 2 ? 1400 : -1400;
          scale = 0.3; opacity = 0; zIndex = 10;
        }
      }
      
      gsap.set(planet, { x, scale, opacity, zIndex });
    });
  }, [isMobile, currentPlanetIndex]);

  useGSAP(() => {
    gsap.to('.orbit-ring', {
      rotation: 360,
      duration: 80,
      repeat: -1,
      ease: 'none',
      force3D: true,
    });

    planetImagesRef.current.forEach((planetImage, index) => {
      if (planetImage) {
        gsap.to(planetImage, {
          rotation: 360,
          duration: 120,
          repeat: -1,
          ease: 'none',
          force3D: true,
        });
      }
    });

    gsap.to('.orbit-planet-1', { rotation: 360, duration: 45, repeat: -1, ease: 'none' });
    gsap.to('.orbit-planet-1 .planet-body', { rotation: -360, duration: 45, repeat: -1, ease: 'none' });
    gsap.to('.orbit-planet-2', { rotation: 360, duration: 55, repeat: -1, ease: 'none' });
    gsap.to('.orbit-planet-2 .planet-body', { rotation: -360, duration: 55, repeat: -1, ease: 'none' });
    gsap.to('.orbit-planet-3', { rotation: 360, duration: 65, repeat: -1, ease: 'none' });
    gsap.to('.orbit-planet-3 .planet-body', { rotation: -360, duration: 65, repeat: -1, ease: 'none' });
    gsap.to('.orbit-planet-4', { rotation: 360, duration: 70, repeat: -1, ease: 'none' });
    gsap.to('.orbit-planet-4 .planet-body', { rotation: -360, duration: 70, repeat: -1, ease: 'none' });
    gsap.to('.orbit-planet-5', { rotation: 360, duration: 50, repeat: -1, ease: 'none' });
    gsap.to('.orbit-planet-5 .planet-body', { rotation: -360, duration: 50, repeat: -1, ease: 'none' });
    gsap.to('.orbit-planet-6', { rotation: 360, duration: 60, repeat: -1, ease: 'none' });
    gsap.to('.orbit-planet-6 .planet-body', { rotation: -360, duration: 60, repeat: -1, ease: 'none' });
  }, []);

  const updatePlanetInfo = (index) => {
    const planet = planetsData[index];
    
    if (topLeftGlowRef.current && topRightGlowRef.current) {
      const glowColor = planet.glowColor.replace('0.6', '0.3');
      
      gsap.to([topLeftGlowRef.current, topRightGlowRef.current], {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          if (topLeftGlowRef.current && topRightGlowRef.current) {
            topLeftGlowRef.current.style.background = `radial-gradient(circle at top left, ${glowColor}, transparent 60%)`;
            topRightGlowRef.current.style.background = `radial-gradient(circle at top right, ${glowColor}, transparent 60%)`;
            
            gsap.to([topLeftGlowRef.current, topRightGlowRef.current], {
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
            });
          }
        }
      });
    }
    
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          if (titleRef.current) {
            titleRef.current.textContent = planet.name;
            gsap.to(titleRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
          }
        }
      });
    }

    if (infoCardsRef.current.length > 0) {
      gsap.to(infoCardsRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.25,
        stagger: 0.03,
        ease: 'power2.in',
        onComplete: () => {
          document.getElementById('planet-galaxy').textContent = planet.galaxy;
          document.getElementById('planet-diameter').textContent = planet.diameter;
          document.getElementById('planet-day').textContent = planet.dayLength;
          document.getElementById('planet-temp').textContent = planet.temperature;
          document.getElementById('planet-climate').textContent = planet.climate;
          
          gsap.to(infoCardsRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.25,
            stagger: 0.03,
            ease: 'power2.out',
          });
        }
      });
    }
  };

  const rotatePlanets = (newCenterIndex) => {
    if (isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    updatePlanetInfo(newCenterIndex);
    
    const planets = planetsRef.current;
    const planetCount = planetsData.length;
    
    planets.forEach((planet, index) => {
      if (!planet) return;
      
      const positionIndex = (index - newCenterIndex + planetCount) % planetCount;
      
      let targetX, targetScale, targetOpacity, targetZIndex;
      
      // Mobile positioning
      if (isMobile) {
        if (positionIndex === 0) {
          targetX = 0;
          targetScale = 1.2; // Reduced from 1.5 to 1.2
          targetOpacity = 1;
          targetZIndex = 30;
        } else {
          targetX = 0;
          targetScale = 0;
          targetOpacity = 0;
          targetZIndex = 0;
        }
      } else {
        // Desktop positioning
        if (positionIndex === 0) {
          targetX = 0;
          targetScale = 1.1;
          targetOpacity = 1;
          targetZIndex = 30;
        } else if (positionIndex === 1) {
          targetX = 800;
          targetScale = 0.6;
          targetOpacity = 0.9;
          targetZIndex = 20;
        } else if (positionIndex === planetCount - 1) {
          targetX = -800;
          targetScale = 0.6;
          targetOpacity = 0.9;
          targetZIndex = 20;
        } else {
          targetX = positionIndex === 2 ? 1400 : -1400;
          targetScale = 0.3;
          targetOpacity = 0;
          targetZIndex = 10;
        }
      }
      
      const baseDuration = 1.2;
      const velocityFactor = Math.min(1, Math.abs(scrollVelocity.current) / 300);
      const duration = baseDuration * (1 - velocityFactor * 0.3);
      
      gsap.to(planet, {
        x: targetX,
        scale: targetScale,
        opacity: targetOpacity,
        zIndex: targetZIndex,
        duration: Math.max(0.5, duration),
        ease: "power2.inOut",
        force3D: true,
        onComplete: () => {
          if (index === planetCount - 1) {
            isAnimatingRef.current = false;
            setCurrentPlanetIndex(newCenterIndex);
            scrollVelocity.current = 0;
          }
        }
      });
    });
  };

  const handleWheel = (e) => {
    e.preventDefault();
    
    const now = Date.now();
    const deltaTime = now - lastScrollTime.current;
    lastScrollTime.current = now;
    
    if (deltaTime > 0) {
      scrollVelocity.current = (e.deltaY / deltaTime) * 1000;
    }
    
    if (!isAnimatingRef.current) {
      const direction = Math.sign(e.deltaY);
      const newIndex = (currentPlanetIndex + direction + planetsData.length) % planetsData.length;
      
      rotatePlanets(newIndex);
    }
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;
    
    if (Math.abs(deltaY) > 50 && !isAnimatingRef.current) {
      const direction = deltaY > 0 ? 1 : -1;
      const newIndex = (currentPlanetIndex + direction + planetsData.length) % planetsData.length;
      rotatePlanets(newIndex);
    }
  };

  useEffect(() => {
    const updateAnimation = () => {
      if (scrollVelocity.current !== 0) {
        scrollVelocity.current *= 0.95;
        
        if (Math.abs(scrollVelocity.current) < 0.5) {
          scrollVelocity.current = 0;
        }
      }
      
      animationRef.current = requestAnimationFrame(updateAnimation);
    };
    
    animationRef.current = requestAnimationFrame(updateAnimation);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentPlanetIndex]);

  const currentPlanet = planetsData[currentPlanetIndex];

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-screen overflow-hidden bg-gradient-to-b from-[#0f1229] via-[#1a1545] to-[#0a0e27]"
    >
      <Navigation onMenuToggle={setMobileMenuOpen} />
      
      <BackgroundEffects 
        glowColor={currentPlanet.glowColor} 
        topLeftGlowRef={topLeftGlowRef}
        topRightGlowRef={topRightGlowRef}
      />
      
      {/* Add conditional opacity for planet info when menu is open */}
      <div className={`transition-opacity duration-300 ${
        mobileMenuOpen && isMobile ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <PlanetInfo 
          currentPlanet={currentPlanet}
          titleRef={titleRef}
          infoCardsRef={infoCardsRef}
        />
      </div>
      
      {/* FIXED: Add conditional hiding for planet container when menu is open */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
        isMobile 
          ? (mobileMenuOpen ? 'pt-80 opacity-0 pointer-events-none' : 'pt-32 opacity-100')  
          : 'pt-32 sm:pt-48 md:pt-56 lg:pt-64'
      }`}>
        <OrbitalSystem />
        
        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          isMobile 
            ? mobileMenuOpen ? 'scale-50 opacity-0' : 'scale-[0.6] opacity-100' // Reduced from scale-[0.7]
            : 'scale-[0.4] sm:scale-[0.5] md:scale-[0.7] lg:scale-100'
        }`}>
          {planetsData.map((planet, index) => {
            const positionIndex = (index - currentPlanetIndex + planetsData.length) % planetsData.length;
            const isCenter = positionIndex === 0;
            const isLeft = positionIndex === planetsData.length - 1;
            const isRight = positionIndex === 1;
            
            return (
              <div
                key={planet.name}
                ref={(el) => planetsRef.current[index] = el}
                className="absolute will-change-transform"
                style={{ 
                  left: '0', 
                  top: isMobile ? '-150px' : '-120px', // Adjusted from -180px to -150px
                  marginLeft: isMobile ? '-250px' : '-250px' // Adjusted from -300px to -250px
                }}
              >
                <div className="relative">
                  <div
                    ref={(el) => planetImagesRef.current[index] = el}
                    className={`${isMobile ? 'w-[500px] h-[500px]' : 'w-[500px] h-[500px]'}`} // Reduced from 600px to 500px
                  >
                    <img
                      src={planet.image}
                      alt={planet.name}
                      className="rounded-full"
                      style={{
                        filter: `drop-shadow(0 0 ${isCenter ? (isMobile ? '60px' : '70px') : '35px'} ${planet.glowColor}) brightness(${isCenter ? 1.1 : 0.9})`, // Reduced from 80px to 60px
                      }}
                      priority={isCenter}
                    />
                  </div>
                  
                  {isCenter && (
                    <>
                      <div
                        className="absolute -inset-12 rounded-full blur-2xl -z-10 pointer-events-none" // Reduced from -inset-16 and blur-3xl
                        style={{
                          background: `radial-gradient(circle, ${planet.glowColor.replace('0.6', '0.4')} 0%, transparent 70%)`,
                        }}
                      />
                      <div
                        className="absolute -inset-20 rounded-full blur-[80px] -z-20 pointer-events-none opacity-40" // Reduced from -inset-24 and blur-[100px]
                        style={{
                          background: `radial-gradient(circle, ${planet.glowColor.replace('0.6', '0.3')} 0%, transparent 60%)`,
                        }}
                      />
                    </>
                  )}

                  {/* Hide planet names on mobile */}
                  {isLeft && !isMobile && (
                    <p className="hidden lg:block absolute top-[45%] -translate-y-1/2 right-[-80px] text-white text-sm tracking-[0.35em] whitespace-nowrap">
                      {planet.name}
                    </p>
                  )}
                  
                  {isRight && !isMobile && (
                    <p className="hidden lg:block absolute top-[45%] -translate-y-1/2 left-[-90px] text-white text-sm tracking-[0.35em] whitespace-nowrap">
                      {planet.name}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Hide mobile controls when menu is open */}
      {!mobileMenuOpen && <MobileControls />}
    </div>
  );
}