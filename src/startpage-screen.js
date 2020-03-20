import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

class StartpageScreen extends PolymerElement {
  static get is() {
    return "startpage-screen";
  }
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .random-btn {
          background-color: darkgreen;
          color: white;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40%;
        }

        @media (max-width: 700px) {
          .random-btn {
            width: 80%;
          }
        }
      </style>

      <paper-button class="random-btn" on-click="_dispatchRandomBtnClickedEvent">Random</paper-button>
    `;
  }

  static get properties() {
    return {};
  }

  ready() {
    super.ready();
  }

  _dispatchRandomBtnClickedEvent() {
    this.dispatchEvent(new CustomEvent("random-btn-clicked"));
  }
}

window.customElements.define(StartpageScreen.is, StartpageScreen);
