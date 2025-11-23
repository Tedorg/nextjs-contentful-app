export default function Footer() {
  const date = new Date().toLocaleString("de-CH", {
   
    year:"numeric"
  });

  return (
    <footer className="flex justify-end px-3 w-full h-10 px-1 py-4 fixed bottom-0  text-sm text-(--foreground)  mix-blend-hard-light">
      
      <span>© {date} Rahel Schmid – Alle Rechte vorbehalten.</span>
    </footer>
  );
}