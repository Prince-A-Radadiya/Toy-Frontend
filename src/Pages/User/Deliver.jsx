import { Link } from "react-router-dom"

const Deliver = () => {
  return (
    <div className="deliver">
      <section className="hero-banner">
        <Link to='/shop'>
          <img className="d-md-block d-none w-100" src={require('../../Img/deliver.jpg')} alt="" />
          <img className="d-md-none w-100" src={require('../../Img/deliver2.jpg')} alt="" />
        </Link>
      </section>

      <section className="packaging">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6 col-md-8 col-12 mb-4 mb-lg-0" data-aos="fade-up">
              <div className="box d-flex flex-column flex-lg-row align-items-center">
                <div className="left mb-3 mb-lg-0">
                  <img
                    src={require('../../Img/box.png')}
                    alt="Discreet Packaging"
                    className="img-fluid"
                  />
                </div>
                <div className="right ms-lg- mt-4 text-center text-lg-start">
                  <h4 className="text-uppercase">Discreet Packaging</h4>
                  <p className="mb-0">
                    Let’s not put a label on things.<br />
                    We understand that you’d like to maintain privacy and keep certain
                    aspects of your life away from your neighbours, watchman, parents,
                    in-laws, flat-mate and whoever else. Our packaging is discreet and
                    does not have any logo or indication of brand on it. Furthermore,
                    we also ensure there are no content descriptions or labels on the
                    box besides the carrier label.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 text-center mt-4" data-aos="fade-up">
              <img
                src={require('../../Img/label.png')}
                alt="Label"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Deliver
