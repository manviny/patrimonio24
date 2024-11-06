
// Verificar si el navegador soporta geolocalización
document.getElementById("get-location").addEventListener("click", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        document.getElementById("location-info").textContent = 
          `Latitud: ${latitude.toFixed(6)}, Longitud: ${longitude.toFixed(6)}`;
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

// Registro del Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(() => {
    console.log("Service Worker registrado.");
  }).catch((error) => {
    console.error("Error al registrar el Service Worker:", error);
  });
}
