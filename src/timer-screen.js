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
      <iron-icon icon="arrow-back" on-click="_dispatchBackClickedEvent"></iron-icon>

      Timer [[time]] min.
    `;
  }

  _dispatchBackClickedEvent() {
    this.dispatchEvent(new CustomEvent("back-clicked"));
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
