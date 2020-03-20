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

      Timer
    `;
  }

  static get properties() {
    return {};
  }

  ready() {
    super.ready();
  }

}

window.customElements.define(TimerScreen.is, TimerScreen);
