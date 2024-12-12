const featuredAnimations = [
  {
    html: ` <div class="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>`,

    css: `
    .loader {
  /* change color here */
  color: #1c4c5b
}
.loader,
.loader div {
  box-sizing: border-box;
}
.loader {
  display: inline-block;
  position: relative;
  width: 20%;
  height: 20%;
}
.loader div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 90%;
  height: 90%;
  margin: 8px;
  border: 8px solid currentColor;
  border-radius: 50%;
  animation: loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: currentColor transparent transparent transparent;
}
.loader div:nth-child(1) {
  animation-delay: -0.45s;
}
.loader div:nth-child(2) {
  animation-delay: -0.3s;
}
.loader div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

`,
  },
];
export default featuredAnimations;
