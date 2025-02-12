import Image from "next/image";
import Link from "next/link";

export default function Card() {
  return (
    <div className="container py-5">
      {/* Heading */}
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold mb-4">
          Learn to develop sites with components
          <br />
          and design systems
        </h2>

        {/* Features List */}
        <div className="d-flex justify-content-center gap-4 mb-5">
          <div className="d-flex align-items-center text-muted">
            <i className="bi bi-check2 text-primary me-2"></i>
            Asynchronous collaboration
          </div>
          <div className="d-flex align-items-center text-muted">
            <i className="bi bi-check2 text-primary me-2"></i>
            Updates and announcements
          </div>
          <div className="d-flex align-items-center text-muted">
            <i className="bi bi-check2 text-primary me-2"></i>
            Training and team building
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="p-3">
              <Image
                className="rounded-3 w-100 h-auto"
                src="/assets/img/480x220/img1.jpg"
                alt="Front App"
                width={480}
                height={220}
              />
            </div>
            <div className="card-body">
              <h4 className="mb-3">Front App</h4>
              <p className="text-muted mb-4">
                Front App is an easier way to search on Android.
              </p>
              <ul className="list-unstyled mb-0">
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-arrow-right text-primary me-2"></i>
                  Advanced Analytics
                </li>
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-arrow-right text-primary me-2"></i>
                  Digital Marketing
                </li>
                <li className="d-flex align-items-center">
                  <i className="bi bi-arrow-right text-primary me-2"></i>
                  Organization
                </li>
              </ul>
            </div>
            <div className="card-footer bg-transparent border-top p-3">
              <Link 
                href="#" 
                className="text-primary text-decoration-none d-flex align-items-center"
              >
                Learn more
                <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Repeat for other two cards with different content */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="p-3">
              <Image
                className="rounded-3 w-100 h-auto"
                src="/assets/img/480x220/img2.jpg"
                alt="Front Chat"
                width={480}
                height={220}
              />
            </div>
            <div className="card-body">
              <h4 className="mb-3">Front Chat</h4>
              <p className="text-muted mb-4">
                Front Chat is a new way to communicate with your team.
              </p>
              <ul className="list-unstyled mb-0">
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-arrow-right text-primary me-2"></i>
                  Cost Transformation
                </li>
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-arrow-right text-primary me-2"></i>
                  Customer Experience
                </li>
                <li className="d-flex align-items-center">
                  <i className="bi bi-arrow-right text-primary me-2"></i>
                  Mergers and Acquisitions
                </li>
              </ul>
            </div>
            <div className="card-footer bg-transparent border-top p-3">
              <Link 
                href="#" 
                className="text-primary text-decoration-none d-flex align-items-center"
              >
                Learn more
                <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="p-3">
              <Image
                className="rounded-3 w-100 h-auto"
                src="/assets/img/480x220/img3.jpg"
                alt="Front Calendar"
                width={480}
                height={220}
              />
            </div>
            <div className="card-body">
              <h4 className="mb-3">Front Calendar</h4>
              <p className="text-muted mb-4">
                Discover an easier way to manage contacts, sales and grow lasting relationships.
              </p>
              <ul className="list-unstyled mb-0">
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-arrow-right text-primary me-2"></i>
                  Enterprise Technology
                </li>
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-arrow-right text-primary me-2"></i>
                  Private Equity
                </li>
                <li className="d-flex align-items-center">
                  <i className="bi bi-arrow-right text-primary me-2"></i>
                  Sustainability
                </li>
              </ul>
            </div>
            <div className="card-footer bg-transparent border-top p-3">
              <Link 
                href="#" 
                className="text-primary text-decoration-none d-flex align-items-center"
              >
                Learn more
                <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}