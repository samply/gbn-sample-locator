<style>

 
  /* Selects the app root */
  :host {
    display: grid;
    grid-template-rows: auto 0 1fr auto;
    height: 100vh;

  }
 
  header img {
    height: 70px;
    margin-left: 32px;
  }
 
  header .container {
    margin-top: 40px;
    background: white;
    line-height: 40px;
  }
  
  .divider {
    height: 63px;
    background-color: rgb(240, 243, 244);
    margin-top: 18px;
  }
 
  .menu {
    display: flex;
    justify-content: space-between;
  }
 
  .menu a {
    text-decoration: none;
    cursor: pointer;
    font-size: 18px;
    letter-spacing: 1px;
  }
 
  a:hover {
    color: #6F8795;
  }
 
  footer {
    padding-bottom: 2rem;
  }
 
  footer .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
  }
 
 
  footer a {
    color: var(--color-gray);
    cursor: pointer;
  }
 
  .container {
    margin: 0 auto;
  }
 
  @media (min-width: 576px) {
    .container {
      width: 540px;
    }
  }
 
  @media (min-width: 768px) {
    .container {
      width: 720px;
    }
 
 .menu a {
   text-decoration: none;
   cursor: pointer;
   margin-left: 45px;
   font-size: 21px;
   letter-spacing: 1px;
 }
 
 header .container {
   display: grid;
   grid-template-columns: auto 1fr;
   grid-gap: 40px;
   line-height: 40px;
 }
 
 
  }

  .top-space {
    margin-top: 70px;
  }
 
 
  @media (min-width: 992px) {
    .container {
      width: 960px;
    }
    
  footer .container {
   flex-direction: row;
   gap: 0;
 }
 
  }
 
 
  @media (min-width: 1200px) {
    .container {
      width: 1140px;
    }
 
 
  header img {
   height: 93px;
 }
 
  }
 
  @media (min-width: 1280px) {
    .container {
      width: 1200px;
    }
  }
 
  @media (min-width: 1440px) {
    .container {
      width: 1272px;
    }
  }

  .container {
  margin: 0 var(--gap-s);
  /* calculate min height to display footer on bottom of page */
  /* calc(100vh - header - footer - footer-margin); */
  min-height: calc(100vh - 55px - 147px - 60px);
}

@media screen and (min-width: 1024px) {
  .container {
    margin: 0 auto;
  }
}
</style>

<script>
	let { children } = $props();
</script>

<div class="container">
<header>
<div>
    <menu class="menu">
          <a href="/"><img src="GBN-LOGO-POS-EN-RGB_Schutzzone.svg" alt="German Biobank Node"/></a>
          <div class="top-space">
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
      </div>
    </menu>
  </div>
  <div class="divider"></div>
</header>
{@render children()}
<footer class="container">
    <div>
      <a href="https://www.bbmri-eric.eu/privacy-notice/">Privacy Policy</a>
      <div> Made with ♥ and <a href="https://github.com/samply/lens">samply/lens</a>.</div>
      <img src="german-cancer-research-center-dkfz-logo-vector.svg" alt="German Cancer Research Center" height="40"/>
      <img src="BMFTR_en_DTP_CMYK_gef_durch.jpg" alt="EU" height="120px"/>
    </div>
  </footer>
  </div>