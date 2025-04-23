<script lang="ts">
  // Using hot module replacement (HMR) with custom elements (aka web
  // components) does not work because a custom element cannot be updated once
  // registered, see https://github.com/WICG/webcomponents/issues/820.
  // Therefore we do a full page reload instead of HMR.
  if (import.meta.hot) {
    import.meta.hot.on("vite:beforeUpdate", () => {
      window.location.reload();
    });
  }

  // Import Lens CSS and JS bundles
  import "@samply/lens/style.css";
  import "@samply/lens";

  import type { LensDataPasser } from "@samply/lens";
  import { fetchData, catalogueText } from "../service/catalogue.service";
  import { measures } from "../service/measures";
  import { requestBackend } from "../service/backend.service";

  let catalogueopen = false;

  const toggleCatalogue = () => {
    catalogueopen = !catalogueopen;
  };

  const catalogueUrl: string = "catalogues/gbn.json";
  let optionsFilePath: string = "config/options.test.json";

  const jsonPromises: Promise<{
    catalogueJSON: string;
    optionsJSON: string;
  }> = fetchData(catalogueUrl, optionsFilePath);

  let dataPasser: LensDataPasser;

  window.addEventListener("emit-lens-query", (e) => {
    if (!dataPasser) return;

    const event = e as CustomEvent;
    const { ast, updateResponse, abortController } = event.detail;
    const criteria: string[] = dataPasser.getCriteriaAPI("diagnosis");

    requestBackend(ast, updateResponse, abortController);
  });

  let chartColors: string[] = ["#6F8795", "#8C9FAA", "#A9B7BF", "#C5CFD5"];

  let chartHoverColors: string[] = ["#F1A948"];

  let color: string = "#e95713";
  let unit: string = "px";
  let duration: string = "1.2s";
  let size: string = "90";
  let pause: boolean = false;
  let durationUnit: string = duration.match("/[a-zA-Z]/")?.[0] ?? "s";
  let durationNum: string = "1";
  let range = (size: number, startAt = 0) =>
    [...Array(size).keys()].map((i) => i + startAt);
</script>

<main>
  <div class="banner">
    <div class="banner">
      <div class="banner-image">
        <img src="gba-banner.png" alt="German Biobank Node" />
      </div>
      <div class="banner-text">
        <h1>Sample Locator</h1>
        <h2>
          Search for human biosamples and associated data across multiple
          biobanks
        </h2>
      </div>
    </div>

    <div class="search-wrapper">
      <div class="search">
        <lens-search-bar-multiple
          noMatchesFoundMessage="We couldn't find any matches for your search"
        ></lens-search-bar-multiple>
        <lens-info-button
          noQueryMessage="An empty search will return all results"
          showQuery="true"
        ></lens-info-button>
        <lens-search-button title="Search"></lens-search-button>
      </div>
    </div>

    <button class="catalogue-toggle-button" on:click={toggleCatalogue}>
      <img
        class={catalogueopen ? "open" : ""}
        src="right-arrow-svgrepo-com.svg"
        alt="catalogue toggle button icon"
      />
      <span>Full Parameter Search</span>
    </button>
    <div class="catalogue-info-button">
      <lens-info-button
        message={[
          `The queries are patient-centered: The patients are selected first and then the samples of these patients`,
        ]}
      ></lens-info-button>
    </div>
    <div class="catalogue {catalogueopen ? 'open' : ''}">
      <lens-catalogue
        texts={JSON.stringify(catalogueText)}
        toggle={JSON.stringify({ collapsable: false, open: catalogueopen })}
      ></lens-catalogue>
    </div>
    {#await jsonPromises}
      <div class="stretch-loading-animation">
        <div
          class="wrapper"
          style="--size: {size}{unit}; --color: {color}; --duration: {duration}"
        >
          <!-- eslint-disable-next-line svelte/require-each-key -->
          {#each range(5, 1) as version}
            <div
              class="rect"
              class:pause-animation={pause}
              style="animation-delay: {(version - 1) *
                (+durationNum / 12)}{durationUnit}"
            ></div>
          {/each}
        </div>
        <p>Loading data...</p>
      </div>
    {:then { optionsJSON, catalogueJSON }}
      <lens-options {catalogueJSON} {optionsJSON} {measures}></lens-options>
      <div class="charts">
        <div class="chart-wrapper result-summary">
          <lens-result-summary></lens-result-summary>
        </div>
        <div class="chart-wrapper result-table">
          <lens-result-table pageSize="10">
            <div slot="beneath-pagination">
              <lens-negotiate-button class="negotiate" type="Negotiator"
              ></lens-negotiate-button>
              <lens-search-modified-display>
                <div>Search has been modified!</div>
              </lens-search-modified-display>
            </div>
          </lens-result-table>
        </div>

        <div class="chart-wrapper">
          <lens-chart
            title="Gender Distribution"
            catalogueGroupCode="gender"
            chartType="pie"
            backgroundColor={chartColors}
            backgroundHoverColor={chartHoverColors}
            displayLegends={true}
          ></lens-chart>
        </div>

        <div class="chart-wrapper chart-age-distribution">
          <lens-chart
            title="Age Distribution"
            catalogueGroupCode="age_at_diagnosis"
            chartType="bar"
            backgroundColor={chartColors}
            backgroundHoverColor={chartHoverColors}
            groupRange={10}
            filterRegex="^(1*[12]*[0-9])"
          ></lens-chart>
        </div>

        <div class="chart-wrapper chart-sample-kind">
          <lens-chart
            title="Specimens"
            catalogueGroupCode="sample_kind"
            backgroundColor={chartColors}
            backgroundHoverColor={chartHoverColors}
            chartType="bar"
          >
          </lens-chart>
        </div>

        <div class="chart-wrapper chart-diagnosis">
          <lens-chart
            title="Diagnosis"
            catalogueGroupCode="diagnosis"
            chartType="bar"
            backgroundColor={chartColors}
            backgroundHoverColor={chartHoverColors}
            groupingDivider="."
            groupingLabel=".%"
          ></lens-chart>
        </div>
      </div>
    {:catch someError}
      System error: {someError.message}
    {/await}

    <error-toasts></error-toasts>

    <lens-data-passer bind:this={dataPasser}></lens-data-passer>
  </div>
</main>

<style>
  /* banner */

  .banner {
    position: relative;
  }

  .banner-image img {
    width: 100%;
  }

  .banner-text {
    position: absolute;
    top: 13%;
    left: 32%;
    right: 18%;
  }

  h1 {
    margin: 0;
    font-size: 18px;
  }

  h2 {
    margin: 0;
    font-size: 14px;
    font-weight: 400;
  }

  @font-face {
    font-family: SourceSansPro;
    src: url(/static/fonts/Source_Sans_Pro);
  }

  /**
    * Demo
    */

  * {
    box-sizing: border-box;

    --white: #ffffff;
    --ghost-white: #f8f8ff;
    --black: #000000;
    --gray: #a7a7a7;
    --light-gray: #c5cfd5;
    --lightest-gray: #efefef;
    --dark-gray: #3c3c3d;
    --blue: #003674;
    --light-blue: #007bff;
    --lightest-blue: #adc7f3;
    --dark-blue: #002d80;
    --green: #00882d;
    --light-green: #00b33c;
    --dark-green: #00591a;
    --red: #b90000;
    --light-red: #ff0000;
    --dark-red: #800000;
    --orange: #e95713;
    --light-orange: #ffa750;

    --border-radius-small: 5px;

    --gap-xxs: 5px;
    --gap-xs: 10px;
    --gap-s: 16px;
    --gap-m: 30px;
    --gap-l: 40px;
    --gap-xl: 50px;
    --gap-xxl: 60px;

    --font-size-xxs: 10px;
    --font-size-xs: 12px;
    --font-size-s: 14px;
    --font-size-m: 16px;
    --font-size-l: 18px;
    --font-size-xl: 24px;
    --font-size-xxl: 32px;

    --font-family: "Source Dans Pro", sans-serif;
	margin: 0px;
    font-family: var(--font-family);
  }

  button {
    font-family: inherit;
  }

  .banner {
    margin: auto;
    max-width: fit-content;
    padding: var(--gap-l);
  }

  .banner h1 {
    margin: 0;
    font-size: var(--font-size-xxl);
    font-weight: normal;
    text-align: center;
    color: var(--orange);
  }

  .banner h2 {
    margin: 0;
    font-size: var(--font-size-xl);
    font-weight: normal;
    text-align: center;
    color: var(--dark-gray);
  }

  main {
    margin: 0 var(--gap-s);
    /* calculate min height to display footer on bottom of page */
    /* calc(100vh - header - footer - footer-margin); */
    min-height: calc(100vh - 55px - 147px - 60px);
  }

  @media screen and (min-width: 1024px) {
    main {
      max-width: calc(1024px - 2 * var(--gap-s));
      margin: 0 auto;
    }
  }
  .search-wrapper {
    padding: var(--gap-m) 0;
  }

  @media screen and (min-width: 1024px) {
    .search-wrapper {
      position: sticky;
      position: -webkit-sticky;
      top: 0;
      z-index: 1;
      padding: var(--gap-m) 0;
      background-color: var(--white);
    }
  }

  .search {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: var(--gap-s);
    padding: var(--gap-m);
    border-radius: var(--border-radius-small);
    background-color: var(--lightest-gray);
    justify-content: end;
  }

  lens-search-bar-multiple {
    grid-column: 1/-1;
  }

  @media screen and (min-width: 768px) {
    .search {
      grid-template-columns: minmax(0, 1fr) auto auto;
    }

    lens-search-bar-multiple {
      grid-column: 1/2;
    }
  }

  .catalogue-toggle-button {
    padding: var(--gap-xs) var(--gap-s);
    background-color: var(--blue);
    color: var(--white);
    border: none;
    border-radius: var(--border-radius-small);
    cursor: pointer;
    font-size: var(--font-size-m);
    position: relative;
  }

  .catalogue-toggle-button:hover {
    background-color: var(--light-blue);
  }

  .catalogue-toggle-button img {
    height: 30px;
    filter: brightness(0) invert(1);
    position: absolute;
    top: 4px;
    left: 8px;
    transform: rotate(90deg);
    transition: transform 0.3s;
  }

  .catalogue-toggle-button span {
    margin-left: var(--gap-m);
  }

  .catalogue {
    overflow: hidden;
    padding-left: var(--gap-s);
    margin-bottom: var(--gap-xl);
    transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
    max-height: 0;
    position: relative;
  }

  .catalogue.open {
    overflow: visible;
    transition: max-height 0.5s cubic-bezier(0.74, 0.13, 1, 0.1);
    max-height: 2000px;
    padding-left: var(--gap-s);
  }

  .catalogue-toggle-button .open {
    transform: rotate(-90deg);
  }

  .charts {
    display: block;
    grid-gap: var(--gap-s);
  }

  @media screen and (min-width: 769px) {
    .charts {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .chart-wrapper {
    padding: var(--gap-s);
    margin-bottom: var(--gap-s);
    background-color: var(--white);
    border-radius: var(--border-radius-small);
    border: solid 1px var(--light-gray);
    display: grid;
  }

  .result-summary {
    grid-column: 1/-1;
    border: none;
  }

  lens-result-summary {
    grid-template-columns: 1fr auto;
    display: block;
  }

  lens-result-summary::part(result-summary-content) {
    gap: var(--gap-l);
  }

  .negotiate {
    margin: 0 50px;
  }

  @media screen and (min-width: 768px) {
    .chart-diagnosis {
      grid-column: 1/-1;
    }
  }

  @media screen and (min-width: 1024px) {
    lens-result-summary {
      display: grid;
    }

    lens-result-summary::part(result-summary-header-title) {
      margin: 0;
    }

    .charts {
      grid-template-columns: repeat(4, 1fr);
      display: grid;
    }

    .chart-wrapper {
      margin-bottom: 0;
    }

    .result-table {
      grid-column: 1/-1;
    }

    .chart-sample-kind {
      grid-column: span 2;
    }

    .chart-diagnosis {
      grid-column: 1/-1;
    }
  }

  lens-search-bar-multiple::part(lens-searchbar) {
    padding: var(--gap-xxs) var(--gap-xxs);
  }

  lens-search-bar-multiple::part(autocomplete-options-item-name) {
    min-width: 55px;
  }

  lens-search-bar-multiple::part(autocomplete-options-item-description) {
    display: inline-block;
  }

  lens-search-bar-multiple::part(lens-searchbar-chips) {
    gap: var(--gap-xxs);
  }

  lens-search-bar-multiple::part(lens-searchbar-add-button) {
    height: 40px;
    align-self: center;
    background-color: var(--orange);
  }

  lens-search-bar-multiple::part(lens-searchbar-add-button):hover {
    opacity: 0.8;
  }

  lens-search-bar-multiple::part(lens-searchbar-chip) {
    padding: var(--gap-xxs) var(--gap-xs);
  }

  lens-search-bar-multiple::part(info-button) {
    background-color: var(--blue);
    border-color: var(--blue);
    position: relative;
    border: 0;
    margin-left: -10px;
    padding-top: 10px;
    display: inline-flex;
    width: 30px;
  }

  lens-search-bar-multiple::part(info-button-icon) {
    filter: brightness(0) invert(1);
    cursor: pointer;
    width: 20px;
    position: absolute;
    top: -19px;
    left: 5px;
  }

  lens-search-bar-multiple::part(info-button-dialogue) {
    position: absolute;
    border: none;
    background-color: var(--white);
    width: max-content;
    max-width: 200px;
    z-index: 100;
    padding: var(--gap-s);
    top: calc(var(--gap-m) + 4px);
    right: -20px;
    border: solid 1px var(--light-blue);
    border-radius: var(--border-radius-small);
    text-align: left;
  }

  lens-search-bar-multiple::part(query-delete-button-item) {
    border-color: var(--white);
  }

  lens-search-bar-multiple::part(query-delete-button-group) {
    background-color: var(--white);
    border-color: var(--white);
  }

  lens-search-bar-multiple::part(query-delete-button-value) {
    background-color: var(--blue);
    font-size: var(--font-size-xs);
    height: 16px;
    width: 16px;
    margin: 0 var(--gap-xxs) 0 0;
  }

  .search-wrapper lens-info-button {
    height: 40px;
    align-self: center;
    justify-self: end;
  }

  lens-search-bar-multiple::part(query-delete-button-value):hover {
    color: var(--orange);
  }

  lens-search-button {
    height: 40px;
    align-self: center;
  }

  lens-search-button::part(lens-search-button) {
    background-color: var(--blue);
  }

  lens-search-button::part(lens-search-button):hover {
    opacity: 0.8;
  }

  lens-search-button::part(lens-search-button):active {
    background-color: #003d7e;
    transform: translateX(1px);
  }

  /**
    Catalogue
    */

  lens-catalogue::part(lens-catalogue) {
    padding-left: 8px;
  }

  lens-catalogue::part(autocomplete-formfield-input):focus {
    border-color: var(--blue);
  }

  lens-catalogue::part(query-add-button):hover {
    opacity: 0.8;
  }

  lens-catalogue::part(number-input-formfield):focus {
    border-color: var(--blue);
    outline: none;
  }

  lens-catalogue::part(number-input-formfield):focus {
    border-color: var(--blue);
    outline: none;
  }

  lens-catalogue::part(number-input-formfield)::-webkit-outer-spin-button,
  lens-catalogue::part(number-input-formfield)::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  lens-catalogue::part(data-tree-element-child-category),
  lens-catalogue::part(data-tree-element-last-child-options) {
    border-left: solid 1px var(--gray);
  }

  lens-catalogue::part(data-tree-element-toggle-icon) {
    width: 28px;
    transform: rotate(0deg);
    left: -13px;
    top: -4px;
    filter: invert(29%) sepia(17%) saturate(327%) hue-rotate(163deg)
      brightness(92%) contrast(85%);
  }

  lens-catalogue::part(data-tree-element-toggle-icon-open) {
    transform: rotate(90deg);
  }

  lens-catalogue::part(query-add-button-icon) {
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(213deg)
      brightness(100%) contrast(100%);
    width: 21px;
  }

  lens-search-button::part(lens-search-button) {
    height: 100%;
    padding-top: 0;
    padding-bottom: 0;
  }

  lens-info-button::part(info-button-icon) {
    width: 18px;
  }

  lens-info-button::part(info-button) {
    height: 100%;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .catalogue-info-button {
    display: inline-flex;
    vertical-align: middle;
    padding-bottom: 5px;
  }

  .catalogue-info-button lens-info-button::part(info-button) {
    height: 38px;
    width: 38px;
    margin-top: 5px;
    padding: 0;
    border: none;
  }
  .catalogue-info-button lens-info-button::part(info-button-dialogue) {
    max-width: 200px;
  }
  lens-catalogue::part(info-button-dialogue) {
    max-width: 200px;
    border: solid 1px var(--blue);
  }

  :root {
    --color-gray: #3c3c3d;
    --color-orange: #e95713;
    --color-blue: #003674;
    --color-site-background: #fff;
    --color-border-light: #ced4da;
    --color-background-light-gray: #c5cfd5;
    --color-progressbar-success: var(--color-blue);
    --color-progressbar-failed: var(--color-orange);
  }

  .stretch-loading-animation {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .wrapper {
    height: var(--size);
    width: var(--size);
    display: inline-block;
    text-align: center;
    font-size: 10px;
  }
  .rect {
    height: 100%;
    width: 10%;
    display: inline-block;
    margin-right: 4px;
    transform: scaleY(0.4);
    background-color: var(--color);
    animation: stretch var(--duration) ease-in-out infinite;
  }
  .pause-animation {
    animation-play-state: paused;
  }
  @keyframes stretch {
    0%,
    40%,
    100% {
      transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
    }
  }
</style>
