/** Build Wistia player embed HTML from a validated media id (operator-approved pattern). */
export function wistiaEmbedHtml(mediaId: string): string {
  const id = mediaId.trim();
  if (!/^[a-z0-9]+$/i.test(id)) {
    return "";
  }
  return `<script src="https://fast.wistia.com/player.js" async></script><script src="https://fast.wistia.com/embed/${id}.js" async type="module"></script><style>wistia-player[media-id='${id}']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${id}/swatch'); display: block; filter: blur(5px); padding-top:56.25%; }</style> <wistia-player media-id="${id}" aspect="1.7777777777777777"></wistia-player>`;
}
