import MainLayout from "../layouts/MainLayout";
import Hero from "../components/home/Hero";
import SearchFilter from "../components/home/SearchFilter";
import CategoryNav from "../components/home/CategoryNav";
import EquipmentGrid from "../components/home/EquipmentGrid";
import WhyChoose from "../components/home/WhyChoose";
import Testimonials from "../components/home/Testimonials";
import DownloadApp from "../components/home/DownloadApp";


function Home() {
  return (
    <MainLayout>
      <Hero />
      <SearchFilter />
      <CategoryNav />
      <EquipmentGrid />
      <WhyChoose />
      <Testimonials />
       <DownloadApp />
    
    </MainLayout>
  );
}

export default Home;