const featuredAnimations = [
  {
    js: ``,
    html: ` <div class="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>`,
    class: "loader",
    css: `
    .loader {
/* change color here */
  color: #00E2A6
}
.loader,
.loader div {
  box-sizing: border-box;
}
.loader {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.loader div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
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
  {
    class: "loader2",
    js: ``,
    css: `
.loader2 {
  /* change color here */
  color: #00E2A6
}

.loader2,
.loader2 div {
  box-sizing: border-box;
}
.loader2 {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.loader2 div {
  position: absolute;
  top: 33.33333px;
  width: 13.33333px;
  height: 13.33333px;
  border-radius: 50%;
  background: currentColor;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.loader2 div:nth-child(1) {
  left: 8px;
  animation: loader21 0.6s infinite;
}
.loader2 div:nth-child(2) {
  left: 8px;
  animation: loader22 0.6s infinite;
}
.loader2 div:nth-child(3) {
  left: 32px;
  animation: loader22 0.6s infinite;
}
.loader2 div:nth-child(4) {
  left: 56px;
  animation: loader23 0.6s infinite;
}
@keyframes loader21 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes loader23 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes loader22 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}

`,
    html: `<div class="loader2"><div></div><div></div><div></div><div></div></div>`,
  },
  {
    css: `:root {
  --main-color-tint: #CFE5DF;
  --grey-color-shade: #101715;
  --grey-color-tint: #CFE5DF;
  --shadow-hover: 0px 5px 15px rgba(0, 0, 0, 0.3);
}

.navigation-animation{
width: 100%;
height: 100%;
position: relative;
overflow: hidden;
}

.nav-bg {
  z-index: 999;
  position: absolute;
  border-radius: 50%;
  background-image: radial-gradient(var(--main-color-tint), var(--grey-color-shade));
  height: 32px;
  width: 32px;
  top: 4px;
  right: 4px;
  transition: transform 0.5s cubic-bezier(0.83, 0, 0.17, 1);
}

.nav-circle {
  position: absolute;
  top: 3px;
  right: 3px;
  height: 38px;
  width: 38px;
  background-color: var(--grey-color-tint);
  border-radius: 50%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
}

.nav-circle .nav-burger {
  border-radius: 2px;
  background-color: var(--grey-color-shade);
  width: 60%;
  height: 3px;
  position: relative;
  display: inline-block;
  transition: 0.25s all ease-in-out;
}

.nav-circle .nav-burger::after,
.nav-circle .nav-burger::before {
  transition: 0.25s all ease-in-out;
  border-radius: 2px;
  background-color: var(--grey-color-shade);
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
}

.nav-circle .nav-burger::after {
  top: 7px;
}

.nav-circle .nav-burger::before {
  top: -7px;
}

.nav-list {
  position: absolute;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  top: 50%;
  left: 50%;
  z-index: 1001;
  transform: translate(-400px, -50%);
  transition: 0.5s all cubic-bezier(0.9, -0.2, 0.07, 1.67);
}

.nav-list ul li {
  background-image: linear-gradient(120deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 50%, var(--grey-color-shade) 50%);
  background-size: 300%;
  transition: 0.3s all ease-in-out;
 
}

.nav-list ul li a {
  color: var(--grey-color-shade);
  font-size: 18px;
  transition: all 0.2s ease-in-out;
}

.nav-list ul li:not(:last-child) {
  margin-bottom: 18px;
}

.nav-list ul li:hover,
.nav-list ul li:active {
  transform: skew(-20deg) scale(1.1);
  text-shadow: var(--shadow-hover);
  background-position: -50%;
  box-shadow: 0px 10px 10px black;
}

.nav-list ul li:hover a,
.nav-list ul li:active a {
  color: white;
}

.nav-open .nav-burger {
  background-color: transparent;
}

.nav-open .nav-burger::after {
  background-color: var(--grey-color-tint);
  top: 0;
  transform: rotate(135deg);
}

.nav-open .nav-burger::before {
  background-color: var(--grey-color-tint);
  top: 0;
  transform: rotate(-135deg);
}

.nav-open .nav-list {
  transform: translate(-50%, -50%);
  opacity: 1;
  visibility: visible;
  pointer-events: all;
}

.nav-open .nav-bg {
/*SCALE LARGER ANIMATING BACKGROUND IF TOO SMALL*/
  transform: scale(32);
}

.nav-open .nav-circle {
  background-color: var(--grey-color-shade);
}

.nav-open .header,
.nav-open .main {
  opacity: 0;
  transform: translateX(-400px);
}`,
    html: ` 
    <nav class="navigation-animation">
      <div class="nav-circle"><span class="nav-burger"></span></div>
      <div class="nav-bg"></div>
      <div class="nav-list">
        <ul>
          <li><a href="#">#1 Animation</a></li>
          <li><a href="#">#2 Animation</a></li>
          <li><a href="#">#3 Animation</a></li>
          <li><a href="#">#4 Animation</a></li>
          <li><a href="#">#5 Animation</a></li>
        </ul>
      </div>
    </nav>`,
    js: `document.querySelector(".nav-circle").addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
});
`,
  },
];
export default featuredAnimations;
