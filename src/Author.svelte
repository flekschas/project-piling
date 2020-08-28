<script>
  const slots = $$props.$$slots
</script>

<style>
  h4 {
    font-size: 1.125em;
    margin: 1em 0 0 0;
  }

  .affiliation {
    font-size: 1em;
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.125em;
    font-size: 0.9em;
  }

  .website,
  .twitter,
  .github {
    display: flex;
    align-items: center;
    margin-right: 0.75em;
  }

  .website:last-child,
  .twitter:last-child,
  .github:last-child {
    margin-right: 0;
  }

  .icon {
    width: 1em;
    height: 1em;
    margin-right: 0.25em;
  }
</style>

<div class="author">
  <h4>
    <slot name="name" />
  </h4>

  <div class="affiliation">
    <slot name="affiliation" />
  </div>

  <div class="links">
    {#if slots.website}
      <div class="website">
        <svg class="icon">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="images/icons.svg#globe"></use>
        </svg>
        <slot name="website" />
      </div>
    {/if}
    {#if slots.twitter}
      <div class="twitter">
        <svg class="icon">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="images/icons.svg#twitter"></use>
        </svg>
        <slot name="twitter" />
      </div>
    {/if}
    {#if slots.github}
      <div class="github">
        <svg class="icon">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="images/icons.svg#github"></use>
        </svg>
        <slot name="github" />
      </div>
    {/if}
  </div>
</div>

<!-- To avoid annoying warnings: https://github.com/sveltejs/svelte/issues/4546#issuecomment-626348879 -->
{#if false}<slot></slot>{/if}