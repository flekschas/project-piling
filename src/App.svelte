<script>
  import { onMount } from 'svelte';

  import Button, { Group, Label } from '@smui/button';
  import mediumZoom from 'medium-zoom';

  import Author from './Author.svelte';
  import Badge from './Badge.svelte';
  import Footer from './Footer.svelte';
  import Headline from './Headline.svelte';
  import ListItem from './ListItem.svelte';
  import Main from './Main.svelte';
  import Overflow from './Overflow.svelte';
  import Publication from './Publication.svelte';
  import Ratio from './Ratio.svelte';
  import Section from './Section.svelte';

  import VSpace from './VSpace.svelte';

  import { example } from './stores.js';
  import { supportsWebGl2 } from './utils';

  import createPilingImages from './piling-images.js';
  import createPilingMatrices from './piling-matrices.js';
  import createPilingAreaCharts from './piling-area-charts.js';
  import createPilingDrawings from './piling-drawings.js';

  let webgl2Support;
  supportsWebGl2().then((_webgl2Support) => {
    webgl2Support = _webgl2Support;
  });

  let wrapper;
  let piling;
  let mounted = false;

  $: {
    createPiling($example);
  }

  async function createPiling(exampleName) {
    if (!mounted) return;

    if (piling) piling.destroy();

    switch ($example) {
      case 'matrices':
        if (await supportsWebGl2()) {
          piling = await createPilingMatrices(wrapper);
        } else {
          piling = undefined;
        }
        break;

      case 'area-charts':
        piling = await createPilingAreaCharts(wrapper);
        break;

      case 'drawings':
        piling = await createPilingDrawings(wrapper);
        break;

      case 'images':
      default:
        piling = await createPilingImages(wrapper);
        break;
    }
  }

  onMount(() => {
    mounted = true;
    createPiling();
    mediumZoom('.zoomable', { margin: 24, background: 'rgba(0, 0, 0, 0.8)' });
  });
</script>

<style>
  .container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    box-shadow: 0 0 0 1px var(--gray-medium);
    border-radius: 0.25rem;
  }

  .container-pilingjs {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .container-warn {
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: black;
    background: var(--gray-medium);
  }

  .caption,
  .caption-inline {
    color: var(--gray-medium);
    text-align: center;
  }

  .caption {
    position: absolute;
    left: 0;
    right: 0;
  }

  .gallery {
    display: flex;
    margin: 3rem 0;
    padding: 0;
    list-style: none;
  }

  .gallery figure {
    margin: 0 0.5rem;
    transition: transform var(--tnormal) var(--ease);
  }

  .gallery figure:hover {
    transform: scale(1.1);
  }

  .video {
    width: 100%;
    height: 100%;
  }

  .example-buttons {
    margin-left: -1px;
    margin-right: -1px;
  }

  .example-buttons :global(.smui-button__group) {
    display: flex;
  }

  .example-buttons :global(.mdc-button) {
    flex-grow: 1;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .example-buttons :global(.mdc-button:disabled) {
    border-color: var(--gray-medium);
    cursor: not-allowed;
  }

  .example-buttons :global(.mdc-button:disabled .mdc-button__label) {
    text-decoration: line-through;
    opacity: 0.75;
  }

  .no-wrap {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  /* 640px */
  @media screen and (min-width: 40em) {
    .bigger {
      font-size: 1.125em;
    }
  }

  /* 960px */
  @media screen and (min-width: 60em) {
    .bigger {
      font-size: 1.25em;
    }

    .justify {
      text-align: justify;
    }
  }

  /* 1280px */
  @media screen and (min-width: 80em) {
    .bigger {
      font-size: 1.375em;
    }
  }
</style>

<Main>
  <Headline level={1}>
    <span class="no-wrap">Interactive</span>
    <span class="no-wrap">Visual Piling</span>
    <br/>
    <span class="no-wrap">of Small Multiples</span>
  </Headline>
  <Section>
    <div slot="left">
      <p class="bigger justify"><strong>Visual piling is a technique for interactive organization, exploration, and comparison of large collections of small multiples.</strong> Handling large numbers of small multiples imposes challenges on many analytic tasks like inspection, comparison, navigation, or annotation. To address these challenges, we lay out a design space and implemented a library called <a href="https://github.com/flekschas/piling.js" target="_blank">Piling.js</a> for designing interactive piling interfaces.</p>
    </div>
    <div slot="right">
      <Ratio ratio={2800/1800}>
        <div class="container">
          <iframe
            class="video"
            title="Video introduction to visual piling"
            src="https://www.youtube.com/embed/-SlwWtTCWFU?rel=0&modestbranding=1&autohide=1&controls=0"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
      </Ratio>
      <p class="caption">Video introduction to visual piling.</p>
    </div>
  </Section>
  <Section>
    <article slot="center">
      <Headline level={2} id="design-space" lines>A Design Space For Visual Piling</Headline>
      <p class="bigger justify">Based on a systematic analysis of previous work, we define a design space according to five analytical tasks that any piling interface should support: <em>grouping</em>, <em>arrangement</em>, <em>previewing</em>, <em>browsing</em>, and <em>aggregation</em>.</p>
      <Overflow>
        <ol class="gallery">
          <li>
            <figure>
              <img
                class="zoomable"
                src="images/design-space-grouping.png"
                alt="Design Space: Grouping"
              >
            </figure>
          </li>
          <li>
            <figure>
              <img
                class="zoomable"
                src="images/design-space-arrangement.png"
                alt="Design Space: Arrangement"
              >
            </figure>
          </li>
          <li>
            <figure>
              <img
                class="zoomable"
                src="images/design-space-previewing.png"
                alt="Design Space: Previewing"
              >
            </figure>
          </li>
          <li>
            <figure>
              <img
                class="zoomable"
                src="images/design-space-browsing.png"
                alt="Design Space: Browsing"
              >
            </figure>
          </li>
          <li>
            <figure>
              <img
                class="zoomable"
                src="images/design-space-aggregation.png"
                alt="Design Space: Aggregation"
              >
            </figure>
          </li>
        </ol>
        <p class="caption-inline" style="margin: -3rem 0 2rem;">For more details please check out <a href="#publication">our paper</a>.</p>
      </Overflow>
      <p class="bigger justify"><em>Grouping</em> involves manually or automatically sorting of items into piles. For <em>arrangements</em>, we consider the relative positioning of items on a pile and the absolute positioning of piles in an orderly, randomized, gridded, or unconstrained layout. To afford content-awareness, visual piles can implement different layout types to support identifying and locating items on a pile, which we summarize as <em>previewing</em>. In the context of visual piling, <em>browsing</em> includes searching, exploring, and navigating within and between piles for inspecting the visual details of individual items. Finally, <em>aggregation</em> is the act of summarizing piled items into a concise form.
      </p>
    </article>
  </Section>
  <Section>
    <div slot="center">
      <Headline level={2} id="pilingjs" lines>Piling.js &ndash; A Library For Visual Piling</Headline>
    </div>
    <div slot="left">
      <Ratio ratio={2800/1800}>
        {#if $example === 'matrices' && !webgl2Support}
          <div class="container container-pilingjs container-warn">
            <p>Your browser does not support WebGL2. Please use Chrome or Firefox.</p>
          </div>
        {/if}
        <div class="container container-pilingjs" bind:this={wrapper} />
      </Ratio>
      <div class="example-buttons">
        <Group>
          <Button
            color="secondary"
            variant={$example === 'images' ? 'unelevated' : 'outlined'}
            dense
            on:click={() => example.set('images')}
          >
            <Label>Images</Label>
          </Button>
          <Button
            color="secondary"
            variant={$example === 'matrices' ? 'unelevated' : 'outlined'}
            dense
            on:click={() => example.set('matrices')}
          >
            <Label>Matrices</Label>
          </Button>
          <Button
            color="secondary"
            variant={$example === 'area-charts' ? 'unelevated' : 'outlined'}
            dense
            on:click={() => example.set('area-charts')}
          >
            <Label>Area Charts</Label>
          </Button>
          <Button
            color="secondary"
            variant={$example === 'drawings' ? 'unelevated' : 'outlined'}
            dense
            on:click={() => example.set('drawings')}
          >
            <Label>Drawings</Label>
          </Button>
        </Group>
      </div>
      <p class="caption">More examples at <a href="https://piling.js.org" target="_blank">piling.js.org</a>.</p>
    </div>
    <div slot="right">
      <p class="bigger justify">To streamline the implementation of piling interfaces, we developed <a href="https://piling.js.org" target="_blank">Piling.js</a> &ndash; a JavaScript-based library that provides solutions for many common aspects of our design space. Piling.js is built around a data-type independent rendering pipeline and a declarative view specification to avoid having to write low-level code for handling the interactive piling interface.</p>
    </div>
  </Section>
  <Section>
    <div slot="center">
      <Headline level={3} id="publication" lines>Publication</Headline>
      <Publication>
        <a href="https://vcg.seas.harvard.edu/pubs/piling" target="_blank" slot="title">A Generic Framework and Library for Exploration of Small Multiples through Interactive Piling</a>
        <ol slot="authors">
          <li>Fritz Lekschas</li>
          <li>Xinyi Zhou</li>
          <li>Wei Chen</li>
          <li>Nils Gehlenborg</li>
          <li>Benjamin Bach</li>
          <li>Hanspeter Pfister</li>
        </ol>
        <span slot="journal">To appear in IEEE Transactions on Visualization and Computer Graphics</span>
        <span slot="series">InfoVis '20</span>
        <span slot="year">2020</span>
      </Publication>
      <Badge icon="award" text="IEEE InfoVis: Honorable Mention Award" />
    </div>
  </Section>
  <Section>
    <div slot="center">
      <Headline level={3} id="code-data" lines>Code &amp; Data</Headline>
      <p><strong>All the code is available on GitHub:</strong></p>
      <ul class="no-list-style">
        <ListItem icon="github">
          <a href="https://github.com/flekschas/piling.js" target="_blank">github.com/flekschas/piling.js</a>
        </ListItem>
      </ul>
      <VSpace space={1} />
      <p><strong>For the demos we used data from the following sources:</strong></p>
      <ul class="no-list-style">
        <ListItem icon="data">
          <a href="https://cocodataset.org" target="_blank">The Common Objects in Context dataset from Lin et al. 2014</a>
        </ListItem>
        <ListItem icon="data">
          <a href="http://hipiler.higlass.io" target="_blank">Hi-C loop calls from Rao et al. 2014 as used in Lekschas et al. 2018</a>
        </ListItem>
        <ListItem icon="data">
          <a href="https://github.com/CSSEGISandData/COVID-19" target="_blank">COVID-19 infection rates from Johns Hopkins University</a>
        </ListItem>
        <ListItem icon="data">
          <a href="https://github.com/googlecreativelab/quickdraw-dataset" target="_blank">The Quickdraw dataset from Google</a>
        </ListItem>
        <ListItem icon="data">
          <a href="https://data.giss.nasa.gov/gistemp/" target="_blank">The global surface temperature dataset (GISTEMP) from NASA.</a>
        </ListItem>
        <ListItem icon="data">
          <a href="http://linnarssonlab.org/osmFISH/" target="_blank">The osmFISH dataset from Codeluppi et al., 2018</a>
        </ListItem>
      </ul>
    </div>
  </Section>
  <Section>
    <div slot="center">
      <Headline level={3} id="authors" lines>Authors</Headline>
      <ol class="no-list-style">
        <li>
          <Author>
            <span slot="name">Fritz Lekschas</span>
            <span slot="affiliation">Harvard School of Engineering and Applied Sciences</span>
            <a href="https://lekschas.de" target="_blank" slot="website">lekschas.de</a>
            <a href="https://twitter.com/flekschas" target="_blank" slot="twitter">flekschas</a>
            <a href="https://github.com/flekschas" target="_blank" slot="github">flekschas</a>
          </Author>
        </li>
        <li>
          <Author>
            <span slot="name">Xinyi Zhou</span>
            <span slot="affiliation">Zhejiang University<br/>State Key Lab of CAD&CG</span>
            <a href="https://github.com/eeeeenchanted" target="_blank" slot="github">eeeeenchanted</a>
          </Author>
        </li>
        <li>
          <Author>
            <span slot="name">Wei Chen</span>
            <span slot="affiliation">Zhejiang University<br/>State Key Lab of CAD&CG</span>
            <a href="http://www.cad.zju.edu.cn/chenwei/" target="_blank" slot="website">cad.zju.edu.cn/chenwei</a>
          </Author>
        </li>
        <li>
          <Author>
            <span slot="name">Nils Gehlenborg</span>
            <span slot="affiliation">Harvard Medical School</span>
            <a href="http://gehlenborglab.org" target="_blank" slot="website">gehlenborglab.org</a>
            <a href="https://twitter.com/ngehlenborg" target="_blank" slot="twitter">ngehlenborg</a>
            <a href="https://github.com/ngehlenborg" target="_blank" slot="github">ngehlenborg</a>
          </Author>
        </li>
        <li>
          <Author>
            <span slot="name">Benjamin Bach</span>
            <span slot="affiliation">University of Edinburgh</span>
            <a href="https://visualinteractivedata.github.io/bach" target="_blank" slot="website">visualinteractivedata.github.io/bach</a>
            <a href="https://twitter.com/benjbach" target="_blank" slot="twitter">benjbach</a>
            <a href="https://github.com/benjbach" target="_blank" slot="github">benjbach</a>
          </Author>
        </li>
        <li>
          <Author>
            <span slot="name">Hanspeter Pfister</span>
            <span slot="affiliation">Harvard School of Engineering and Applied Sciences</span>
            <a href="https://vcg.seas.harvard.edu" target="_blank" slot="website">vcg.seas.harvard.edu</a>
            <a href="https://twitter.com/hpfister" target="_blank" slot="twitter">hpfister</a>
          </Author>
        </li>
      </ol>
    </div>
  </Section>
</Main>
<Footer />