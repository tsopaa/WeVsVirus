import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

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
        .timer {
          font-size: 60px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      </style>
      <iron-icon icon="arrow-back" on-click="_backClicked"></iron-icon>

      Timer [[time]] min.
      <div id="timer" class="timer">[[currentTimerTime]]</div>
    `;
  }

  _backClicked() {
    this.timer.stop();
    this.dispatchEvent(new CustomEvent("back-clicked"));
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
      }
    };
  }

  ready() {
    super.ready();
    this.timer = new easytimer.Timer();
    this.timer.addEventListener("targetAchieved", () => console.log("target achieved"));
  }

  _timeChanged() {
    if (this.time > 0) {
      this.timer.start({ countdown: true, startValues: { minutes: this.time } });
      this.timer.addEventListener("secondsUpdated", () => {
        this.set("currentTimerTime", this.timer.getTimeValues().toString());
      });
    }
  }
}

window.customElements.define(TimerScreen.is, TimerScreen);
