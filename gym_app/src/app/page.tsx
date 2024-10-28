import top_banner from '../assets/img/top_banner.jpg'
import trainingImg from '../assets/img/training.jpg'
import bodyCheckImg from '../assets/img/body_check.jpg'
import dietImg from '../assets/img/diet.jpg'
import Banner from '../components/reusable_components/Banner'
import HomeSectionDetails from '../components/reusable_components/HomeSectionDetails'




export default function Home() {
  return (
    <div className='min-h-[100vh] flex flex-col justify-evenly bg-black'>
      <Banner img={top_banner} />
      {/* training section */}
      <HomeSectionDetails
        isImgRight
        sectionTitle='training card section'
        sectionDescription='Questa sezione ti permette di gestire in modo completo le tue schede di allenamento. Puoi registrare esercizi forniti da un personal trainer o crearne di nuovi autonomamente. Ogni esercizio può essere personalizzato con dettagli come numero di ripetizioni, peso utilizzato, tempi di recupero e note aggiuntive per tenere traccia di ogni aspetto del tuo allenamento. Con la possibilità di aggiornare i progressi in tempo reale, questa sezione ti aiuta a mantenere il focus sui tuoi obiettivi, monitorando costantemente i miglioramenti e adattando le sessioni alle tue esigenze.'
        img={trainingImg}
      />
      {/* bodycheck section */}
      <HomeSectionDetails
        isImgRight={false}
        sectionTitle="Body Check Section"
        sectionDescription="In questa sezione puoi monitorare i cambiamenti del tuo corpo nel corso del tempo. Inserisci le misure principali, come circonferenza vita, torace, braccia, gambe e altro, per avere un quadro completo dei tuoi progressi fisici. Il monitoraggio regolare delle tue misure ti consente di valutare i risultati e capire quali aree stanno migliorando e dove puoi ancora lavorare. Che il tuo obiettivo sia perdere peso, tonificare o aumentare la massa muscolare, questa sezione ti permette di avere un controllo costante e motivante sul tuo percorso."
        img={bodyCheckImg}
      />
      {/* diet section */}
      <HomeSectionDetails
        isImgRight={true}
        sectionTitle="Diet Section"
        sectionDescription="Questa sezione è pensata per aiutarti a gestire al meglio il tuo piano alimentare. Che tu segua una dieta consigliata da un nutrizionista o abbia un piano personale, puoi registrare ogni dettaglio riguardante i tuoi pasti. Inserisci gli alimenti, le quantità e le informazioni nutrizionali per ogni pasto, così da monitorare l’apporto calorico e i macronutrienti. La possibilità di modificare o aggiornare il piano alimentare ti aiuta a restare flessibile e adattare l’alimentazione in base ai tuoi obiettivi, sia che tu stia cercando di aumentare massa, perdere peso o migliorare la tua salute complessiva."
        img={dietImg}
      />
    </div>
  );
}
