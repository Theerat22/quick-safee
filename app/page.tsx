'use client'; // This marks the file as a client component

import { useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';

const center = { lat: 13.73113567541045, lng: 100.78116724040248 }; // Eiffel Tower coordinates

const Home = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div className="animate-pulse h-full bg-gray-200"></div>;
  }

  const calculateRoute = async () => {
    if (!originRef.current?.value || !destinationRef.current?.value) {
      alert('กรุณากรอกที่เกิดเหตุ');
      return;
    }
  
    const directionsService = new google.maps.DirectionsService();
    try {
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: google.maps.TravelMode.DRIVING,
      });
  
      if (
        results.routes &&
        results.routes.length > 0 &&
        results.routes[0].legs &&
        results.routes[0].legs.length > 0
      ) {
        const leg = results.routes[0].legs[0];
  
        setDirectionsResponse(results);
        setDistance(leg.distance ? leg.distance.text : 'Distance not available');
        setDuration(leg.duration ? leg.duration.text : 'Duration not available');
      } else {
        console.error('No route found');
        setDistance('No route found');
        setDuration('No route found');
      }
    } catch (error) {
      console.error('Error calculating route:', error);
      setDistance('Error calculating route');
      setDuration('Error calculating route');
    }
  };
  
  

  const clearRoute = () => {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    if (originRef.current) originRef.current.value = '';
    if (destinationRef.current) destinationRef.current.value = '';
  };

  return (
    <div className="relative flex flex-col items-center h-screen w-screen">
      {/* Google Map */}
      <div className="absolute left-0 top-0 h-full w-full">
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </div>

      {/* Controls */}
      <div className="absolute z-10 p-6 bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4 sm:mx-2 lg:max-w-2xl xl:max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          {/* Origin Input */}
          
          <div className="flex-grow text-black">
            <Autocomplete>
              <input
                ref={originRef}
                type="text"
                placeholder="ต้นทาง"
                className="w-full p-3 border rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </Autocomplete>
          </div>
          
          {/* Destination Input */}
          <div className="flex-grow text-black">
            <Autocomplete>
              <input
                ref={destinationRef}
                type="text"
                placeholder="ที่เกิดเหตุ"
                className="w-full p-3 border rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </Autocomplete>
          </div>

          {/* Action Buttons */}
          <div className="flex sm:space-x-2 space-x-0 sm:flex-row flex-col text-black">
            <button
              onClick={calculateRoute}
              className="bg-pink-500 text-white py-3 px-6 rounded-md hover:bg-pink-600 focus:outline-none transition-all duration-200 ease-in-out w-full sm:w-auto"
            >
              คำนวณระยะทาง
            </button>
            <button
              onClick={clearRoute}
              className="bg-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-400 focus:outline-none transition-all duration-200 ease-in-out mt-2 sm:mt-0 sm:w-auto w-full"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mt-6 justify-center items-center">
            {/* Distance Display */}
            <div className="text-lg text-gray-800">
              ระยะทาง: {distance}
            </div>
            {/* Duration Display */}
            <div className="text-lg text-gray-800">
              เวลาที่ใช้: {duration}
            </div>
            {/* Location Button */}
            <button
              className="text-blue-600 font-bold underline"
              onClick={() => {
                if (destinationRef.current?.value) {
                map?.panTo(center);
                map?.setZoom(15);
                } else{
                  alert('กรุณากรอกที่เกิดเหตุ');
                }
              }}
            >
              ที่เกิดเหตุ
            </button>
          </div>
          </div>


    </div>
  );
};

export default Home;
