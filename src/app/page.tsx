import MainPage from "./components/MainPage";
import Calendar from "./components/Calendar";
import MapSection from "./components/MapSection";
import YoutubeSection from "./components/YoutubeSection";
import InfoSection from "./components/InfoSection";

export default function Home() {
  return ( 
    
    <main className="items-center p-2 overflow-x-hidden">
      <MainPage />
      <YoutubeSection/>
      <MapSection/>
      <InfoSection/>
      <Calendar/>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center mb-10">

        <div className="text-[#6b6969] text-sm"></div>
      </footer>
    </main>
  );
}
