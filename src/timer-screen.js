import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

import "@polymer/iron-icons/iron-icons.js";
import "@polymer/iron-icons/av-icons.js";

class TimerScreen extends PolymerElement {
  static get is() {
    return "timer-screen";
  }
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          color: white;
        }
        iron-icon {
          color: white;
        }
        .top-text-container {
          width: 100%;
          text-align: center;
        }
        .title {
          margin-top: 100px;
          font-size: 30px;
        }
        .timer {
          font-size: 60px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .play-pause {
          width: 80px;
          height: 80px;
          position: absolute;
          bottom: 100px;
          left: 50%;
          transform: translateX(-50%);
        }
      </style>
      <iron-icon icon="arrow-back" on-click="_backClicked"></iron-icon>
      <div class="top-text-container">
        <div class="title">[[title]]</div>
        [[time]] min
      </div>
      <div id="timer" class="timer">[[currentTimerTime]]</div>

      <iron-icon id="pauseIcon" class="play-pause" icon="av:pause" on-click="_pause"></iron-icon>
      <iron-icon
        id="playIcon"
        class="play-pause"
        icon="av:play-arrow"
        on-click="_play"
        style="display: none;"
      ></iron-icon>
    `;
  }

  static get properties() {
    return {
      time: {
        type: Number,
        value: 0,
        observer: "_timeChanged"
      },
      currentTimerTime: {
        type: String
      },
      _paused: {
        type: Boolean,
        value: false
      }
    };
  }

  ready() {
    super.ready();
    this.timer = new easytimer.Timer();
    this.timer.addEventListener("targetAchieved", () => console.log("target achieved"));
  }

  _pause() {
    this.set("_paused", true);
    this.timer.pause();
    this.$.pauseIcon.style.display = "none";
    this.$.playIcon.style.display = "block";
  }

  _play() {
    this.set("_paused", false);
    this.timer.start();
    this.$.pauseIcon.style.display = "block";
    this.$.playIcon.style.display = "none";
  }

  _timeChanged() {
    if (this.time > 0) {
      this.timer.start({ countdown: true, startValues: { minutes: this.time } });
      this.timer.addEventListener("secondsUpdated", () => {
        this.set("currentTimerTime", this.timer.getTimeValues().toString());
      });
    }
  }

  _backClicked() {
    this.timer.stop();
    this.dispatchEvent(new CustomEvent("back-clicked"));
  }
}

window.customElements.define(TimerScreen.is, TimerScreen);
