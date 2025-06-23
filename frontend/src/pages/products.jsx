// Refactored and improved BeanVoyage.js
import React from 'react';

// Sidebar component
const Sidebar = ({ items, activeIndex = 0 }) => (
  <div className="w-48 bg-orange-50 border-r border-orange-200">
    <div className="h-20 bg-orange-500 flex items-center justify-center">
      <span className="text-white text-3xl font-bold" style={{ fontFamily: 'Pathway Gothic One, sans-serif' }}>
        ps
      </span>
    </div>
    <div className="bg-orange-500 px-4 py-2">
      <h2 className="text-white text-lg" style={{ fontFamily: 'Neuton, serif' }}>
        Buddies
      </h2>
    </div>
    <div className="py-2">
      {items.map((item, index) => (
        <div
          key={index}
          className={`px-4 py-2 cursor-pointer transition-colors rounded-md ${
            index === activeIndex ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-orange-100'
          }`}
        >
          <span style={{ fontFamily: 'Arimo, sans-serif' }}>{item}</span>
        </div>
      ))}
    </div>
  </div>
);

// Card component
const Card = () => (
  <div className="bg-white rounded-lg shadow-sm p-4">
    <div className="h-32 bg-gray-300 rounded mb-4"></div>
    <div className="space-y-1">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-3 bg-gray-400 rounded w-3/4"></div>
      ))}
    </div>
  </div>
);

// Right Panel component
const RightPanel = () => (
  <div className="w-80 bg-orange-500 p-6">
    <h2 className="text-white text-2xl mb-6" style={{ fontFamily: 'Arimo, sans-serif', fontWeight: 'bold' }}>
      Jean's Beans
    </h2>
    <div className="bg-white h-64 rounded mb-6"></div>
    <div className="text-white space-y-4">
      <div className="text-lg" style={{ fontFamily: 'Arimo, sans-serif' }}>
        yapyapyapperino<br />yapyapyapperino
      </div>
      <ul className="space-y-2 ml-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i} className="flex items-center">
            <span className="w-2 h-2 bg-amber-800 rounded-full mr-3"></span>
            <span style={{ fontFamily: 'Arimo, sans-serif' }}>yap</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default function BeanVoyage() {
  const sidebarItems = [
    'Bean Voyage',
    'Beanery',
    'Brewology',
    'Cafinity',
    'Kratos Coffee',
    'Pocofino',
    'Roastopia',
    'The Bean Boutique',
    'The Coffee Emporium',
    'Zussy Co.'
  ];

  return (
    <div className="relative min-h-screen bg-orange-50 flex">
      {/* Sidebar */}
      <Sidebar items={sidebarItems} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="flex justify-end items-center p-4">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-full border border-orange-500 px-4 py-1 focus:outline-none"
          />
          <div className="ml-4 w-8 h-8 border-2 border-orange-500 rounded flex items-center justify-center">
            <div className="w-4 h-4 border border-orange-500 rounded"></div>
          </div>
          <div className="ml-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>

        <div className="flex flex-1">
          {/* Center Content */}
          <div className="flex-1 p-8">
            <h1 className="text-4xl text-gray-800 mb-8" style={{ fontFamily: 'Arimo, sans-serif', fontWeight: 'bold' }}>
              Bean Voyage
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <RightPanel />
        </div>
      </div>

      {/* Google Fonts */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Pathway+Gothic+One&family=Neuton:wght@400&family=Arimo:wght@400;700&display=swap');
      `}</style>
    </div>
  );
}
