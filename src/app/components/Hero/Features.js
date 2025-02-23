import Image from "next/image";
import Link from "next/link";

export default function Features() {
  return (
    <>
      {/* Features */}
      {/* <h2 className="display-5 fw-bold mb-3">
            Wow your audience from the first second
          </h2> */}
     

      <div className="container py-5 mx-auto">
        <div className="row justify-content-center g-4">
          {/* Data Structuring */}
          <div className="col-md-6">
            <div className="d-flex align-items-start">
              <div className="flex-shrink-0">
                <span className="svg-icon text-primary">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 21C6 21.6 6.4 22 7 22H17C17.6 22 18 21.6 18 21V20H6V21Z"
                      fill="#035A4B"
                    />
                    <path
                      opacity="0.3"
                      d="M17 2H7C6.4 2 6 2.4 6 3V20H18V3C18 2.4 17.6 2 17 2Z"
                      fill="#035A4B"
                    />
                  </svg>
                </span>
              </div>
              <div className="flex-grow-1 ms-3">
                <h4>Data Structuring</h4>
                <p className="text-muted">
                  Automates financial data extraction and organization using OCR
                  & NLP for faster processing.
                </p>
              </div>
            </div>
          </div>

          {/* Intelligent Loan Matching */}
          <div className="col-md-6">
            <div className="d-flex align-items-start">
              <div className="flex-shrink-0">
                <span className="svg-icon text-primary">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11Z"
                      fill="#035A4B"
                    />
                  </svg>
                </span>
              </div>
              <div className="flex-grow-1 ms-3">
                <h4>Intelligent Loan Matching</h4>
                <p className="text-muted">
                  Connects MSMEs with the best-fit lenders, ensuring efficient
                  loans.
                </p>
              </div>
            </div>
          </div>

          {/* Smart Risk Assessment */}
          <div className="col-md-6">
            <div className="d-flex align-items-start">
              <div className="flex-shrink-0">
                <span className="svg-icon text-primary">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.3"
                      d="M4 4L11.6314 2.56911C11.875 2.52343 12.125 2.52343 12.3686 2.56911L20 4V11.9033C20 15.696 18.0462 19.2211 14.83 21.2313L12.53 22.6687C12.2057 22.8714 11.7943 22.8714 11.47 22.6687L9.17001 21.2313C5.95382 19.2211 4 15.696 4 11.9033L4 4Z"
                      fill="#035A4B"
                    />
                  </svg>
                </span>
              </div>
              <div className="flex-grow-1 ms-3">
                <h4>Smart Risk Assessment</h4>
                <p className="text-muted">
                  Predicts repayment ability using ML, improving approval rates
                  and reducing NPAs.
                </p>
              </div>
            </div>
          </div>

          {/* Credit Insights & Optimization */}
          <div className="col-md-6">
            <div className="d-flex align-items-start">
              <div className="flex-shrink-0">
                <span className="svg-icon text-primary">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.3"
                      d="M4.85714 1H11.7364C12.0911 1 12.4343 1.12568 12.7051 1.35474L17.4687 5.38394C17.8057 5.66895 18 6.08788 18 6.5292V19.0833C18 20.8739 17.9796 21 16.1429 21H4.85714C3.02045 21 3 20.8739 3 19.0833V2.91667C3 1.12612 3.02045 1 4.85714 1Z"
                      fill="#035A4B"
                    />
                  </svg>
                </span>
              </div>
              <div className="flex-grow-1 ms-3">
                <h4>Credit Insights & Optimization</h4>
                <p className="text-muted">
                  Recommendations that help MSMEs strengthen their credit
                  profile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container content-space-1 content-space-b-lg-3">
      <div className="row align-items-lg-center">
        <div className="col-lg-5 mb-5 mb-lg-0">
          <div className="pe-lg-6">
            <div className="mb-4">
              <h2 className="h1">All-in-one</h2>
            </div>

           

            <div className="mb-4">
              <p>
              We are incubated by Afthonia Lab, a leading fintech incubator that supports early-stage
startups with mentorship, investor access, and corporate networks. </p>
            </div>
          </div>
        </div>
        {/* End Col */}

        <div className="col-lg-7">
          <figure className="device-browser">
          
            <div>
              <Image
                className="device-browser-img"
                src="/afthonialogo.png"
                alt="Image Description"
                width={1618}
                height={1010}
              />
            </div>
          </figure>
        </div>
        {/* End Col */}
      </div>
      {/* End Row */}
    </div>
    </>
  );
}
