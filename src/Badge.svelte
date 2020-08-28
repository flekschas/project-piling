<script>
  import { getIconId } from './utils';

  export let text = '';
  export let icon;

  icon = getIconId(icon);
</script>

<style>
  .badge {
    padding: 0.125em 0.25em;
    font-size: 0.8em;
    text-transform: uppercase;
    color: black;
    background: #eee462;
    border-radius: 0.25rem;
  }

  .icon {
    width: 1em;
    height: 1em;
    margin-right: 0.25em;
  }
</style>

<span class="badge">
  {#if icon}
    <svg class="icon">
      <use
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xlink:href="images/icons.svg#{icon}"></use>
    </svg>
  {/if}
  <span>{text}</span>
</span>