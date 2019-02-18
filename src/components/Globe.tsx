import React from 'react'

export const Globe: React.FC<{ width?: string; height?: string }> = (
  props,
): JSX.Element => (
  <svg
    viewBox="0 0 470 470"
    width="1em"
    height="1em"
    fill="hsl(210, 24%, 16%)"
    {...props}
  >
    <path d="M432.5 227.5h-77.031c-.611-37.438-5.782-73.616-14.771-105.694h50.518c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5h-55.112c-8.018-24.165-18.316-45.521-30.553-62.656a7.5 7.5 0 0 0-12.207 8.717c10.618 14.868 19.688 33.199 26.965 53.939H242.5V37.5c0-4.143-3.357-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v69.306h-77.81c7.277-20.74 16.347-39.071 26.965-53.939a7.5 7.5 0 0 0-12.207-8.717c-12.237 17.135-22.535 38.492-30.553 62.656H78.783c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h50.518c-8.988 32.078-14.159 68.256-14.771 105.694H37.5c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h77.031c.611 37.438 5.782 73.616 14.771 105.694H78.783c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h55.112c8.019 24.169 18.32 45.529 30.56 62.666a7.494 7.494 0 0 0 6.11 3.142 7.502 7.502 0 0 0 6.097-11.86c-10.621-14.869-19.693-33.204-26.972-53.947h77.81V432.5c0 4.143 3.357 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-69.306h77.81c-7.278 20.744-16.351 39.078-26.972 53.947a7.502 7.502 0 0 0 6.097 11.86 7.492 7.492 0 0 0 6.11-3.142c12.24-17.137 22.54-38.497 30.56-62.666h55.112c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5h-50.519c8.989-32.078 14.16-68.256 14.771-105.694H432.5c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.499-7.5-7.499zM325.14 121.806c9.313 31.683 14.695 67.958 15.326 105.694H242.5V121.806zm-180.28 0h82.64V227.5h-97.966c.632-37.737 6.013-74.011 15.326-105.694zm0 226.388c-9.313-31.683-14.695-67.958-15.326-105.694H227.5v105.694zm180.28 0H242.5V242.5h97.966c-.632 37.737-6.013 74.012-15.326 105.694z" />
    <path d="M401.17 68.83C356.784 24.444 297.771 0 235 0S113.216 24.444 68.83 68.83 0 172.229 0 235.001c0 46.271 13.391 90.899 38.764 129.316l-28.718 86.148a7.502 7.502 0 0 0 9.488 9.488l86.15-28.716C144.102 456.609 188.729 470 235 470c62.771 0 121.784-24.444 166.17-68.83S470 297.771 470 235.001c0-62.772-24.444-121.785-68.83-166.171zM235 455c-44.491 0-87.355-13.222-123.961-38.235a7.5 7.5 0 0 0-6.603-.923L29.02 440.979l25.14-75.414a7.506 7.506 0 0 0-.923-6.604C28.222 322.357 15 279.492 15 235.001 15 113.692 113.691 15 235 15s220 98.692 220 220.001C455 356.309 356.309 455 235 455z" />
  </svg>
)
