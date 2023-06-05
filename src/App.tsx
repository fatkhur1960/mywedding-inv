import { AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import OnViewTransition from './animations/OnViewTransition';
import Transition from './animations/Transition';
import Content from './components/Content';
import Cover from './components/widgets/Cover';
import useImagePreloader from './components/Preloader';
import CoverBg from "./assets/CoverBg.jpg";
import Gallery4 from "./assets/gallery/gallery4.jpg";
import QrDana from "./assets/qr/qr_dana_fatkhur.jpg"
import './App.css';
import { ModalProvider } from './components/ModalContext';
import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig } from './utils/firebase';

const App = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const openContent = (e: any) => {
    e.preventDefault()

    const player = audioRef.current
    if (player) {
      audioPlay(player)
      setIsOpen(true)
    }
  }

  const audioPlay = (audio: HTMLAudioElement) => {
    audio.play();

    let InT = 0;
    const setVolume = 1; // Target volume level
    const speed = 0.05; // Rate of increase
    audio.volume = InT;
    const eAudio = setInterval(() => {
      InT += speed;
      audio.volume = parseFloat(InT.toFixed(3));
      if (parseFloat(InT.toFixed(3)) >= setVolume) {
        clearInterval(eAudio);
      }
    }, 50);
  }

  useImagePreloader([CoverBg, Gallery4, QrDana])

  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <ModalProvider>
        <main className='max-w-[100%] lg:max-w-xl lg:mx-auto overflow-x-hidden'>
          <div>
            <audio
              ref={audioRef}
              controls={false}
              preload=''
              loop
            >
              <source
                src="/audio.mp3"
                type="audio/mp3"
              />
              Your browser does not support the audio element.
            </audio>
          </div>
          <AnimatePresence initial={true}>
            {!isOpen ? (
              <Transition key="main">
                <Cover onOpen={openContent} />
              </Transition>
            ) : (
              <OnViewTransition variant='fadeInUp'>
                <Content player={audioRef.current} />
              </OnViewTransition>
            )}
          </AnimatePresence>
        </main>
      </ModalProvider>
    </FirebaseAppProvider>
  );
}

export default App;
