import React from "react";
import { Card, Container } from "reactstrap";
import HeaderImg from "../assets/icon/Mental health-pana 1.svg";
import Header from "../components/Header";

function Home() {
  return (

    <>
    <Header/>
     <Container>
      <Card className=" my-5">
        <div className="row">
          <div className="col">
          <img src={HeaderImg} width={700} alt="" />
          </div>
         

          <div className="col my-auto">
            <div style={{fontSize : "60px" ,fontWeight:"600"}}>NEO PEOPLE</div>
            <div className=" fw-bold" style={{fontSize : "50px", color:"orange"}}>
              Growing with community
            </div>
            <div className="" style={{fontSize : "30px"}}>#TumbuhBersama</div>
          </div>
        </div>
      </Card>
    </Container>
    
    </>
   
  );
}

export default Home;
