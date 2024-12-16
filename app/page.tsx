import LoginView from "./src/views/loginView";
import BgCaffe from "./src/assets/coffeBG.png";
import logoDelSud from "./src/assets/delSudFooter.png";

export default function Home() {
  return (
    <main className="w-screen h-screen flex p-0 m-0">
       <div className="hidden md:flex md:w-1/2 bg-primary relative">
    <img src={BgCaffe.src} alt="Fondo de café" className="w-full h-full object-cover" />
    <img src={logoDelSud.src} alt="Logo Del Sud" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2" />
  </div>
      <div className="hidden md:flex md:w-1/2  flex-col justify-center items-center">
        <LoginView />
      </div>
    </main>
  );
}
