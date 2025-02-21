import Image from 'next/image';

const AdvancedAnalytics = () => {
  return (
    <div className="overflow-hidden">
      <div className="container content-space-2 content-space-lg-3">
        <div className="row justify-content-lg-between align-items-lg-center">
          <div className="col-lg-6 mb-9 mb-lg-0">
            <div className="position-relative mx-auto" style={{ maxWidth: '20rem' }}>
              <figure className="device-mobile mx-auto">
                <div className="device-mobile-frame">
                  <Image 
                    className="device-mobile-img" 
                    src="/assets/img/407x867/img5.jpg" 
                    alt="Image Description" 
                    width={407} 
                    height={867} 
                  />
                </div>
              </figure>
              <div className="position-absolute top-0 end-0 zi-2 me-n10 mt-9" style={{ width: '16rem' }}>
                <Image 
                  className="img-fluid shadow-lg rounded-2" 
                  src="/assets/img/407x115/img1.jpg" 
                  alt="Image Description" 
                  width={407} 
                  height={115} 
                />
              </div>
              <div className="position-absolute bottom-0 start-0 zi-2 ms-n10 mb-10" style={{ width: '16rem' }}>
                <Image 
                  className="img-fluid shadow-lg rounded-2" 
                  src="/assets/img/480x320/img26.jpg" 
                  alt="Image Description" 
                  width={480} 
                  height={320} 
                />
              </div>
              <div className="position-absolute bottom-0 end-0 zi-n1 mx-auto" style={{ width: '20rem' }}>
                <Image 
                  className="img-fluid" 
                  src="/assets/svg/components/shape-1.svg" 
                  alt="SVG" 
                  width={200} 
                  height={200} 
                />
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="mb-5">
              <h2>Advanced analytics easy to understand</h2>
            </div>
            <ul className="step step-dashed mb-7">
              <li className="step-item">
                <div className="step-content-wrapper">
                  <span className="step-icon step-icon-xs step-icon-soft-primary">1</span>
                  <div className="step-content">
                    <h4 className="step-title">Industry-leading documentation</h4>
                    <p>
                      <a className="link" href="/documentation/index.html">Our documentation</a> and extensive Client libraries 
                      contain everything a business needs to build a custom integration in a fraction of the time.
                    </p>
                  </div>
                </div>
              </li>
              <li className="step-item mb-0">
                <div className="step-content-wrapper">
                  <span className="step-icon step-icon-xs step-icon-soft-primary">2</span>
                  <div className="step-content">
                    <h4 className="step-title">Support for the developer community</h4>
                    <p className="mb-0">
                      We actively contribute to open-source projects—giving back to the community through development, patches, and sponsorships.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
            <a className="btn btn-primary btn-transition" href="#">Request demo</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;
