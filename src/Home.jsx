import { Helmet } from "react-helmet";
import Hero from "./components/Hero";
import ServiceSection from "./components/ServiceSection";
import Approach from "./components/Approach";
import PortfolioSection from "./components/PortfolioSection";
import Testimonials from "./components/Testimonials";
import TechStack from "./components/TechStack";
import WhyChooseUs from "./components/WhyChooseUs";
import PopularBlogsSection from "./components/PopularBlogsSection ";

const Home = () => {
  return (
    <div className=" bg-[#0d0d1a] text-white">
      <Helmet>
        <title>Web Development Services & Digital Marketing Agency</title>
        <meta
          name="description"
          content=" Kynyx Solutions LLC delivers global web, app, software, and digital marketing services with cutting-edge tech and a client-first approach."
        />
        <meta
          name="keywords"
          content="web development services, mobile app development, custom software development, digital marketing agency, social media marketing services"
        />
        <link rel="canonical" href="https://www.kynyx.com/" />
      </Helmet>
      <Hero />
      <ServiceSection />
      <Approach />
      <PortfolioSection />
      <PopularBlogsSection/>
      <Testimonials />
      <TechStack />
      <WhyChooseUs />
    </div>
  );
};

export default Home;
