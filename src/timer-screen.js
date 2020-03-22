import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

import "@polymer/iron-icons/iron-icons.js";
import "@polymer/iron-icons/av-icons.js";
import "./shared-styles.js";

class TimerScreen extends PolymerElement {
  static get is() {
    return "timer-screen";
  }
  static get template() {
    return html`
      <style include="shared-styles">
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
        .reset {
          width: 30px;
          height: 30px;
          position: absolute;
          bottom: 125px;
          left: 70%;
          transform: translateX(-50%);
        }
      </style>
      <iron-icon icon="arrow-back" class="back-btn" on-click="_backClicked"></iron-icon>
      <div class="top-text-container">
        <div class="title">[[title]]</div>
        [[time]] min
      </div>
      <div id="timer" class="timer">[[currentTimerTime]]</div>

      <iron-icon id="pauseBtn" class="play-pause" icon="av:pause" on-click="_pause"></iron-icon>
      <iron-icon
        id="playBtn"
        class="play-pause"
        icon="av:play-arrow"
        on-click="_play"
        style="display: none;"
      ></iron-icon>
      <iron-icon id="resetBtn" class="reset" icon="av:replay" on-click="_reset"></iron-icon>
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
      },
      health: {
        type: Number,
        notify: true
      }
    };
  }

  ready() {
    super.ready();
    this.timer = new easytimer.Timer();
    this.timer.addEventListener("targetAchieved", () => {
      this.set("health", this.health - this.time);
      this.dispatchEvent(new CustomEvent("timer-finished"));
    });
  }

  _pause() {
    this.set("_paused", true);
    this.timer.pause();
    this.$.pauseBtn.style.display = "none";
    this.$.playBtn.style.display = "block";
  }

  _play() {
    this.set("_paused", false);
    this.timer.start();
    this.$.pauseBtn.style.display = "block";
    this.$.playBtn.style.display = "none";
  }

  _reset() {
    this.timer.stop();
    this.timer.start({ countdown: true, startValues: { seconds: this.time } });
  }

  _timeChanged() {
    if (this.time > 0) {
      this.timer.start({ countdown: true, startValues: { seconds: this.time } });
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
