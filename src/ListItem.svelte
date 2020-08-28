<script>
  import { getIconId } from './utils';

  export let icon;

  icon = getIconId(icon);
</script>

<style>
  .icon {
    width: 1em;
    height: 1em;
    margin-right: 0.25em;
  }
</style>

<li>
  {#if icon}
    <svg class="icon">
      <use
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xlink:href="images/icons.svg#{icon}"></use>
    </svg>
  {/if}
  <slot />
</li>