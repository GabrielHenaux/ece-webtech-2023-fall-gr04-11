import Layout from '../components/Layout.js'
import { useEffect } from 'react';

export default function Page() {
  return (
    <Layout
      title="About Us"
      description="Don't be shy, drop us an email"
    >
      <div className="in-main">
        <h1 className='wt-title'>
          About Us
        </h1>
        <section>
          <h2 className='wt-subtitle'>
            Welcome to Ferrari News
          </h2>
          <p className="wt-text">
            Your ultimate source of information and passion for everything related to Ferrari cars. We are dedicated to sharing the fascination, history, and beauty of these legendary Italian automobiles with you.
          </p>
        </section>
        <section>
          <h2 className='wt-subtitle'>
            Our Mission
          </h2>
          <p className="wt-text">
            At Ferrari News, our mission is to provide you with easy access to the latest Ferrari news, model reviews, maintenance guides, and a community of enthusiasts who share your love for Ferrari.
          </p>
        </section>
        <section>
          <h2 className='wt-subtitle'>
            What We Offer
          </h2>
          <p className="wt-text">
            Explore the rich history of Ferrari, from Enzo Ferrari's early days to the creation of world-renowned sports cars. Stay informed about the latest model announcements, Ferrari events, and important news. Join our community to discuss, share tips and photos, and meet fellow Ferrari enthusiasts.
          </p>
        </section>
        <section>
          <h2 className='wt-subtitle'>
            Our Commitment to Quality
          </h2>
          <p className="wt-text">
            At Ferrari News, we are committed to delivering accurate information and high-quality resources to help you appreciate and maintain your passion for Ferrari. Join us on Ferrari News and discover everything you need to know about Ferrari. It's the perfect place for enthusiasts of Italian automobiles. We look forward to sharing this Ferrari adventure with you!
          </p>
        </section>
      </div>
    </Layout>
  )
}


