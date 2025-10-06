import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const InteractiveMap = ({ locations }) => {
  // Center of Mansoura, Dakahlia (approximate)
  const center = [31.1656, 31.7178];

  const getMarkerColor = (type) => {
    switch (type) {
      case 'main': return 'red';
      case 'city': return 'blue';
      case 'village': return 'green';
      default: return 'gray';
    }
  };

  const createCustomIcon = (color) => {
    return new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  };

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: '600px', width: '100%' }}
      className="rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={location.coordinates}
          icon={createCustomIcon(getMarkerColor(location.type))}
        >
          <Popup>
            <div className="text-right" dir="rtl">
              <h3 className="font-bold text-lg mb-2">{location.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{location.description}</p>
              <div className="text-xs text-gray-500">
                <p>عدد السكان: {location.population}</p>
                <p>الأنشطة: {location.activities}</p>
              </div>
            </div>
          </Popup>
          <Circle
            center={location.coordinates}
            radius={500}
            pathOptions={{
              color: getMarkerColor(location.type),
              fillColor: getMarkerColor(location.type),
              fillOpacity: 0.1
            }}
          />
        </Marker>
      ))}
    </MapContainer>
  );
};

export default InteractiveMap;
