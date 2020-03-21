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
      </style>

      Timer [[time]] min.
    `;
  }

  static get properties() {
    return {
      time: {
        type: Number,
        value: 0
      }
    };
  }

  ready() {
    super.ready();
  }
}

window.customElements.define(TimerScreen.is, TimerScreen);
