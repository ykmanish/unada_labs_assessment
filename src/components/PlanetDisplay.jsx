import {  useEffect } from 'react';

export function PlanetInfo({ currentPlanet, titleRef, infoCardsRef }) {
  useEffect(() => {
    if (infoCardsRef.current.length > 0) {
      document.getElementById('planet-galaxy').textContent = currentPlanet.galaxy;
      document.getElementById('planet-diameter').textContent = currentPlanet.diameter;
      document.getElementById('planet-day').textContent = currentPlanet.dayLength;
      document.getElementById('planet-temp').textContent = currentPlanet.temperature;
      document.getElementById('planet-climate').textContent = currentPlanet.climate;
    }
  }, [currentPlanet]);

  return (
    <div className="relative z-40 flex flex-col items-center mt-4 sm:mt-6 lg:mt-8 px-4">
      <h1 
        ref={titleRef}
        className="text-white font-black small text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.2em] mb-6 sm:mb-8 lg:mb-12 text-center"
      >
        {currentPlanet.name}
      </h1>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 lg:gap-16 text-white max-w-full">
        <div ref={el => infoCardsRef.current[0] = el} className="text-center min-w-[80px]">
          <p className="text-[10px] sm:text-xs tracking-widest text-gray-400 mb-1 sm:mb-2">GALAXY</p>
          <p id="planet-galaxy" className="text-xs sm:text-sm font-light">{currentPlanet.galaxy}</p>
        </div>
        <div ref={el => infoCardsRef.current[1] = el} className="text-center min-w-[80px]">
          <p className="text-[10px] sm:text-xs tracking-widest text-gray-400 mb-1 sm:mb-2">DIAMETER</p>
          <p id="planet-diameter" className="text-xs sm:text-sm font-light">{currentPlanet.diameter}</p>
        </div>
        <div ref={el => infoCardsRef.current[2] = el} className="text-center min-w-[80px]">
          <p className="text-[10px] sm:text-xs tracking-widest text-gray-400 mb-1 sm:mb-2">DAY LENGTH</p>
          <p id="planet-day" className="text-xs sm:text-sm font-light">{currentPlanet.dayLength}</p>
        </div>
        <div ref={el => infoCardsRef.current[3] = el} className="text-center min-w-[80px]">
          <p className="text-[10px] sm:text-xs tracking-widest text-gray-400 mb-1 sm:mb-2">AVG TEMP</p>
          <p id="planet-temp" className="text-xs sm:text-sm font-light">{currentPlanet.temperature}</p>
        </div>
        <div ref={el => infoCardsRef.current[4] = el} className="text-center min-w-[80px]">
          <p className="text-[10px] sm:text-xs tracking-widest text-gray-400 mb-1 sm:mb-2">CLIMATE</p>
          <p id="planet-climate" className="text-xs sm:text-sm font-light">{currentPlanet.climate}</p>
        </div>
      </div>
    </div>
  );
}

export function BackgroundEffects({ glowColor, topLeftGlowRef, topRightGlowRef }) {
  return (
    <>
      <div
        ref={topLeftGlowRef}
        className="absolute top-0 left-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] pointer-events-none z-5 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at top left, ${glowColor.replace('0.6', '0.3')}, transparent 60%)` }}
      />
      <div
        ref={topRightGlowRef}
        className="absolute top-0 right-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] pointer-events-none z-5 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at top right, ${glowColor.replace('0.6', '0.3')}, transparent 60%)` }}
      />

      <div className="absolute inset-0 z-0">
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${2 + Math.random() * 3}s infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}

export function OrbitalSystem() {
  return (
    <>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-[0.4] sm:scale-[0.5] md:scale-[0.7] lg:scale-100">
        <div className="orbit-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-gray-600/50 rounded-full" />
        <div className="orbit-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] border border-gray-600/40 rounded-full" />
        <div className="orbit-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-gray-600/35 rounded-full" />
        <div className="orbit-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1600px] h-[1600px] border border-gray-600/30 rounded-full" />
        <div className="orbit-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2000px] h-[2000px] border border-gray-600/25 rounded-full" />
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.4] sm:scale-[0.5] md:scale-[0.7] lg:scale-100">
        <div className="orbit-planet-1 absolute left-0 top-0 pointer-events-none" style={{ width: '0', height: '0' }}>
          <div className="planet-body absolute w-8 h-8 rounded-full bg-gradient-to-br from-amber-300 to-orange-500 shadow-lg shadow-orange-400/60" style={{ left: '409px', top: '-4px' }} />
        </div>
        <div className="orbit-planet-2 absolute left-0 top-0 pointer-events-none" style={{ width: '0', height: '0' }}>
          <div className="planet-body absolute w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-600 shadow-lg shadow-purple-400/50" style={{ left: '586.5px', top: '-3.5px' }} />
        </div>
        <div className="orbit-planet-3 absolute left-0 top-0 pointer-events-none" style={{ width: '0', height: '0' }}>
          <div className="planet-body absolute w-6 h-6 rounded-full bg-gradient-to-br from-red-400 to-rose-600 shadow-lg shadow-red-400/50" style={{ left: '791px', top: '-3px' }} />
        </div>
        <div className="orbit-planet-4 absolute left-0 top-0 pointer-events-none" style={{ width: '0', height: '0' }}>
          <div className="planet-body absolute w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-amber-600 shadow-lg shadow-orange-400/40" style={{ left: '-793.5px', top: '-3.5px' }} />
        </div>
        <div className="orbit-planet-5 absolute left-0 top-0 pointer-events-none" style={{ width: '0', height: '0' }}>
          <div className="planet-body absolute w-5 h-5 rounded-full bg-gradient-to-br from-emerald-300 to-green-600 shadow-lg shadow-green-400/50" style={{ left: '-597.5px', top: '-2.5px' }} />
        </div>
        <div className="orbit-planet-6 absolute left-0 top-0 pointer-events-none" style={{ width: '0', height: '0' }}>
          <div className="planet-body absolute w-6 h-6 rounded-full bg-gradient-to-br from-cyan-300 to-blue-500 shadow-lg shadow-cyan-400/50" style={{ left: '269px', top: '-3px' }} />
        </div>
      </div>
    </>
  );
}

export function MobileControls() {
  return (
    <div className="md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-xs text-center z-50">
      <p>Swipe up or down to explore</p>
    </div>
  );
}
