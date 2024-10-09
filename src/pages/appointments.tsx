import AppointmentList from "@/components/AppointmentList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

const AppointmentListPage = () => {
  return (
    <React.Fragment>
      <Header />
      <AppointmentList />
      <Footer />
    </React.Fragment>
  );
};

export default AppointmentListPage;
