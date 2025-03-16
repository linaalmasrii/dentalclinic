import React, { useEffect } from 'react';

const MapComponent = () => {
    useEffect(() => {
        // Load Google Maps script dynamically
        const loadScript = (src) => {
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => {
                    resolve();
                };
                document.body.appendChild(script);
            });
        };

        const initMap = () => {
            const map = new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: 46.0822, lng: 18.2237 }, // Latitude and Longitude for Pécs
                zoom: 15,
            });

            // You can also add a marker for the location
            new window.google.maps.Marker({
                position: { lat: 46.0822, lng: 18.2237 }, // Same coordinates
                map,
                title: 'Pécs, Ferencesek utcája 21, 7622',
            });
        };

        loadScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyBQZPTvkB7EU8ke_bG60eNuFU8Sqma4QcQ&callback=initMap`)
            .then(() => {
                window.initMap = initMap; // Define the callback function for the script
            });

        // Cleanup function to remove the script when the component unmounts
        return () => {
            const script = document.querySelector(`script[src*="maps.googleapis.com"]`);
            if (script) {
                script.remove();
            }
        };
    }, []);

    return (
        <div style={{ width: '100%', height: '400px' }} id="map">
            {/* Google Map will be rendered here */}
        </div>
    );
};

export default MapComponent;