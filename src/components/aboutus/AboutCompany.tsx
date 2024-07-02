const AboutCompany = () => {
    return (
      <section className="main-container py-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        <aside className="w-full flex flex-col items-center text-center lg:items-start lg:text-left gap-6 md:gap-8">
          <h3 className="py-1.5 px-4 inline-block text-sm font-medium bg-primary/10 text-primary uppercase rounded-full">
            About our company
          </h3>
          <h2 className="title">
            We believe in the
            <span className=" text-gray-400"> power of personalization</span>
          </h2>
          <p className="description">
            {`But we don't stop there. We're also passionate about helping
              businesses establish their brand identity. Our talented team of
              designers can craft distinctive logos that not only represent your
              company but also make a lasting impression. Your logo is your brand's
              visual signature, and we understand its significance in today's
              competitive market.`}
          </p>
          <button className="btn-primary w-fit px-8 py-2 rounded-md">
            Get Started
          </button>
        </aside>
  
        <aside className="relative w-full flex gap-4">
          <img
            src="/about/3.jpg"
            alt="feature"
            className="w-1/2 md:h-96 rounded-lg"
          />
          <img
            src="/about/4.jpg"
            alt="feature"
            className="w-1/2 md:h-80 rounded-lg"
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-primary rounded-md text-white flex flex-col items-center justify-center gap-2 md:gap-4 text-center px-4 py-4 md:py-12">
            <h4 className="text-3xl md:text-5xl font-bold tracking-wide">28K+</h4>
            <p className="tracking-wide">Products Delivered</p>
          </div>
        </aside>
      </section>
    );
  };
  
  export default AboutCompany;
  