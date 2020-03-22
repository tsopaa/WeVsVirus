import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

import "@polymer/iron-icons/iron-icons.js";

import "./suggestion-element.js";
import "./shared-styles.js";

class SuggestionScreen extends PolymerElement {
  static get is() {
    return "suggestion-screen";
  }
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        iron-icon {
          color: white;
        }
        .choose-suggestion-title {
          width: 80%;
          color: white;
          font-size: 20px;
          text-align: center;
          position: absolute;
          top: 11px;
          left: 37px;
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
        #suggestion-divider {
          color: white;
          margin-top: 10px;
          width: 74%;
          padding: 0 10%;
        }
        @media (max-width: 700px) {
        }
      </style>

      <iron-icon icon="arrow-back" class="back-btn" on-click="_dispatchBackClickedEvent"></iron-icon>
      <div class="choose-suggestion-title">Wählen Sie einen Vorschlag</div>
      <div class="suggestions-container">
        <dom-repeat items="{{suggestions}}">
          <template>
            <div>
              <suggestion-element
                id="[[item.id]]"
                title="[[item.name]]"
                description="[[item.description]]"
                time="[[item.time]]"
                on-click="_dispatchItemClickedEvent"
              ></suggestion-element>
            </div>
            <hr id="suggestion-divider" />
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
