import React from 'react'

export const Globe: React.FC<{ width?: string; height?: string }> = (
  props,
): JSX.Element => (
  <svg viewBox="0 0 512 512" width="1em" height="1em" {...props}>
    <path
      fill="#2f5e88"
      d="M55.62 382.383l-30.746 94.712 97.187-28.732-9.895-63.154z"
    />
    <path
      d="M452.942 248.687h44.256c0 132.308-106.533 239.74-238.501 241.176l194.245-241.176z"
      fill="#25bbcc"
    />
    <g fill="#78e3ec">
      <path d="M254.751 511.998c-.153.003.001.003.17.001.17.001.323.001.17-.001a3.552 3.552 0 0 0-.17-.002c-.294-.001-.276 0-.17.002zM452.942 248.687H14.802c0 132.308 108.143 241.483 240.119 241.18 107.594-.248 198.021-109.014 198.021-241.18z" />
    </g>
    <path
      d="M258.697 7.512l194.244 241.176h44.256c.001-132.309-106.531-239.74-238.5-241.176z"
      fill="#50d1dd"
    />
    <g fill="#a0f6fa">
      <path d="M255.092 7.505c.153-.003-.001-.003-.171-.002-.17-.001-.323-.001-.171.002-.105.001-.123.002.171.002s.276 0 .171-.002zM254.921 7.508C122.946 7.204 14.802 116.379 14.802 248.687h438.139c.001-132.165-90.426-240.932-198.02-241.179z" />
    </g>
    <path d="M465.392 241.198h-81.669c-.648-39.692-6.13-78.048-15.659-112.058h53.56a7.952 7.952 0 0 0 7.952-7.952 7.951 7.951 0 0 0-7.952-7.952h-58.43c-8.501-25.62-19.419-48.262-32.393-66.429a7.951 7.951 0 0 0-11.092-1.85 7.952 7.952 0 0 0-1.85 11.092c11.257 15.763 20.873 35.198 28.589 57.188h-82.495v-73.48c0-4.392-3.559-7.952-7.952-7.952s-7.952 3.559-7.952 7.952v73.479h-82.495c7.715-21.989 17.331-41.423 28.589-57.188a7.952 7.952 0 0 0-12.942-9.242c-12.974 18.167-23.892 40.81-32.393 66.429h-58.43a7.951 7.951 0 0 0-7.952 7.952 7.952 7.952 0 0 0 7.952 7.952h53.56c-9.529 34.009-15.012 72.366-15.66 112.058H46.609c-4.392 0-7.952 3.559-7.952 7.952s3.559 7.952 7.952 7.952h81.669c.648 39.693 6.13 78.048 15.66 112.058h-53.56c-4.392 0-7.952 3.559-7.952 7.952s3.559 7.952 7.952 7.952h58.43c8.502 25.624 19.423 48.27 32.4 66.439a7.946 7.946 0 0 0 6.478 3.331 7.954 7.954 0 0 0 6.464-12.575c-11.26-15.764-20.879-35.203-28.596-57.195h82.495v73.48a7.951 7.951 0 0 0 7.952 7.952 7.951 7.951 0 0 0 7.952-7.952v-73.479h82.495c-7.716 21.993-17.336 41.431-28.596 57.195a7.954 7.954 0 0 0 6.464 12.575 7.943 7.943 0 0 0 6.478-3.331c12.977-18.169 23.897-40.815 32.4-66.439h58.43c4.392 0 7.952-3.559 7.952-7.952s-3.559-7.952-7.952-7.952h-53.561c9.53-34.009 15.013-72.366 15.66-112.058h81.669c4.392 0 7.952-3.559 7.952-7.952s-3.56-7.952-7.952-7.952zM351.568 129.14c9.874 33.591 15.58 72.05 16.249 112.058H263.952V129.14h87.616zm-191.134 0h87.616v112.058H144.185c.669-40.009 6.374-78.467 16.249-112.058zm0 240.019c-9.875-33.591-15.58-72.05-16.249-112.058H248.05v112.058h-87.616zm191.134 0h-87.616V257.101h103.865c-.67 40.009-6.375 78.468-16.249 112.058z" />
    <path d="M432.175 72.974C385.118 25.916 322.551 0 256 0S126.884 25.916 79.826 72.974C32.768 120.033 6.851 182.6 6.851 249.151c0 49.057 14.197 96.372 41.098 137.102l-30.447 91.335a7.954 7.954 0 0 0 1.921 8.138 7.956 7.956 0 0 0 8.138 1.92l91.337-30.445c40.731 26.901 88.046 41.098 137.102 41.098 66.55 0 129.117-25.916 176.175-72.974S505.15 315.701 505.15 249.15s-25.916-129.117-72.975-176.176zM256 482.396c-47.17 0-92.615-14.018-131.425-40.537a7.953 7.953 0 0 0-7.002-.979l-79.957 26.652 26.654-79.955a7.954 7.954 0 0 0-.979-7.001c-26.521-38.809-40.538-84.255-40.538-131.425C22.754 120.539 127.387 15.904 256 15.904s233.246 104.634 233.246 233.247C489.247 377.763 384.613 482.396 256 482.396z" />
  </svg>
)

export default Globe
