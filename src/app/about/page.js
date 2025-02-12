import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Page = () => {
  return (
    <main id="content" role="main">
      {/* Gallery */}
      <div className="container content-space-t-3 content-space-t-lg-5">
        <div className="w-lg-75 text-center mx-lg-auto">
          {/* Heading */}
          <div className="mb-5 mb-md-10">
            <h1 className="display-4">About Us</h1>
            <p className="lead">Front is a web company that builds websites. Businesses of every size—from new startups to public companies—use our theme to build and manage their businesses online.</p>
          </div>
          {/* End Heading */}
        </div>

        <div className="row gx-3">
          <div className="col mb-3">
            <div className="bg-img-start" style={{backgroundImage: "url(assets/img/480x320/img17.jpg)", height: "15rem"}}></div>
          </div>
          
          <div className="col-3 d-none d-md-block mb-3">
            <div className="bg-img-start" style={{backgroundImage: "url(assets/img/480x320/img6.jpg)", height: "15rem"}}></div>
          </div>
          
          <div className="col mb-3">
            <div className="bg-img-start" style={{backgroundImage: "url(assets/img/480x320/img14.jpg)", height: "15rem"}}></div>
          </div>

          <div className="w-100"></div>

          <div className="col mb-3 mb-md-0">
            <div className="bg-img-start" style={{backgroundImage: "url(assets/img/480x320/img25.jpg)", height: "15rem"}}></div>
          </div>
          
          <div className="col-4 d-none d-md-block mb-3 mb-md-0">
            <div className="bg-img-start" style={{backgroundImage: "url(assets/img/480x320/img16.jpg)", height: "15rem"}}></div>
          </div>
          
          <div className="col">
            <div className="bg-img-start" style={{backgroundImage: "url(assets/img/480x320/img12.jpg)", height: "15rem"}}></div>
          </div>
        </div>
      </div>
      {/* End Gallery */}

      {/* Feature Stats */}
      <div className="container content-space-2 content-space-lg-3">
        <div className="row justify-content-lg-center">
          <div className="col-sm-4 col-lg-3 mb-7 mb-sm-0">
            <div className="text-center">
              <h2 className="display-4">7</h2>
              <p className="small">years in business</p>
            </div>
          </div>

          <div className="col-sm-4 col-lg-3 mb-7 mb-sm-0">
            <div className="text-center">
              <h2 className="display-4">3,5k+</h2>
              <p className="small">copies sold</p>
            </div>
          </div>

          <div className="col-sm-4 col-lg-3">
            <div className="text-center">
              <h2 className="display-4">85%</h2>
              <p className="small">happy customers</p>
            </div>
          </div>
        </div>
      </div>
      {/* End Feature Stats */}

      <div className="border-top mx-auto" style={{maxWidth: "25rem"}}></div>

      {/* Info */}
      <div className="container content-space-2 content-space-lg-3">
        <div className="row justify-content-lg-between">
          <div className="col-lg-4 mb-5 mb-lg-0">
            <h2>Tools should adapt to the user, not the other way around.</h2>
          </div>

          <div className="col-lg-6">
            <p>Since 2007, we have helped 25 companies launch over 1k incredible products. We believe the best digital solutions are built at the intersection of business strategy, available technology, and real user's needs.</p>
            <p>Things can get really complex, really quickly, and a pragmatic, synthetic and clear vision is essential to be able to create something that, after all, is meant to be used. Emotions also have a big role to play and developing clear and beautiful aesthetics is of the utmost importance to create a pleasant environment in which the user actually enjoys the time spent in it. In the end, we're all suckers for beautiful things that just work</p>
          </div>
        </div>
      </div>
      {/* End Info */}

      <div className="border-top mx-auto" style={{maxWidth: "25rem"}}></div>

      {/* Team */}
      <div className="container content-space-2 content-space-lg-3">
        {/* Heading */}
        <div className="w-md-75 w-lg-50 text-center mx-md-auto mb-5 mb-md-9">
          <span className="text-cap">Our team</span>
          <h2>Creative minds</h2>
        </div>

        <div className="row gx-3 mb-5">
          <div className="col-sm-6 col-lg-3 mb-3">
            {/* Card */}
            <div className="card card-transition h-100">
              <div className="card-body">
                <div className="avatar avatar-lg avatar-circle mb-4">
                  <Image 
                    className="avatar-img" 
                    src="/assets/img/160x160/img7.jpg" 
                    alt="Image Description"
                    width={160}
                    height={160}
                  />
                </div>

                <span className="card-subtitle">Founder / CEO</span>
                <h4 className="card-title">Christina Kray</h4>
                <p className="card-text">I am an ambitious workaholic, but apart from that, pretty simple person.</p>
              </div>

              <div className="card-footer pt-0">
                {/* Socials */}
                <ul className="list-inline mb-0">
                  <li className="list-inline-item">
                    <Link className="btn btn-outline-primary btn-xs btn-icon rounded" href="#">
                      <i className="bi-facebook"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="btn btn-outline-primary btn-xs btn-icon rounded" href="#">
                      <i className="bi-google"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="btn btn-outline-primary btn-xs btn-icon rounded" href="#">
                      <i className="bi-twitter"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3 mb-3">
            {/* Card */}
            <div className="card card-transition h-100">
              <div className="card-body">
                <div className="avatar avatar-lg avatar-circle mb-4">
                  <Image 
                    className="avatar-img" 
                    src="/assets/img/160x160/img3.jpg" 
                    alt="Image Description"
                    width={160}
                    height={160}
                  />
                </div>

                <span className="card-subtitle">Project Manager</span>
                <h4 className="card-title">Jeff Fisher</h4>
                <p className="card-text">I am an ambitious workaholic, but apart from that, pretty simple person.</p>
              </div>

              <div className="card-footer pt-0">
                {/* Socials */}
                <ul className="list-inline mb-0">
                  <li className="list-inline-item">
                    <Link className="btn btn-outline-primary btn-xs btn-icon rounded" href="#">
                      <i className="bi-facebook"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="btn btn-outline-primary btn-xs btn-icon rounded" href="#">
                      <i className="bi-google"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="btn btn-outline-primary btn-xs btn-icon rounded" href="#">
                      <i className="bi-twitter"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3 mb-3">
            {/* Card */}
            <div className="card card-transition h-100">
              <div className="card-body">
                <div className="avatar avatar-lg avatar-circle mb-4">
                  <Image 
                    className="avatar-img" 
                    src="/assets/img/160x160/img10.jpg" 
                    alt="Image Description"
                    width={160}
                    height={160}
                  />
                </div>

                <span className="card-subtitle">Product Designer</span>
                <h4 className="card-title">Amy Forren</h4>
                <p className="card-text">I am an ambitious workaholic, but apart from that, pretty simple person.</p>
              </div>

              <div className="card-footer pt-0">
                {/* Socials */}
                <ul className="list-inline mb-0">
                  <li className="list-inline-item">
                    <Link className="btn btn-outline-primary btn-xs btn-icon rounded" href="#">
                      <i className="bi-facebook"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="btn btn-outline-primary btn-xs btn-icon rounded" href="#">
                      <i className="bi-google"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="btn btn-outline-primary btn-xs btn-icon rounded" href="#">
                      <i className="bi-twitter"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3 mb-3">
            {/* Card */}
            <div className="card card-transition h-100">
              <div className="card-body">
                <div className="avatar avatar-lg avatar-circle mb-4">
                  <Image 
                    className="avatar-img" 
                    src="/assets/img/160x160/img5.jpg" 
                    alt="Image Description"
                    width={160}
                    height={160}
                  />
                </div>

                <span className="card-subtitle">Support Consultant</span>
                <h4 className="card-title">Philip Williams</h4>
                <p className="card-text">I am an ambitious workaholic, but apart from that, pretty simple person.</p>
              </div>

              <div className="card-footer pt-0">
                {/* Socials */}
                <ul className="list-inline mb-0">
                  <li className="list-inline-item">
                    <Link className="btn btn-outline-primary btn-xs btn-icon rounded" href="#">
                      <i className="bi-facebook"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="btn btn-outline-primary btn-xs btn-icon rounded" href="#">
                      <i className="bi-google"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="btn btn-outline-primary btn-xs btn-icon rounded" href="#">
                      <i className="bi-twitter"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Card Info */}
        <div className="text-center">
          <div className="card card-info-link card-sm">
            <div className="card-body">
              Want to work with us? <Link className="card-link ms-2" href="/page-hire-us">We are hiring <span className="bi-chevron-right small ms-1"></span></Link>
            </div>
          </div>
        </div>
      </div>
      {/* End Team */}
    </main>
  )
}

export default Page