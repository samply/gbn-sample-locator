<style>
::ng-deep :root {
    --color-gray: #3C3C3D;
    --color-orange: #E95713;
    --color-blue: #304757;
    --color-light-gray: rgb(240, 243, 244);
    --color-dark-blue-gray: #6F8795;
    --color-site-background: #fff;
    --color-border-light: #ced4da;
    --color-background-light-gray: var(--color-dark-blue-gray);
    /* --color-background-light-gray: #C5CFD5; */
    --color-progressbar-success: var(--color-blue);
    --color-progressbar-failed: var(--color-orange);
 
  }
 
  @font-face {
    font-family: 'Titillium';
    src: url(/fonts/Titillium/Titillium-Regular.otf);
  }
 
  @font-face {
    font-family: 'Titillium Bold';
    src: url(/fonts/Titillium/Titillium-Bold.otf);
  }
 
 
  body {
    margin: 0;
  }
 
  * {
    font-family: 'Titillium', sans-serif;
    border-radius: 0;
  }
 
  
  th {
    font-family: 'Titillium Bold', sans-serif;
  }
 
  /* Selects the app root */
  :host {
    background-color: var(--color-site-background);
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
    margin-top: 25px;
    justify-content: space-between;
    padding: 0 32px;
    margin: 0;
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
 
  .footer-divider {
    height: 63px;
    background-color: #6F8795;
    margin-bottom: 60px;
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
 
  ::ng-deep .p-card {
    box-shadow: none !important;
  }
 
  :host ::ng-deep .p-inputgroup button,
  :host ::ng-deep p-autocomplete span .p-autocomplete-multiple-container{
     border-radius: 0px !important;
  }
 
  ::ng-deep lens-result-renderer-grid {
    grid-auto-rows: auto 500px 500px !important;
  }
 
  ::ng-deep .results-summery-bar-heading {
     font-size: 24px!important;
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
 
  .menu {
   display: flex;
   justify-content: right;
   margin: 0;
   padding: 0;
   margin-top: 25px;
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
</style>

<script>
	let { children } = $props();
</script>


<header>
<div class="container">
    <a href="/"><img src="GBN_logo.svg" alt="German Biobank Node"/></a>
    <menu class="menu">
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </menu>
  </div>
  <div class="divider"></div>
</header>
{@render children()}
<footer>
    <div class="footer-divider"></div>
    <div class="container">
      <a href="https://www.bbmri-eric.eu/privacy-notice/">Privacy Policy</a>
      <div> Made with ♥ and <a href="https://github.com/samply/lens">samply/lens-core</a>.</div>
      <img src="german-cancer-research-center-dkfz-logo-vector.svg" alt="German Cancer Research Center" height="40"/>
      <img src="BMBF_logo.png" alt="EU" height="120"/>
    </div>
  </footer>