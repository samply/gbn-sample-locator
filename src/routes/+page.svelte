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

  import "../app.css";
  import type {
    LensOptions,
    Catalogue,
    SpotResult,
    AstTopLayer,
  } from "@samply/lens";
  import {
    setOptions,
    setCatalogue,
    markSiteClaimed,
    setSiteResult,
    clearSiteResults,
    getAst,
    querySpot,
  } from "@samply/lens";
  import { onMount } from "svelte";
  import { env } from "$env/dynamic/public";

  import { v4 as uuidv4 } from "uuid";
  import optionsTest from "../config/options.test.json";
  import optionsPub from "../config/options.pub.json";
  import optionsProd from "../config/options.prod.json";
  import catalogue from "../catalogues/gbn.json";

  let catalogueopen = $state(false);

  const toggleCatalogue = () => {
    catalogueopen = !catalogueopen;
  };

  let abortController = new AbortController();
  function sendQuery(ast: AstTopLayer) {
    abortController.abort();
    abortController = new AbortController();
    clearSiteResults();

    const query = btoa(
      JSON.stringify({
        lang: "ast",
        payload: btoa(JSON.stringify({ ast, id: uuidv4() })),
      }),
    );
    querySpot(query, abortController.signal, (result: SpotResult) => {
      const site = result.from.split(".")[1];
      if (result.status === "claimed") {
        markSiteClaimed(site);
      } else if (result.status === "succeeded") {
        const siteResult = JSON.parse(atob(result.body));
        setSiteResult(site, siteResult);
      } else {
        console.error(
          `Site ${site} failed with status ${result.status}:`,
          result.body,
        );
      }
    });
  }

  window.addEventListener("lens-search-triggered", () => {
    sendQuery(getAst());
  });

  onMount(() => {
    // Set the options based on the environment
    let options: LensOptions = optionsTest;

    switch (env.PUBLIC_ENVIRONMENT) {
      case "prod":
        options = optionsProd;
        break;
      case "test":
        options = optionsTest;
        break;
      case "pub":
        options = optionsPub;
        break;
      default:
        options = optionsTest;
    }
    setOptions(options);
    // Set the catalogue
    setCatalogue(catalogue as Catalogue);
  });

  let chartColors: string[] = ["#42d1b8", "#d9f6f1", "#68dac6", "#b3ede3"];

  let chartHoverColors: string[] = ["#a8a4a5"];
</script>

<main>
  <div class="banner">
    <img src="gba-banner.png" alt="sample locator banner" class="banner-img" />
    <div class="overlay">
      <div class="text-bubble">
        <h1>Sample Locator</h1>
        <h2>Search for human biospecimens across European biobanks</h2>
      </div>
    </div>
  </div>
  <div class="search-wrapper">
    <div class="search">
      <div class="search-bar-wrapper">
        <lens-search-bar-multiple
          noMatchesFoundMessage="We couldn't find any matches for your search"
        ></lens-search-bar-multiple>
      </div>
      <lens-query-explain-button
        noQueryMessage="An empty search will return all results"
      ></lens-query-explain-button>
      <lens-search-button title="Search"></lens-search-button>
    </div>
  </div>

  <div class="catalogue-toggle-wrapper">
    <button class="catalogue-toggle-button" onclick={toggleCatalogue}>
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
        buttonSize="18px"
      ></lens-info-button>
    </div>
  </div>
  <div class="catalogue {catalogueopen ? 'open' : ''}">
    <!-- we are implementing our own collapsable toggle -->
    <lens-catalogue
      toggle={JSON.stringify({ collapsable: false, open: catalogueopen })}
    ></lens-catalogue>
  </div>

  <div class="charts">
    <div class="chart-wrapper result-summary">
      <lens-result-summary></lens-result-summary>
    </div>
    <div class="chart-wrapper result-table">
      {#if env.PUBLIC_ENVIRONMENT === "test" || env.PUBLIC_ENVIRONMENT === "prod"}
        <lens-result-table pageSize="10" pageSizeSwitcher={true}>
          <div slot="beneath-pagination">
            <lens-negotiate-button class="negotiate" type="Negotiator"
            ></lens-negotiate-button>
          </div></lens-result-table
        >
      {/if}
      <lens-search-modified-display>
        <div>Search has been modified!</div>
      </lens-search-modified-display>
    </div>

    <div class="chart-wrapper">
      <lens-chart
        title="Gender Distribution"
        dataKey="gender"
        chartType="pie"
        displayLegends={true}
        backgroundColor={chartColors}
        backgroundHoverColor={chartHoverColors}
      ></lens-chart>
    </div>

    <div class="chart-wrapper chart-age-distribution">
      <lens-chart
        title="Age Distribution"
        dataKey="donor_age"
        chartType="bar"
        groupRange={10}
        filterRegex="^(1*[12]*[0-9])"
        backgroundColor={chartColors}
        backgroundHoverColor={chartHoverColors}
      ></lens-chart>
    </div>

    <div class="chart-wrapper chart-sample-kind">
      <lens-chart
        title="Specimens"
        dataKey="sample_kind"
        chartType="bar"
        backgroundColor={chartColors}
        backgroundHoverColor={chartHoverColors}
      >
      </lens-chart>
    </div>

    <div class="chart-wrapper chart-diagnosis">
      <lens-chart
        title="Diagnosis"
        dataKey="diagnosis"
        chartType="bar"
        groupingDivider="."
        groupingLabel=".%"
        backgroundColor={chartColors}
        backgroundHoverColor={chartHoverColors}
      ></lens-chart>
    </div>
  </div>
</main>

<error-toasts></error-toasts>
