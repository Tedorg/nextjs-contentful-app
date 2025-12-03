export default function Maps({ coordinates }) {
  if (!coordinates || coordinates.length !== 2) return null;

  const [lat, lng] = coordinates;
  console.log(coordinates)
  const src = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <div className="w-full h-[400px] border-0 bg-gray-100">
      <iframe
                
        src={src}
        width="100%"
        height="100%"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        style={{ border: 0,  }}
        
      ></iframe>
    </div>
  );
}
