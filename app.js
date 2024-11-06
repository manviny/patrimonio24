// Verificar si el navegador soporta geolocalización
document.getElementById("get-location").addEventListener("click", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        document.getElementById("location-info").textContent = 
          `Latitud: ${latitude.toFixed(6)}, Longitud: ${longitude.toFixed(6)}`;
        
        // Mostrar el mapa y centrarlo en la ubicación del usuario
        const map = L.map('map').setView([latitude, longitude], 13);
        document.getElementById("map").style.display = "block";
        
        // Agregar capa de mapa
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Agregar marcador en la ubicación del usuario
        L.marker([latitude, longitude]).addTo(map)
          .bindPopup('Tu ubicación actual')
          .openPopup();
      },
      (error) => {
        document.getElementById("location-info").textContent = 
          "Error al obtener la ubicación. Por favor, revisa los permisos de tu navegador.";
      }
    );
  } else {
    document.getElementById("location-info").textContent = 
      "Geolocalización no es soportada en este navegador.";
  }
});
/*
// Registro del Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(() => {
    console.log("Service Worker registrado.");
  }).catch((error) => {
    console.error("Error al registrar el Service Worker:", error);
  });
  */
}
