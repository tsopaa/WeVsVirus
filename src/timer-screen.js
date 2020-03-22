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
        .timer-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
        .top-text-container {
          padding: 10px;
          display: flex;
          align-items: center;
          flex-direction: column;
        }
        .timer {
          display: flex;
          justify-content: center;
          font-size: 50px;
        }
        .timer-controls {
          display: flex;
          justify-content: center;
        }
        .title {
          font-size: 30px;
        }
        .description {
          color: grey;
          max-width: 500px;
          font-size: 20px;
        }
        .duration {
          float: right;
          padding-left: 10px;
        }
        .play-pause {
          width: 80px;
          height: 80px;
        }
        .reset {
          margin-top: 10px;
          width: 60px;
          height: 60px;
        }
        .grid-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr 1fr;
          grid-template-areas: "timer-container timer-container" "timer-container timer-container" "timer-container timer-container";
        }
        .timer-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 2.6fr 0.2fr 0.2fr;
          grid-template-areas: "top-text-container top-text-container" "timer timer" "timer-controls timer-controls";
          grid-area: timer-container;
        }
        .top-text-container {
          grid-area: top-text-container;
        }
        .timer {
          grid-area: timer;
        }
        .timer-controls {
          grid-area: timer-controls;
        }
      </style>
      <iron-icon icon="arrow-back" class="back-btn" on-click="_backClicked"></iron-icon>
      <div class="grid-container">
        <div class="timer-container">
          <div class="top-text-container">
            <div class="top-text-content">
              <div class="title">
                [[title]]
                <div class="duration">
                  [[time]]'<iron-icon
                    icon="image:timer"
                    id="time-icon"
                    on-click="_dispatchBackClickedEvent"
                  ></iron-icon>
                </div>
              </div>
              <div class="description">[[description]]</div>
            </div>
          </div>

          <div class="timer" id="timer">[[currentTimerTime]]</div>

          <div class="timer-controls">
            <iron-icon id="pauseBtn" class="play-pause" icon="av:pause" on-click="_pause"></iron-icon>
            <iron-icon
              id="playBtn"
              class="play-pause"
              icon="av:play-arrow"
              on-click="_play"
              style="display: none;"
            ></iron-icon>
            <iron-icon id="resetBtn" class="reset" icon="av:replay" on-click="_reset"></iron-icon>
          </div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      time: {
        type: Number,
        value: 0
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
      if (Notification.permission == "granted" && !window.AppGlobals.windowVisible) {
        navigator.serviceWorker.getRegistration().then(reg => {
          var options = {
            icon: "res/conny.png"
          };
          reg.showNotification("Dein Timer für " + this.title + " ist abgelaufen!", options);
        });
      }
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
    this.timer.start({ countdown: true, startValues: { minutes: this.time } });
  }

  startTimer() {
    if (this.time > 0) {
      this.timer.start({ countdown: true, startValues: { minutes: this.time } });
      this.set("currentTimerTime", this.timer.getTimeValues().toString());
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
