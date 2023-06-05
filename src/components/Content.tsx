import Logo from "./widgets/Logo";
import CoverBg from "../assets/CoverBg.jpg";
import Gallery4 from "../assets/gallery/gallery4.jpg";
import WaveFooter from "../assets/WaveFooter";
import OnViewTransition from "../animations/OnViewTransition";
import GreetingForm from "./widgets/Greeting";
import ImageGallery from "./widgets/Gallery";
import LocationButton from "./widgets/LocationButton";
import Instagram from "./widgets/Instagram";
import Silvi from "../assets/silvi.png"
import Patur from "../assets/patur.png"
import queryString from "query-string";
import { FC, useMemo, useState } from "react";
import classNames from "classnames";
import { getFirestore } from "firebase/firestore";
import { FirestoreProvider, useFirebaseApp } from "reactfire";
import MusicLogo from "./widgets/MusicLogo";

const Content: FC<{ player: HTMLAudioElement | null }> = ({ player }) => {
    const firestoreInstance = getFirestore(useFirebaseApp());
    const [isPlaying, setIsPlaying] = useState(true);

    const invMode = useMemo(() => {
        const qs: { invMode?: string } = queryString.parse(window.location.search)
        return qs.invMode
    }, [])

    const handleAudio = () => {
        if (isPlaying) {
            player?.pause()
        } else {
            player?.play()
        }

        setIsPlaying(!isPlaying)
    }

    return (
        <section className={classNames('relative')}>
            <MusicLogo
                isPlaying={isPlaying}
                onClick={handleAudio}
            />
            <section className="w-full max-h-screen min-h-screen text-center flex items-center justify-center content-cover overflow-y-hidden" style={{
                background: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.9)), url(${CoverBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
                <div className="text-white mt-60">
                    <OnViewTransition transition={{ delay: 0.8 }}>
                        <h1 className='uppercase mb-4'>The Wedding of</h1>
                    </OnViewTransition>
                    <div className="font-gv text-4xl text-white inline-flex space-x-3 mb-4">
                        <OnViewTransition variant="slideInRight" transition={{ delay: 0.9 }}>
                            <div className='-mt-3'>Silvia</div>
                        </OnViewTransition>
                        <OnViewTransition transition={{ delay: 0.9 }}>
                            <div className='text-5xl'>&</div>
                        </OnViewTransition>
                        <OnViewTransition variant="slideInLeft" transition={{ delay: 0.9 }}>
                            <div className='mt-4'>Fatkhur</div>
                        </OnViewTransition>
                    </div>
                    <OnViewTransition transition={{ delay: 1.5 }}>
                        <div className='flex w-fit mx-auto items-center space-x-4 font-cormorant text-xl font-medium text-white'>
                            <p className='leading-none'>Senin</p>
                            <div className='border-r-2 border-l-2 px-2.5 border-white border-opacity-75 leading-none'>
                                <p className='text-center -mt-[8px]'>
                                    <span className='text-4xl leading-none'>12</span>
                                    <br />Jun
                                </p>
                            </div>
                            <p className='leading-none'>2023</p>
                        </div>
                    </OnViewTransition>
                </div>
            </section>

            <section className="w-full h-fit text-center">
                <div className="px-4 py-10">
                    <div className="mb-8">
                        <OnViewTransition>
                            <Logo />
                        </OnViewTransition>
                    </div>
                    <OnViewTransition transition={{ delay: 0.6 }}>
                        <div className="p-6 text-center bg-secondary text-white font-normal">
                            <p className="italic">QS. Ar-Rum Ayat 21</p>
                            <br />
                            <p>وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً ۗاِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ</p>
                            <br />
                            <p className="italic">"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."</p>
                        </div>
                    </OnViewTransition>
                    <OnViewTransition transition={{ delay: 0.65 }}>
                        <div className="flex justify-center -mt-4">
                            <img src="https://images.ctfassets.net/q40z6pfqje6o/5azAFJdIrJG1n0A3IzBLya/b85b012f5256618de1ef1efce94d065f/New_Project__42_.png" alt="" style={{ transform: "rotate(180deg)" }} width="100%" />
                        </div>
                    </OnViewTransition>
                </div>
            </section>

            <section className="w-full min-h-screen text-center relative px-4 py-4">
                <OnViewTransition>
                    <h3 className="font-cormorant mb-2 text-5xl leading-none italic">Assalamu'alaikum</h3>
                    <p className="text-sm">Dengan memohon Rahmat dan Ridho Allah SWT kami bermaksud untuk mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:</p>
                </OnViewTransition>
                <div className="grid grid-cols-1 md:grid-col-3 justify-center gap-4 mb-4">
                    <div>
                        <OnViewTransition variant="fadeInLeft" transition={{ delay: 0.6 }}>
                            <div className="animate__animated animate__fadeInLeft">
                                <div className="relative">
                                    <div className="w-80 h-80 mx-auto flex justify-center items-center p-12" style={{
                                        background: "url(https://api.our-wedding.link/uploads/assets/couple_decor_23.png)",
                                        backgroundSize: "cover",
                                    }}>
                                        <img
                                            src={Silvi}
                                            alt="silvia"
                                            className="w-full h-full rounded-full overflow-hidden mt-[10px] -z-10"
                                        />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h4 className="my-2 font-gv text-4xl text-secondary">Silvia Anisa, S.Pd.</h4>
                                    <div className="text-primary">
                                        <p className="font-semibold text-sm">Putri dari:</p>
                                        <p className="font-medium text-base">Bpk. Misriyanto &amp; Ibu Fatimah</p>
                                        <p className="italic text-sm">Pagedangan, Tumenggungan, Selomerto</p>
                                        <div className="instagram-profil mt-3">
                                            <Instagram username="slvnsaa_" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </OnViewTransition>
                    </div>
                    <div className="font-gv text-4xl text-primary text-center mt-9">
                        <OnViewTransition transition={{ delay: 0.7 }}>
                            <div className='text-7xl text-secondary text-center'>&</div>
                        </OnViewTransition>
                    </div>
                    <div>
                        <OnViewTransition variant="fadeInRight" transition={{ delay: 0.8 }}>
                            <div className="animate__animated animate__fadeInLeft">
                                <div className="relative">
                                    <div className="w-80 h-80 mx-auto flex justify-center items-center p-12" style={{
                                        background: "url(https://api.our-wedding.link/uploads/assets/couple_decor_23.png)",
                                        backgroundSize: "cover",
                                    }}>
                                        <img
                                            src={Patur}
                                            alt="patur"
                                            className="w-full h-full rounded-full overflow-hidden mt-[10px] -z-10"
                                        />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h4 className="my-2 font-gv text-4xl text-secondary">Fatkhurrohman, S.Kom.</h4>
                                    <div className="text-primary">
                                        <p className="font-semibold text-sm">Putra dari:</p>
                                        <p className="font-medium text-base">Bpk. Busriyono &amp; Ibu Rohanah</p>
                                        <p className="italic text-sm">Mulyosari, Serang, Kejajar</p>
                                        <div className="instagram-profil mt-3">
                                            <Instagram username="fatkhur.py" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </OnViewTransition>
                    </div>
                </div>
                <OnViewTransition transition={{ delay: 0.9 }}>
                    <div className="flex justify-center -mt-4">
                        <img src="https://images.ctfassets.net/q40z6pfqje6o/5azAFJdIrJG1n0A3IzBLya/b85b012f5256618de1ef1efce94d065f/New_Project__42_.png" alt="" style={{ transform: "rotate(180deg)" }} width="100%" />
                    </div>
                </OnViewTransition>
            </section>

            <section className="w-full min-h-screen text-center relative px-4 py-4">
                <OnViewTransition>
                    <h3 className="font-cormorant text-5xl leading-none mb-8">Acara</h3>
                </OnViewTransition>
                <OnViewTransition>
                    <div className="px-6 py-8 text-center bg-light text-white font-normal rounded-lg border border-light bg-opacity-20 my-4" style={{
                        backgroundImage: "url(https://images.ctfassets.net/q40z6pfqje6o/01QcYN53sWodwqR7gvquz5/f2901a8caa319c2919353d49c86d5770/New_Project__9_.png)",
                        backgroundSize: "cover",
                    }}>
                        {invMode !== '1' ? (
                            <OnViewTransition>
                                <div className="mb-4">
                                    <div className="text-primary mb-2">
                                        <h4 className="mb-4 font-gv text-4xl text-secondary">Undangan</h4>
                                        <p className="text-lg font-medium">Minggu, 11 Juni 2023</p>
                                        <p className="text-[14px]">Pukul 09:00 WIB - Selesai</p>
                                        <p className="text-xs italic">Pagedangan RT 4 / RW 1 Tumenggungan, Selomerto<br />(Kediaman mempelai wanita)</p>
                                    </div>
                                    <LocationButton location="https://goo.gl/maps/ewy46jSCE19D1ASXA" />
                                    <div className="w-full flex justify-center mt-4">
                                        <img src="https://images.ctfassets.net/q40z6pfqje6o/2DKFUnnr1bi2Pj6KeWuudk/69c4c218aa89d3736c59a8ae7510e5f2/Vector_Smart_Object1-ai__1___1_.png" alt="" />
                                    </div>
                                </div>
                            </OnViewTransition>
                        ) : (
                            <OnViewTransition>
                                <div className="mb-4">
                                    <div className="text-primary mb-2">
                                        <h4 className="mb-4 font-gv text-4xl text-secondary">Undangan</h4>
                                        <p className="text-lg font-medium">Minggu, 13 Juni 2023</p>
                                        <p className="text-[14px]">Pukul 09:00 WIB - Selesai</p>
                                        <p className="text-xs italic">Mulyosari RT 5 / RW 2 Serang, Kejajar<br />(Kediaman mempelai pria)</p>
                                    </div>
                                    <LocationButton location="https://goo.gl/maps/xpAiQ8QAZ86wLs3S9" />
                                    <div className="w-full flex justify-center mt-4">
                                        <img src="https://images.ctfassets.net/q40z6pfqje6o/2DKFUnnr1bi2Pj6KeWuudk/69c4c218aa89d3736c59a8ae7510e5f2/Vector_Smart_Object1-ai__1___1_.png" alt="" />
                                    </div>
                                </div>
                            </OnViewTransition>
                        )}
                        <OnViewTransition>
                            <div className="mb-4">
                                <div className="text-primary mb-2">
                                    <h4 className="mb-4 font-gv text-4xl text-secondary">Akad Nikah & Resepsi</h4>
                                    <p className="text-lg font-medium">Senin, 12 Juni 2023</p>
                                    <p className="text-[14px]">Pukul 07:00 WIB - Selesai</p>
                                    <p className="text-xs italic">Pagedangan RT 4 / RW 1 Tumenggungan, Selomerto<br />(Kediaman mempelai wanita)</p>
                                </div>
                                <LocationButton location="https://goo.gl/maps/ewy46jSCE19D1ASXA" />
                                <div className="w-full flex justify-center mt-4">
                                    <img src="https://images.ctfassets.net/q40z6pfqje6o/2DKFUnnr1bi2Pj6KeWuudk/69c4c218aa89d3736c59a8ae7510e5f2/Vector_Smart_Object1-ai__1___1_.png" alt="" />
                                </div>
                            </div>
                        </OnViewTransition>
                        <OnViewTransition>
                            <div className="mb-4">
                                <div className="text-primary mb-2">
                                    <h4 className="mb-4 font-gv text-4xl text-secondary">Tasyakuran</h4>
                                    <p className="text-lg font-medium">Selasa, 13 Juni 2023</p>
                                    <p className="text-[14px]">Pukul 09:00 WIB - Selesai</p>
                                    <p className="text-xs italic">Mulyosari RT 5 / RW 2 Serang, Kejajar<br />(Kediaman mempelai pria)</p>
                                </div>
                                <LocationButton location="https://goo.gl/maps/xpAiQ8QAZ86wLs3S9" />
                                <div className="w-full flex justify-center mt-4">
                                    <img src="https://images.ctfassets.net/q40z6pfqje6o/2DKFUnnr1bi2Pj6KeWuudk/69c4c218aa89d3736c59a8ae7510e5f2/Vector_Smart_Object1-ai__1___1_.png" alt="" />
                                </div>
                            </div>
                        </OnViewTransition>
                    </div>
                </OnViewTransition>
                <OnViewTransition transition={{ delay: 0.65 }}>
                    <div className="flex justify-center -mt-4">
                        <img src="https://images.ctfassets.net/q40z6pfqje6o/5azAFJdIrJG1n0A3IzBLya/b85b012f5256618de1ef1efce94d065f/New_Project__42_.png" alt="" style={{ transform: "rotate(180deg)" }} width="100%" />
                    </div>
                </OnViewTransition>
            </section>

            <section className="w-full text-center relative px-4 py-4">
                <OnViewTransition>
                    <h3 className="font-cormorant text-5xl leading-none mb-8">Gallery</h3>
                </OnViewTransition>
                <ImageGallery />
                <OnViewTransition transition={{ delay: 0.65 }}>
                    <div className="flex justify-center -mt-4">
                        <img src="https://images.ctfassets.net/q40z6pfqje6o/5azAFJdIrJG1n0A3IzBLya/b85b012f5256618de1ef1efce94d065f/New_Project__42_.png" alt="" style={{ transform: "rotate(180deg)" }} width="100%" />
                    </div>
                </OnViewTransition>
            </section>

            <section className="w-full text-center relative px-4 py-4">
                <OnViewTransition>
                    <h3 className="font-cormorant text-5xl leading-none mb-8">Ucapan & Do'a</h3>
                </OnViewTransition>
                <FirestoreProvider sdk={firestoreInstance}>
                    <GreetingForm />
                </FirestoreProvider>
                <OnViewTransition transition={{ delay: 0.65 }}>
                    <div className="flex justify-center -mt-4">
                        <img src="https://images.ctfassets.net/q40z6pfqje6o/5azAFJdIrJG1n0A3IzBLya/b85b012f5256618de1ef1efce94d065f/New_Project__42_.png" alt="" style={{ transform: "rotate(180deg)" }} width="100%" />
                    </div>
                </OnViewTransition>
            </section>

            {/* <section className="w-full text-center relative px-4 py-4">
                <OnViewTransition>
                    <h3 className="font-cormorant text-5xl leading-none mb-8">Kirim Hadiah</h3>
                </OnViewTransition>
                <OnViewTransition>
                    <GiftCard
                        onSwipeStart={() => setScrollEnabled(false)}
                        onSwipeEnd={() => setScrollEnabled(true)}
                    />
                </OnViewTransition>
            </section> */}

            <footer className="min-h-[340px] relative text-center flex justify-center" style={{
                background: `linear-gradient(to bottom, rgba(252, 246, 234, 1) 5%, rgba(252, 246, 234, 0.2) 40%, rgba(0, 0, 0, 0.9)) 90%, url(${Gallery4})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div className="text-white mt-10" style={{
                    textShadow: '2px 1px 3px rgba(45, 45, 45, 0.4)',
                }}>
                    <OnViewTransition transition={{ delay: 0.8 }}>
                        <h1 className='mb-2'>Yang Berbahagia</h1>
                    </OnViewTransition>
                    <div className="font-gv text-3xl text-white inline-flex space-x-3 mb-4">
                        <OnViewTransition variant="slideInRight" transition={{ delay: 0.9 }}>
                            <div>Silvia</div>
                        </OnViewTransition>
                        <OnViewTransition transition={{ delay: 0.9 }}>
                            <div className='text-2xl mt-1'>&</div>
                        </OnViewTransition>
                        <OnViewTransition variant="slideInLeft" transition={{ delay: 0.9 }}>
                            <div>Fatkhur</div>
                        </OnViewTransition>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full">
                    <div className="absolute bottom-0 w-full text-center text-white py-3 text-[14px] font-normal">
                        <p>Made with <span className="text-[#e25555]">&hearts;</span> by <a className="underline" href="https://www.instagram.com/fatkhur.py" target="_blank" rel="noreferrer">fatkhur.dev</a></p>
                    </div>
                    <WaveFooter />
                </div>
            </footer>
        </section >
    );
}

export default Content;