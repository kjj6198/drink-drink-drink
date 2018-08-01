<script>
import styled from 'vue-styled-components';

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default {
  name: 'LoadingCircle',
  props: ['size'],
  components: { LoadingWrapper },
};
</script>

<template>
  <LoadingWrapper>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0"
        y="0"
        :width="size || 45"
        :height="size || 45"
        viewBox="0 0 50 50"
        xmlSpace="preserve"
      >
        <path
          fill="#27cc95"
          d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
  </LoadingWrapper>
</template>
