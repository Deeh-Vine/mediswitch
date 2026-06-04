import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  MapPin,
  AlertTriangle,
  Navigation,
  Phone
} from 'lucide-react';
import { pharmacies } from '../data/data.js';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Critical Leaflet Vite Fix - using a programmatic divIcon to circumvent missing image pin assets
const customPin = new L.divIcon({
  className: 'custom-pin',
  html: `<div style="background-color: var(--color-primary-mid); width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><div style="background-color: white; width: 6px; height: 6px; border-radius: 50%;"></div></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24]
});

// Programmatic map refocuser
function RecenterMap({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || 13, {
        animate: true,
        duration: 1.2
      });
    }
  }, [center, zoom, map]);
  return null;
}

export default function PharmacyMap() {
  const location = useLocation();
  const navigate = useNavigate();

  // Route state parameters (passed from Results generic card redirection)
  const { pharmacyIds, drugName } = location.state || {};

  // Filter pharmacies if redirected, otherwise show overall store directory
  const displayedPharmacies = useMemo(() => {
    if (pharmacyIds && Array.isArray(pharmacyIds) && pharmacyIds.length > 0) {
      return pharmacies.filter((p) => pharmacyIds.includes(p.id));
    }
    return pharmacies;
  }, [pharmacyIds]);

  // Selected store states
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [mapCenter, setMapCenter] = useState([6.4528, 3.3905]); // Default starting coordinate on Lagos Island
  const [mapZoom, setMapZoom] = useState(11);

  // Auto-center the lens to the first filtered stockist pharmacy if state exists
  useEffect(() => {
    if (displayedPharmacies.length > 0) {
      const initialStore = displayedPharmacies[0];
      setSelectedPharmacy(initialStore);
      setMapCenter([initialStore.lat, initialStore.lng]);
      setMapZoom(13);
    }
  }, [displayedPharmacies]);

  const handleSelectPharmacy = (pharm) => {
    setSelectedPharmacy(pharm);
    setMapCenter([pharm.lat, pharm.lng]);
    setMapZoom(14);
  };

  return (
    <div className="min-h-screen bg-bg-warm flex flex-col font-sans text-dark-navy">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 flex flex-col space-y-6">
        
        {/* Dynamic header and navigational controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <button
              onClick={() => navigate('/home')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-sec hover:text-primary-dark transition-colors tracking-wide uppercase cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to search app</span>
            </button>
            <h2 className="text-3xl font-serif font-bold text-primary-dark">
              Pharmacy Locator
            </h2>
          </div>

          {/* Filtering notification if drugStock is filtered */}
          {drugName && (
            <div className="bg-primary-pale border border-primary-light/30 px-4 py-2.5 rounded-xl flex items-center gap-2.5 text-xs md:text-sm text-primary-dark font-semibold">
              <span className="w-2 h-2 rounded-full bg-primary-mid animate-ping"></span>
              <span>
                Verified stock alternative for <span className="underline font-bold">{drugName}</span>
              </span>
            </div>
          )}
        </div>

        {/* Dual-Pane Layout frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-2xl border border-border-dev overflow-hidden shadow-xs">
          
          {/* L: Directory sidebar panel scroll (5 columns) */}
          <div className="lg:col-span-5 h-[400px] lg:h-[600px] flex flex-col border-b lg:border-b-0 lg:border-r border-border-dev">
            
            <div className="p-4 bg-gray-50 border-b border-border-dev flex justify-between items-center shrink-0">
              <span className="text-xs font-bold text-text-sec uppercase tracking-wider">
                Store Directories ({displayedPharmacies.length})
              </span>
              <span className="text-[10px] font-bold text-primary-dark bg-primary-pale px-2 py-0.5 rounded-full uppercase">
                Stock Verified
              </span>
            </div>

            {displayedPharmacies.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center p-6 text-center space-y-4">
                <MapPin className="w-12 h-12 text-text-mut" />
                <h4 className="font-serif font-bold text-dark-navy">No stockist found</h4>
                <p className="text-xs text-text-sec">We currently have no verified partner list targeting this request.</p>
              </div>
            ) : (
              <div className="flex-grow overflow-y-auto divide-y divide-border-dev">
                {displayedPharmacies.map((pharm) => {
                  const isActive = selectedPharmacy?.id === pharm.id;
                  return (
                    <div
                      key={pharm.id}
                      onClick={() => handleSelectPharmacy(pharm)}
                      className={`p-4 transition-all cursor-pointer text-left space-y-2.5 ${
                        isActive 
                          ? 'bg-primary-pale/30 border-l-4 border-l-primary-mid' 
                          : 'hover:bg-bg-warm/30 border-l-4 border-l-transparent'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-sm text-dark-navy hover:text-primary-dark transition-colors">
                          {pharm.name}
                        </h4>
                      </div>

                      <p className="text-xs text-text-sec leading-relaxed">
                        {pharm.address}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-text-mut font-medium pt-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-primary-mid shrink-0" />
                          <span>{pharm.area}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-primary-mid shrink-0" />
                          <span>{pharm.phone}</span>
                        </div>
                      </div>

                      {/* Map Focus action */}
                      <div className="pt-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectPharmacy(pharm);
                          }}
                          className={`text-[10px] uppercase tracking-wider font-bold py-1.5 px-3 rounded-lg transition-all inline-flex items-center gap-1 border ${
                            isActive 
                              ? 'bg-primary-dark border-transparent text-white shadow-xs' 
                              : 'border-border-dev bg-white hover:border-primary-mid text-text-sec hover:text-primary-dark'
                          }`}
                        >
                          <Navigation className="w-3 h-3" />
                          <span>Pilot Coordinates</span>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

            {/* Verification Footer Alert */}
            <div className="p-4 bg-savings-bg/40 text-center text-xs text-text-sec border-t border-border-dev shrink-0 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-savings-amber shrink-0 mt-0.5" />
              <span className="text-[10px] leading-relaxed text-left">
                Stock availability is updated dynamically. We recommend dialling partner pharmacies to confirm immediate inventory reservations.
              </span>
            </div>

          </div>

          {/* R: Interactive Map Section canvas (7 columns) */}
          <div className="lg:col-span-7 h-[450px] lg:h-[600px] bg-bg-warm relative">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              style={{ width: '100%', height: '100%' }}
              scrollWheelZoom={true}
              className="z-10"
            >
              {/* FlyTo center handler */}
              <RecenterMap center={mapCenter} zoom={mapZoom} />

              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Render partner stocks */}
              {displayedPharmacies.map((pharm) => (
                <Marker
                  key={pharm.id}
                  position={[pharm.lat, pharm.lng]}
                  icon={customPin}
                  eventHandlers={{
                    click: () => {
                      setSelectedPharmacy(pharm);
                    }
                  }}
                >
                  <Popup>
                    <div className="p-1 space-y-1 text-dark-navy text-xs min-w-[150px] font-sans">
                      <strong className="block text-sm font-bold text-primary-dark leading-tight">
                        {pharm.name}
                      </strong>
                      <p className="text-text-sec text-[10px] leading-normal font-medium">
                        {pharm.address}
                      </p>
                      <span className="block text-primary-mid text-[10px] font-bold uppercase tracking-wider mt-1">
                        ✓ Certified Alternative Partner
                      </span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
