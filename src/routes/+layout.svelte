<script>
  import { env } from "$env/dynamic/public";

  let { children } = $props();
  import { redirectWithQuery } from "../function";

  let logoutUrl = `/oauth2/sign_out?rd=${window.location.protocol}%2F%2F${window.location.hostname}%2Flogout`;
</script>

<div class="container">
  <header>
    <div>
      <menu class="menu">
        <a href="/"
          ><img
            src="GBN-LOGO-POS-EN-RGB_Schutzzone.svg"
            alt="German Biobank Node"
            height="121px"
          /></a
        >
        <div class="top-space">
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
  {@render children()}
  <footer class="footer-container">
    <div>
      <a href="https://www.bbmri-eric.eu/privacy-notice/">Privacy Policy</a>
    </div>
    <div>
      Made with ♥ and <a href="https://github.com/samply/lens">samply/lens</a>.
    </div>
    <img
      src="german-cancer-research-center-dkfz-logo-vector.svg"
      alt="German Cancer Research Center"
      height="40"
    />
    <img src="BMFTR_en_DTP_CMYK_gef_durch.jpg" alt="EU" height="120px" />
  </footer>
</div>

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
    color: #6f8795;
  }

  .footer-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 2rem;

    flex-direction: row;
    gap: 3rem;
  }

  footer a {
    color: var(--color-gray);
    cursor: pointer;
  }

  .menu .links {
    text-decoration: none;
    cursor: pointer;
    margin-left: 45px;
    font-size: 21px;
    letter-spacing: 1px;
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
  }

  .top-space {
    margin-top: 40px;
  }

  @media (min-width: 1200px) {
    .container {
      width: 1140px;
    }
  }

  .container {
    margin: 0 var(--gap-s);
  }

  @media screen and (min-width: 1024px) {
    .container {
      margin: 0 auto;
    }
  }
</style>
