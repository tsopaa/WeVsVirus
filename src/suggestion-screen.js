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
              <suggestion-element
                id="[[item.id]]"
                title="[[item.name]]"
                description="[[item.description]]"
                on-click="_dispatchItemClickedEvent"
              ></suggestion-element>
            </div>
          </template>
        </dom-repeat>
      </div>
    `;
  }

  static get properties() {
    return {
      suggestions: {
        type: Object
      }
    };
  }

  ready() {
    super.ready();
  }

  _dispatchBackClickedEvent() {
    this.dispatchEvent(new CustomEvent("back-clicked"));
  }

  _dispatchItemClickedEvent(evt) {
    let suggestion = this.suggestions.find(el => el.id == evt.target.id);
    this.dispatchEvent(
      new CustomEvent("item-clicked", {
        detail: {
          id: suggestion.id,
          name: suggestion.name,
          time: suggestion.time
        }
      })
    );
  }
}

window.customElements.define(SuggestionScreen.is, SuggestionScreen);
