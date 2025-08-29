<h1>About Us</h1>

<p>
  The German Biobank Network (GBN) unites academic biobanks at 37 sites that
  collect human biosamples and make them available for biomedical research. They
  establish uniform quality standards and ensure that samples and associated
  data are accessible throughout Europe. The GBN Office, based at Charité –
  Universitätsmedizin Berlin, is funded through the Network of University
  Medicine (NUM) by the Federal Ministry for Research, Technology and Space
  (BMFTR). The German Cancer Research Center (DKFZ) in Heidelberg provides
  support on IT matters, while the BioMaterialBank Heidelberg (BMBH) and the
  Integrated Biobank Jena (IBBJ) collaborate on quality management. The GBN
  represents the interests of German biobanks in the European infrastructure
  BBMRI-ERIC (Biobanking and Biomolecular Resources Research Infrastructure –
  European Research Infrastructure Consortium).
</p>

<div class="logos">
  <img
    src="GBN-LOGO-POS-EN-RGB_Schutzzone.svg"
    class="logo-gbn"
    alt="gbn logo"
  />
  <img
    class="logo-bbmri"
    src="BBMRI-ERIC-gateway-for-health.svg"
    alt="bbmri-eric logo"
  />
  <img
    class="logo-bmftr"
    src="BMFTR_en_DTP_CMYK_gef_durch.jpg"
    alt="sponsored by the federal ministry of research logo"
  />
</div>

<h2>Step 1: Find relevant biosamples with the Sample Locator</h2>
<p>
  The Sample Locator enables scientists to search for specific research-relevant
  biosamples and related data across multiple academic biobanks, mostly based in
  Germany. The online search-tool was developed by an interdisciplinary team of
  developers from the German Biobank Alliance (GBA) located at several sites
  within Germany, based on previous work within the German Cancer Research
  Center (DKFZ) and the BBMRI-ERIC Common Service IT.
</p>
<p>
  The first stage of finding biosamples and data consists of a feasibility
  search. The search result shows how many desired samples in total are
  available in the biobanks connected to the Sample Locator. After logging in
  via the authentication service BBMRI-ERIC AAI, users will then see in which
  locations how many samples are available. In order to comply with data
  protection requirements, the search results (numbers of potentially available
  samples and numbers of donors) are slightly obfuscated (i.e. plus or minus one
  to ten, the scale being randomly generated for each search request).
</p>
<p>
  To register with BBMRI-ERIC AAI, you can use your institutional email and
  account-password in case you are based with an institution listed in the
  Deutsches Forschungsnetz (DFN). If this does not apply, you will need to
  register using the LifeScience Hostel (green button). In both cases your
  registration-application will be verified by GBN within a working day.
</p>
<p>
  If you have any questions about the Sample Locator or would like to give
  feedback, please contact feedback@germanbiobanknode.de.
</p>

<h2>Step 2: Request biospecimens using the Negotiator</h2>

<p>
  To request samples, users are automatically referred from the Sample Locator
  to the Negotiator, a platform for structured communication between inquirers
  and biobanks originally developed at the German Cancer Research Center (DKFZ)
  and the BBMRI-ERIC Common Service IT. If you have questions regarding the
  Negotiator, please contact negotiator@helpdesk.bbmri-eric.eu.
</p>

<h2>Further information</h2>

<ul>
  <li><a href="https://www.bbmri.de/">GBN website</a></li>
  <li><a href="http://www.bbmri-eric.eu/">BBMRI-ERIC website</a></li>
  <li>
    <a href="https://www.bbmri.de/service/directory/directory-anleitung/?L=1"
      >How to register to BBMRI-ERIC services</a
    >
  </li>
</ul>

<style>
  * {
    padding: 1rem;
    max-width: 1000px;
    margin: auto;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    padding-bottom: 0px;
  }

  li a {
    padding: 0px;
  }

  .logos {
    display: grid;
    /* grid-template-columns: repeat(3, 1fr); */
    grid-gap: 5%;
    margin: 3rem auto;
    /* height: 125px; */
    padding: 0;
    justify-content: center;
    align-items: center;
  }

  .logo-gbn,
  .logo-bbmri,
  .logo-bmftr {
    padding: 0;
    position: relative;
  }

  .logos img {
    padding: 0;
  }

  .logo-gbn {
    height: 120px;
  }

  .logo-bbmri {
    margin-top: 18px;
    height: 93px;
  }

  .logo-bmftr {
    height: 125px;
  }
  @media (min-width: 768px) {
    .logos {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 5%;
      margin: 3rem auto;
      height: 90px;
      padding: 0 8px 0 5px;
    }

    .logo-gbn {
      height: 86px;
    }

    .logo-bbmri {
      margin-top: 18px;
      height: 67px;
    }

    .logo-bmftr {
      height: 90px;
      margin-right: -16px;
    }
  }

  @media (min-width: 1440px) {
    .logos {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 5%;
      margin: 3rem auto;
      height: 125px;
      padding: 0;
    }

    .logo-gbn {
      height: 120px;
    }

    .logo-bbmri {
      margin-top: 18px;
      height: 93px;
    }

    .logo-bmftr {
      height: 125px;
      margin-right: -16px;
    }
  }

  p {
    text-align: justify;
  }
</style>
