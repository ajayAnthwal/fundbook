import Image from "next/image";
import Link from "next/link";

export default function LatestNews() {
  return (
    <div className="container content-space-2 content-space-lg-3">
      {/* Heading */}
      <div className="w-md-75 w-lg-50 text-center mx-md-auto mb-5 mb-md-9">
        <h2 className="h1">Read our latest news</h2>
        <p>
          We've helped some great companies brand, design and get to market.
        </p>
      </div>
      {/* End Heading */}

      <div className="row gx-3 mb-5 mb-md-9">
        <div className="col-sm-6 col-lg-3 mb-3 mb-lg-0">
          {/* Card */}
          <Link className="card card-transition" href="#">
            <Image
              className="card-img-top"
              src="/assets/img/500x280/img9.jpg"
              alt="Image Description"
              width={500}
              height={170}
            />
            <div className="card-body">
              <span className="card-subtitle text-primary">Product</span>
              <h5 className="card-text lh-base">
                Better is when everything works together
              </h5>
            </div>
          </Link>
          {/* End Card */}
        </div>
        {/* End Col */}

        <div className="col-sm-6 col-lg-3 mb-3 mb-lg-0">
          {/* Card */}
          <Link className="card card-transition h-100" href="#">
            <Image
              className="card-img-top"
              src="/assets/img/500x280/img10.jpg"
              alt="Image Description"
              width={500}
              height={170}
            />
            <div className="card-body">
              <span className="card-subtitle text-primary">Business</span>
              <h5 className="card-text lh-base">What CFR really is about</h5>
            </div>
          </Link>
          {/* End Card */}
        </div>
        {/* End Col */}

        <div className="col-sm-6 col-lg-3 mb-3 mb-sm-0">
          {/* Card */}
          <Link className="card card-transition h-100" href="#">
            <Image
              className="card-img-top"
              src="/assets/img/500x280/img11.jpg"
              alt="Image Description"
              width={500}
              height={170}
            />
            <div className="card-body">
              <span className="card-subtitle text-primary">Business</span>
              <h5 className="card-text lh-base">
                Should Product Owners think like entrepreneurs?
              </h5>
            </div>
          </Link>
          {/* End Card */}
        </div>
        {/* End Col */}

        <div className="col-sm-6 col-lg-3">
          {/* Card */}
          <Link className="card card-transition h-100" href="#">
            <Image
              className="card-img-top"
              src="/assets/img/500x280/img12.jpg"
              alt="Image Description"
              width={500}
              height={170}
            />
            <div className="card-body">
              <span className="card-subtitle text-primary">Facilitate</span>
              <h5 className="card-text lh-base">
                Announcing Front Strategies: Ready-to-use rules
              </h5>
            </div>
          </Link>
          {/* End Card */}
        </div>
        {/* End Col */}
      </div>
      {/* End Row */}

      {/* Card Info */}
      <div className="text-center">
        <div className="card card-info-link card-sm">
          <div className="card-body">
            Want to read more?{" "}
            <Link className="card-link ms-2" href="#">
              Go here <span className="bi-chevron-right small ms-1"></span>
            </Link>
          </div>
        </div>
      </div>
      {/* End Card Info */}

      <div className="container content-space-2 content-space-t-lg-4 content-space-b-lg-3">
        {/* Heading */}
        <div className="w-md-75 w-lg-50 text-center mx-md-auto mb-5 mb-md-9">
          <span className="text-cap">Benefits</span>
          <h2 className="h1">What our 37,500+ clients love about Front</h2>
        </div>

        <div className="row">
          {/* First Column */}
          <div className="col-md-4 mb-5 mb-md-0">
            <div className="text-center px-lg-3">
              <div className="svg-icon text-primary mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.6 5.59998L20.9 10.9C21.3 11.3 21.3 11.9 20.9 12.3L17.6 15.6L11.6 9.59998L15.6 5.59998ZM2.3 12.3L7.59999 17.6L11.6 13.6L5.59999 7.59998L2.3 10.9C1.9 11.3 1.9 11.9 2.3 12.3Z"
                    fill="#035A4B"
                  />
                  <path
                    opacity="0.3"
                    d="M17.6 15.6L12.3 20.9C11.9 21.3 11.3 21.3 10.9 20.9L7.59998 17.6L13.6 11.6L17.6 15.6ZM10.9 2.3L5.59998 7.6L9.59998 11.6L15.6 5.6L12.3 2.3C11.9 1.9 11.3 1.9 10.9 2.3Z"
                    fill="#035A4B"
                  />
                </svg>
              </div>
              <h3>
                Less routine
                <br />– more creativity
              </h3>
              <p>
                Automate best strategies and focus more on generating hq
                creatives.
              </p>
            </div>
          </div>

          {/* Second Column */}
          <div className="col-md-4 mb-5 mb-md-0">
            <div className="text-center px-lg-3">
              <div className="svg-icon text-primary mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.3"
                    d="M12.5 22C11.9 22 11.5 21.6 11.5 21V3C11.5 2.4 11.9 2 12.5 2C13.1 2 13.5 2.4 13.5 3V21C13.5 21.6 13.1 22 12.5 22Z"
                    fill="#035A4B"
                  />
                  <path
                    d="M17.8 14.7C17.8 15.5 17.6 16.3 17.2 16.9C16.8 17.6 16.2 18.1 15.3 18.4C14.5 18.8 13.5 19 12.4 19C11.1 19 10 18.7 9.10001 18.2C8.50001 17.8 8.00001 17.4 7.60001 16.7C7.20001 16.1 7 15.5 7 14.9C7 14.6 7.09999 14.3 7.29999 14C7.49999 13.8 7.80001 13.6 8.20001 13.6C8.50001 13.6 8.69999 13.7 8.89999 13.9C9.09999 14.1 9.29999 14.4 9.39999 14.7C9.59999 15.1 9.8 15.5 10 15.8C10.2 16.1 10.5 16.3 10.8 16.5C11.2 16.7 11.6 16.8 12.2 16.8C13 16.8 13.7 16.6 14.2 16.2C14.7 15.8 15 15.3 15 14.8C15 14.4 14.9 14 14.6 13.7C14.3 13.4 14 13.2 13.5 13.1C13.1 13 12.5 12.8 11.8 12.6C10.8 12.4 9.99999 12.1 9.39999 11.8C8.69999 11.5 8.19999 11.1 7.79999 10.6C7.39999 10.1 7.20001 9.39998 7.20001 8.59998C7.20001 7.89998 7.39999 7.19998 7.79999 6.59998C8.19999 5.99998 8.80001 5.60005 9.60001 5.30005C10.4 5.00005 11.3 4.80005 12.3 4.80005C13.1 4.80005 13.8 4.89998 14.5 5.09998C15.1 5.29998 15.6 5.60002 16 5.90002C16.4 6.20002 16.7 6.6 16.9 7C17.1 7.4 17.2 7.69998 17.2 8.09998C17.2 8.39998 17.1 8.7 16.9 9C16.7 9.3 16.4 9.40002 16 9.40002C15.7 9.40002 15.4 9.29995 15.3 9.19995C15.2 9.09995 15 8.80002 14.8 8.40002C14.6 7.90002 14.3 7.49995 13.9 7.19995C13.5 6.89995 13 6.80005 12.2 6.80005C11.5 6.80005 10.9 7.00005 10.5 7.30005C10.1 7.60005 9.79999 8.00002 9.79999 8.40002C9.79999 8.70002 9.9 8.89998 10 9.09998C10.1 9.29998 10.4 9.49998 10.6 9.59998C10.8 9.69998 11.1 9.90002 11.4 9.90002C11.7 10 12.1 10.1 12.7 10.3C13.5 10.5 14.2 10.7 14.8 10.9C15.4 11.1 15.9 11.4 16.4 11.7C16.8 12 17.2 12.4 17.4 12.9C17.6 13.4 17.8 14 17.8 14.7Z"
                    fill="#035A4B"
                  />
                </svg>
              </div>
              <h3>
                Hundreds
                <br />
                of thousands saved
              </h3>
              <p>
                Stop inefficient budget spend or pour more into a winning ad
                when needed.
              </p>
            </div>
          </div>

          {/* Third Column */}
          <div className="col-md-4">
            <div className="text-center px-lg-3">
              <div className="svg-icon text-primary mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.3"
                    d="M14 3V21H10V3C10 2.4 10.4 2 11 2H13C13.6 2 14 2.4 14 3ZM7 14H5C4.4 14 4 14.4 4 15V21H8V15C8 14.4 7.6 14 7 14Z"
                    fill="#035A4B"
                  />
                  <path
                    d="M21 20H20V8C20 7.4 19.6 7 19 7H17C16.4 7 16 7.4 16 8V20H3C2.4 20 2 20.4 2 21C2 21.6 2.4 22 3 22H21C21.6 22 22 21.6 22 21C22 20.4 21.6 20 21 20Z"
                    fill="#035A4B"
                  />
                </svg>
              </div>
              <h3>
                Scale
                <br />
                budgets efficiently
              </h3>
              <p>Scale your budgets fast and increase ROI at the same time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
