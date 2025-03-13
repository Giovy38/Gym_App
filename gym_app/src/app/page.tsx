'use client'

import top_banner from '../assets/img/top_banner.jpg'
import trainingImg from '../assets/img/training.jpg'
import bodyCheckImg from '../assets/img/body_check.png'
import dietImg from '../assets/img/diet.jpg'
import Banner from '../components/home_components/Banner'
import HomeSectionDetails from '../components/home_components/HomeSectionDetails'
import { useEffect, useState } from 'react'

export default function Home() {

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-[100vh] flex flex-col justify-evenly bg-bg-primary transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className='mb-1'>
        <Banner img={top_banner} />
      </div>
      {/* training section */}
      <HomeSectionDetails
        isImgRight
        sectionTitle='Allenamenti'
        sectionDescription='Ti permette di gestire completamente le tue pianificazioni di allenamento. Puoi registrare i tuoi esercizi segnando il tipo ti. Ogni esercizio può essere personalizzato con dettagli come numero di ripetizioni, peso utilizzato, tempi di recupero e note aggiuntive per tenere traccia di ogni aspetto del tuo allenamento. Grazie alla possibilità di aggiornare i progressi in tempo reale, questa sezione ti aiuta a mantenere la concentrazione sui tuoi obiettivi, monitorando costantemente i miglioramenti e adattando le sessioni alle tue esigenze.'
        img={trainingImg}
      />
      {/* bodycheck section */}
      <HomeSectionDetails
        isImgRight={false}
        sectionTitle="Misurazioni"
        sectionDescription="Puoi monitorare le varie modifiche del tuo corpo nel tempo. Inserisci le tue misure chiave, come la circonferenza addominale, il petto, le braccia, le gambe e altro, per ottenere una visione completa del tuo progresso fisico. Monitorare regolarmente le tue misure ti permette di valutare i tuoi risultati e capire in quale area puoi ancora lavorare. Indipendentemente dal tuo obiettivo, sia per perdere peso, tonificare o guadagnare massa muscolare, questa sezione ti permette di avere un controllo costante e motivante sul tuo percorso."
        img={bodyCheckImg}
      />
      {/* diet section */}
      <HomeSectionDetails
        isImgRight={true}
        sectionTitle="Diete"
        sectionDescription="Progettata per aiutarti a organizzare il tuo piano alimentare in un modo semplice ed efficace. Puoi registrare il nome dei cibi e le quantità previste per ogni pasto, divisi per giorni della settimana e pasti (colazione, merenda, pranzo, etc.). Questo ti permette di seguire esattamente il tuo piano alimentare, mantenendo un chiaro riepilogo dei tuoi pasti pianificati. La possibilità di aggiornare o modificare il piano alimentare rende la gestione ancora più flessibile, aiutandoti a rispettare i tuoi obiettivi alimentari, sia che siano collegati a un percorso di crescita muscolare, mantenimento o miglioramento della vita."
        img={dietImg}
      />
    </div>
  );
}
