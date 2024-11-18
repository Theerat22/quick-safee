'use client'; // This marks the file as a client component

import { useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import { motion } from 'framer-motion';
import { Disclosure } from '@headlessui/react'
import InfoTable from './components/InfoTable';

const center = { lat: 13.73113567541045, lng: 100.78116724040248 };

/*************  ✨ Codeium Command ⭐  *************/
/**
 * The main component of the app.
 *
 * This component renders the Google Map, form controls, and action buttons.
 *
 * It also handles the calculation of the route and displays the distance
 * and duration of the route.
 *
 * @returns {JSX.Element}
 *   The JSX element representing the main component.
 */
/******  c8458c05-9c9a-44f0-9a0b-ab72b636831d  *******/
const Home = () => {

  const [isVisible, setIsVisible] = useState(false);
  const handleClick = () => setIsVisible(!isVisible);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  console.log(map);
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
    <div className="">
      <InfoTable />
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
      <div className="absolute z-20 p-6 bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4 sm:mx-2 lg:max-w-2xl xl:max-w-4xl">
  {/* Mobile view: Disclosure component */}
  <div className="sm:hidden">
    <Disclosure>
      {({ open }) => (
        <div>
          {/* Disclosure Button for mobile */}
          <Disclosure.Button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md w-full text-center font-bold">
            {open ? 'ปิด' : 'เปิด'}ฟอร์ม
          </Disclosure.Button>

          {/* Content that will be toggled on mobile */}
          <Disclosure.Panel className="sm:flex sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 flex-col">
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
            <div className="flex sm:space-x-2 space-x-0 sm:flex-row flex-col text-black font-bold">
              <button
                onClick={calculateRoute}
                className="bg-green-600 text-white py-3 px-6 font-bold rounded-md hover:bg-green-700 focus:outline-none transition-all duration-200 ease-in-out w-full sm:w-auto"
              >
                คำนวณระยะทาง
              </button>
              <button
                onClick={clearRoute}
                className="bg-gray-300 text-gray-700 py-3 px-4 rounded-md font-bold text-center hover:bg-gray-400 focus:outline-none transition-all duration-200 ease-in-out mt-2 sm:mt-0 sm:w-auto w-full"
              >
                เคลียร์
              </button>
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  </div>

      {/* Desktop view: Static form */}
      <div className="sm:flex sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 hidden sm:block">
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
            className="bg-green-700 text-white py-3 px-6 font-bold rounded-md hover:bg-green-800 focus:outline-none transition-all duration-200 ease-in-out w-full sm:w-auto"
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

      {/* Distance and Duration display */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mt-6 justify-center items-center">
        {/* Distance Display */}
        <div className="text-lg text-gray-800">
          ระยะทาง: {distance}
        </div>
        {/* Duration Display */}
        <div className="text-lg text-gray-800">
          เวลาที่ใช้: {duration}
        </div>

        <button
          className="text-red-500 font-bold underline"
          onClick={handleClick}
        >
          ทดสอบ alert
        </button>
      </div>
    </div>


          {isVisible && (
        <motion.div
          className="z-50 fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-4 mx-2 my-2 rounded-lg shadow-lg w-100 lg:p-6 w-100"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-semibold text-center text-red-500 lg:text-5xl">‼️ เกิดอุบัติเหตุ ‼️</h2>
            <video
              width="640"
              height="360"
              className="rounded-lg shadow-lg mt-4"
              loop
              muted
              autoPlay
            >
              <source src="/accident2.mp4" type="video/mp4" />
            </video>


              <div className="mt-6">
                <p className="text-center text-black"><span className='font-bold'>ประเภทอุบัติเหตุ :</span> อุบัติเหตุหนัก</p>
                <p className="text-center mt-2 text-black"><span className='font-b old'>เหตุไฟไหม้ :</span> ❌</p>
                <p className="text-center mt-2 text-black"><span className='font-bold'>สถานที่เกิดเหตุ :</span> แยกสวนสยาม ถนนเสรีไทย เขตคันนายาว</p>
                <p className="text-center mt-2 text-black font-bold">เวลา : <span className='underline'>17:13 P.M.</span> </p>
              </div>
              {/* <button
              className="mt-6 px-4 py-2 bg-blue-500 text-white font-bold rounded-md block mx-auto"
              onClick={checkRoute}
            >
              ดูเส้นทาง
            </button> */}
            <button
              className="mt-3 px-4 py-2 bg-red-500 text-white font-bold rounded-md block mx-auto"
              onClick={handleClick}
            >
              ปิด
            </button>
            
          </motion.div>
        </motion.div>
      )}



    </div>
    </div>
  );
};

export default Home;
