import Link from "next/link";

function BlogCard({title, description, image, slug}) {
  return (
    <div className="col-sm-6 col-lg-4 mb-4">
      <div className="card h-100">
        <div className="shape-container">
          <Link href={slug}>
            <img className="card-img-top" src={image} alt="Image Description" />
          </Link>

          <div className="shape shape-bottom zi-1" style={{marginBottom: "-.25rem"}}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1920 100.1">
              <path fill="#fff" d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"></path>
            </svg>
          </div>
        </div>

        <div className="card-body">
          <h3 className="card-title">
            <a className="text-dark" href={slug}>
              {title}
            </a>
          </h3>

          {description && 
            <p className="card-text">
              {description}
            </p>
          }
        </div>
      </div>
    </div>
  );
}

export default BlogCard;