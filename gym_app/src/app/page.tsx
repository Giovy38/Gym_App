import top_banner from '../assets/img/top_banner.jpg'
import trainingImg from '../assets/img/training.jpg'
import bodyCheckImg from '../assets/img/body_check.jpg'
import dietImg from '../assets/img/diet.jpg'
import Banner from '../components/home_components/Banner'
import HomeSectionDetails from '../components/home_components/HomeSectionDetails'

export default function Home() {

  return (
    <div className='min-h-[100vh] flex flex-col justify-evenly bg-black'>
      <Banner img={top_banner} />
      {/* training section */}
      <HomeSectionDetails
        isImgRight
        sectionTitle='training card section'
        sectionDescription='This section allows you to completely manage your training schedules. You can record exercises provided by a personal trainer or create new ones yourself. Each exercise can be customized with details like number of repetitions, weight used, recovery times, and additional notes to track every aspect of your workout. With the ability to update progress in real time, this section helps you maintain focus on your goals, constantly monitoring improvements and adapting sessions to your needs.'
        img={trainingImg}
      />
      {/* bodycheck section */}
      <HomeSectionDetails
        isImgRight={false}
        sectionTitle="Body Check Section"
        sectionDescription="In this section you can monitor the changes in your body over time. Enter key measurements, such as waist circumference, chest, arms, legs and more, to get a complete picture of your physical progress. Regularly monitoring your measures allows you to evaluate your results and understand which areas are improving and where you can still work. Whether your goal is to lose weight, tone up or gain muscle mass, this section allows you to have constant and motivating control over your journey."
        img={bodyCheckImg}
      />
      {/* diet section */}
      <HomeSectionDetails
        isImgRight={true}
        sectionTitle="Diet Section"
        sectionDescription="This section is designed to help you organize your food plan in a simple and effective way. You can record the name of the foods and the quantities expected for each meal, divided by days of the week and snacks (breakfast, snacks, lunch, etc.). This allows you to precisely follow your diet, maintaining a clear overview of your planned meals. The possibility of updating or modifying the food plan makes management even more flexible, helping you to respect your food goals, whether they are linked to a path of muscle growth, maintenance or lifestyle improvement."
        img={dietImg}
      />
    </div>
  );
}
