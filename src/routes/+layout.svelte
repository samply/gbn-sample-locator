<script>
  import { env } from "$env/dynamic/public";

  let { children } = $props();
  import { redirectWithQuery } from "../function";

  let logoutUrl = `/oauth2/sign_out?rd=${window.location.protocol}%2F%2F${window.location.hostname}%2Flogout`;
</script>

<header>
  <div>
    <menu class="menu">
      <a href="/"
        ><img
          src="GBN-LOGO-POS-EN-RGB_Schutzzone.svg"
          alt="German Biobank Node"
        /></a
      >
      <div>
        {#if env.PUBLIC_ENVIRONMENT === "pub"}
          <button class="button-links" onclick={redirectWithQuery}>
            LOGIN
          </button>
        {/if}
        {#if env.PUBLIC_ENVIRONMENT === "test" || env.PUBLIC_ENVIRONMENT === "prod"}
          <a href={logoutUrl}>LOGOUT</a>
        {/if}
        <a class="links" href="/about">About</a>
        <a class="links" href="/contact">Contact</a>
      </div>
    </menu>
  </div>
  <div class="divider"></div>
</header>
<div class="container">
  {@render children()}
</div>
<footer class="footer-container">
  <div class="privacy-policy">
    <a href="https://www.bbmri-eric.eu/privacy-notice/">Privacy Policy</a>
  </div>
  <div class="made-with">
    Made with ♥ and <a href="https://github.com/samply/lens">samply/lens</a>.
  </div>
  <img
    class="logo-dkfz"
    src="german-cancer-research-center-dkfz-logo-vector.svg"
    alt="German Cancer Research Center"
    height="40"
  />
  <img
    class="logo-eu"
    src="BMFTR_en_DTP_CMYK_gef_durch.jpg"
    alt="EU"
    height="120px"
  />
</footer>

<style>
  /* Selects the app root */
  :host {
    display: grid;
    grid-template-rows: auto 0 1fr auto;
    height: 100vh;
  }

  .divider {
    height: 63px;
    background-color: rgb(240, 243, 244);
    margin-top: 18px;
  }

  .menu {
    text-align: center;
    margin: 0;
    padding-inline-start: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
  }

  .menu a {
    color: var(--dark-gray);
    text-decoration: none;
  }

  .menu img {
    height: 90px;
  }

  .menu a {
    text-decoration: none;
    cursor: pointer;
    font-size: 18px;
    letter-spacing: 1px;
  }

  a:hover {
    color: #6f8795;
  }

  .menu .links {
    text-decoration: none;
    cursor: pointer;
    font-size: 21px;
    letter-spacing: 1px;
    margin: 0 var(--gap-s);
  }

  .button-links {
    background: none; /* remove button background */
    border: none; /* remove border */
    padding: 0; /* remove default padding */
    margin: 0; /* remove margin if any */
    text-decoration: none;
    cursor: pointer;
    margin-left: 45px;
    font-size: 21px;
    letter-spacing: 1px;
  }

  @media (min-width: 622px) {
    .menu {
      display: flex;
      justify-content: space-between;
    }
    
  }

  @media screen and (min-width: 768px) {
    header {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      padding: 0px 32px;
    }

    .container {
      width: 720px;
      margin: auto;
    }
  }

  @media (min-width: 1200px) {
    .container {
      width: 1140px;
      padding: 10px 84px;
    }
    .menu img {
      height: 121px;
    }
  }

  /* .container {
    margin: 0 var(--gap-s);
  } */

  @media screen and (min-width: 1024px) {
    .container {
      margin: 0 auto;
    }
  }

  footer {
    text-align: center;
    display: grid;
    grid-gap: var(--gap-m);
    border-top: solid 1px var(--light-gray);
    margin-top: var(--gap-xxl);
    justify-content: center;
    align-items: center;
    padding-top: var(--gap-m);
  }

  .logo-eu {
    justify-self: center;
  }

  @media screen and (min-width: 768px) {
    footer {
      grid-template-columns: repeat(4, 1fr);
      text-align: left;
      justify-content: center;
      text-align: center;
    }
    .privacy-policy {
      margin-left: 8px;
    }
    .made-with {
      margin-left: 18px;
    }

  }

  footer a {
    color: var(--color-gray);
    cursor: pointer;
  }

  footer a:hover {
    color: var(--orange);
  }
</style>
