import AppointmentScheduler from "@/components/AppointmentScheduler";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

const Home = () => {
  return (
    <React.Fragment>
      <Header />
      <AppointmentScheduler />
      <Footer />
    </React.Fragment>
  );
};

export default Home;
