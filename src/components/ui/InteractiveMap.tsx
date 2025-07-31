import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface InteractiveMapProps {
  className?: string;
}

export function InteractiveMap({ className = '' }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize OpenLayers map
    const initMap = async () => {
      try {
        // Using OpenStreetMap with OpenRouteService styling
        const mapHtml = `
          <iframe
            width="100%"
            height="100%"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            src="https://www.openstreetmap.org/export/embed.html?bbox=77.3089%2C28.3670%2C77.3189%2C28.3770&layer=mapnik&marker=28.3720%2C77.3139"
            style="border: 0; border-radius: 12px;"
          ></iframe>
        `;
        
        if (mapRef.current) {
          mapRef.current.innerHTML = mapHtml;
        }
      } catch (error) {
        console.error('Error loading map:', error);
        // Fallback to static map
        if (mapRef.current) {
          mapRef.current.innerHTML = `
            <div class="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800 rounded-xl">
              <div class="text-center">
                <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <p class="text-gray-600 dark:text-gray-400 font-medium">Faridabad, Haryana</p>
                <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">
                  B-334, Opp. PNB ATM, Nehru Ground NIT<br />
                  Faridabad 121001, India
                </p>
              </div>
            </div>
          `;
        }
      }
    };

    initMap();
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={mapRef} 
        className="w-full h-full min-h-[300px] rounded-xl overflow-hidden shadow-lg"
      />
      <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-md">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">ATINAR HQ</span>
        </div>
      </div>
    </div>
  );
}