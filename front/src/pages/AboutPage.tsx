import React, {FC} from "react";

const AboutPage: FC = () => {
  return (
    <div className="static-page-area">
      <h2>About Us</h2>

      <h3>
        ArtCoin - a Sharing Economy tool and a marketplace of underutilized assets
        <small> by Association of Creative Industry Companies in Moldova</small>
      </h3>

      <p><b>ArtCoin currency</b> - an exchange coin for the underutilized assets</p>
      <p><b>ArtCoin technology</b> - a technology that allows individuals and entities to exchange their underutilized
        assets</p>
      <p>
        <b>Underutilized assets Marketplace</b> - a platform displaying underutilized assets (the services and goods)
        that can be exchanged through ArtCoin
      </p>

      <img src="/images/about.png" alt="about" className="rounded-image"/>

      <h3>A national hub for companies & individuals</h3>
      <p>Almost 5000 m2 of space for co-working, events, studios, classrooms, etc. </p>
      <h3>Great community</h3>
      <p>Our community includes more than 3000 companies & 20k individuals (COR residents), generating USD 200M
        sales</p>
      <h3>Our Partners</h3>
      <p>USAID Moldova, Embassy of Sweden, Embassy of Great Britain, the Ministry of Education, Culture and Research of
        the Republic of Moldova, and the Investment Agency - Invest Moldova</p>

      <img src="/images/about1.png" alt="about1" className="standard-image"/>

    </div>
  )
}

export default AboutPage;