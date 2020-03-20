import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

import "@polymer/iron-icons/iron-icons.js";

class SuggestionScreen extends PolymerElement {
  static get is() {
    return "suggestion-screen";
  }
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .suggestions-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: 80%;
          background-color: black;
        }

        @media (max-width: 700px) {
        }
      </style>

      <iron-icon icon="arrow-back" on-click="_dispatchBackClickedEvent"></iron-icon>
      <div class="suggestions-container"></div>
    `;
  }

  static get properties() {
    return {};
  }

  ready() {
    super.ready();
  }

  _dispatchBackClickedEvent() {
    this.dispatchEvent(new CustomEvent("back-clicked"));
  }
}

window.customElements.define(SuggestionScreen.is, SuggestionScreen);
