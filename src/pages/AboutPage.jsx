import React from 'react'
import { Footer, Navbar } from "../components";
const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">About Us</h1>
        <hr />
        <p className="lead text-center">
        Welcome to Biogenesis, your one-stop shop for high-quality biomedical equipment. 
        We are a team of experts with years of experience in the healthcare industry, dedicated 
        to providing our customers with top-of-the-line equipment and exceptional service.

        Our mission is to empower healthcare professionals by providing them with the tools they 
        need to deliver the best possible care to their patients. We believe that by offering reliable 
        and cutting-edge biomedical equipment, we can help make a positive impact on the healthcare 
        industry and the lives of patients around the world.

        At Biogenesis, we take great pride in our products and services. All of our equipment is 
        carefully selected and tested to ensure the highest quality standards. We understand that every 
        healthcare facility has unique needs and requirements, which is why we work closely with our 
        clients to provide customized solutions tailored to their specific needs. Our team of experts is 
        always available to answer any questions you may have and provide you with the support you need.

        Thank you for choosing Biogenesis as your trusted partner in healthcare equipment. 
        We look forward to working with you and helping you achieve your goals.
        </p>

        <h2 className="text-center py-4">Our Products</h2>
        <div className="row">
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://www.promedco.com/images/Noticias_2022/ultrasonido-novedades1.png" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Diagnostic equipment</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://www.districlinic.com.co/wp-content/uploads/2021/03/3-1-1170x600.jpg" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Monitoring equipment</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://bmoline.com/wp-content/uploads/2022/03/TENS-scaled.webp" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Therapy equipment</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://kuantik.com.co/web/image/product.template/6548/image_1024?unique=902ded5" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Rehabilitation equipment</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutPage