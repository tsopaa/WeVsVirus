import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

import "@polymer/iron-icons/iron-icons.js";

import "./suggestion-element.js";

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
        iron-icon {
          color: white;
        }
        .suggestions-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: 80%;
          color: white;
        }

        @media (max-width: 700px) {
        }
      </style>

      <iron-icon icon="arrow-back" on-click="_dispatchBackClickedEvent"></iron-icon>
      <div class="suggestions-container">
        <dom-repeat items="{{suggestions}}">
          <template>
            <div>
              <suggestion-element title="[[item.name]]"></suggestion-element>
            </div>
          </template>
        </dom-repeat>
      </div>
    `;
  }

  static get properties() {
    return {
      suggestions: {
        type: Object,
        value() {
          return [
            { id: 1, name: "Staubsaugen" },
            { id: 2, name: "Mittag kochen" },
            { id: 3, name: "chillen mit kids" }
          ];
        }
      }
    };
  }

  ready() {
    super.ready();
  }

  _dispatchBackClickedEvent() {
    this.dispatchEvent(new CustomEvent("back-clicked"));
  }
}

window.customElements.define(SuggestionScreen.is, SuggestionScreen);
