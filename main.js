import './self.css'
import { NightSky } from './share/night-sky'
import './share/patch'
import rabit from './assets/img/rabit.png'
import moon from './assets/img/moon.png'

document.querySelector('#app').innerHTML = `
  <!-- 音乐 -->
  <audio id="audio" autoplay="autoplay" loop>
        <source src="xjwns.mp3" type="audio/mp3" />
  </audio>
  <!--//整个空间-->
  <div style="height: calc(100vh - 214px); overflow: hidden;">
      <!--//画布-->
      <canvas id='outerCanvas' style="background-color: rgba(0,5,24,1);"></canvas>
      <!-- 兔子涯 -->
      <div class="mountain">
          <!-- 图片 -->
          <img src="${rabit}" alt="" id="rabit" />
      </div>
      <!--//月亮图片-->
      <img src="${moon}" alt="" id="moon" style="visibility: hidden;" />
  </div>

  <!--//各种祝福语-->
  <div style="display: none">
      <div class="shape">中秋快乐</div>
      <div class="shape">好好吃饭</div>
      <div class="shape">注意休息</div>
      <div class="shape">爱你么么</div>
      <div class="shape">你很棒！</div>
  </div>
`

window.onload = () => {
  var nightSky = new NightSky();
  nightSky.init();

  const music = document.querySelector("#audio")
  document.body.addEventListener('click', function () {
    if (music.paused) {
      music.play();
    }
  })
}