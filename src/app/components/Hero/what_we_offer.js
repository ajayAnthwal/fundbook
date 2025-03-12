function WhatWeOffer() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold mb-4 capitalize">What We Offer</h2>
      </div>

      <div className="row mb-5 mb-md-0">
        <div className="col-sm-6 col-lg-4 mb-4 mb-lg-0">
          <div className="card card-sm h-100">
            <div className="p-2">
              <img className="card-img" src="assets/img/480x220/img1.jpg" alt="Image Description" />
            </div>

            <div className="card-body">
              <h4 className="card-title">MSMEs</h4>
              <p className="card-text">Easy MSME loan application with CA support & AI credit improvement.</p>

              <ul className="list-pointer mb-0">
                <li className="list-pointer-item">Secured & Unsecured loans</li>
                <li className="list-pointer-item">Multiple lenders</li>
                <li className="list-pointer-item">Higher approvals</li>
                <li className="list-pointer-item">Less paperwork</li>
              </ul>
            </div>

            <a className="card-footer card-link border-top" href="#">Learn more <i className="bi-chevron-right small ms-1"></i></a>
          </div>
        </div>

        <div className="col-sm-6 col-lg-4 mb-4 mb-lg-0">
          <div className="card card-sm h-100">
            <div className="p-2">
              <img className="card-img" src="assets/img/480x220/img2.jpg" alt="Image Description" />
            </div>

            <div className="card-body">
              <h4 className="card-title">For CAs/Accountants</h4>
              <p className="card-text">Grow Your Business with Smart Loan Assistance!</p>

              <ul className="list-pointer mb-0">
                <li className="list-pointer-item">Higher earnings</li>
                <li className="list-pointer-item">More Clients</li>
                <li className="list-pointer-item">Less effort</li>
                <li className="list-pointer-item">Smart Insights</li>
              </ul>
            </div>

            <a className="card-footer card-link border-top" href="#">Learn more <i className="bi-chevron-right small ms-1"></i></a>
          </div>
        </div>

        <div className="col-sm-6 col-lg-4">
          <div className="card card-sm h-100">
            <div className="p-2">
              <img className="card-img" src="assets/img/480x220/img3.jpg" alt="Image Description" />
            </div>

            <div className="card-body">
              <h4 className="card-title">For Lenders</h4>
              <p className="card-text">Improve lending efficiency and loan quality with reduced workload!</p>

              <ul className="list-pointer mb-0">
                <li className="list-pointer-item">Higher Conversions</li>
                <li className="list-pointer-item">Lower costs</li>
                <li className="list-pointer-item">Less Manual work</li>
                <li className="list-pointer-item">Reduced NPAs</li>
              </ul>
            </div>

            <a className="card-footer card-link border-top" href="#">Learn more <i className="bi-chevron-right small ms-1"></i></a>
          </div>
        </div>
      </div>
      </div>
  );
}

export default WhatWeOffer;