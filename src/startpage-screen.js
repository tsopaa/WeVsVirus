import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

import "@polymer/paper-checkbox/paper-checkbox.js";
import "@polymer/iron-icons/iron-icons.js";

class StartpageScreen extends PolymerElement {
  static get is() {
    return "startpage-screen";
  }
  static get template() {
    return html`
      <style>
        :host {
          display: flex;
        }

        .random-btn {
          background-color: darkgreen;
          color: white;
          position: relative;
          width: 300px;
          font-size: 22px;
          left: 50%;
          transform: translateX(-50%);
        }

        .text-container {
          position: relative;
          width: 80%;
          font-size: 32px;
          text-align: center;
          color: white;
          margin: 120px 10% 60px 10%;
        }

        #add-suggestion-button {
          color: #009999;
        }

        .checkBox {
          position: relative;
          align-self: flex-start;
          border: 1px solid var(--paper-green-200);
          border-radius: 2px;
          padding: 8px 16px;
          --paper-checkbox-checked-color: var(--paper-green-500);
          --paper-checkbox-checked-ink-color: rgba(0, 0, 0, 0);
          --paper-checkbox-unchecked-color: var(--paper-green-900);
          --paper-checkbox-unchecked-ink-color: rgba(0, 0, 0, 0);
          --paper-checkbox-label-color: var(--paper-green-700);
          --paper-checkbox-label-spacing: 0;
          --paper-checkbox-margin: 8px 16px 8px 0;
          --paper-checkbox-vertical-align: top;
          display: block;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 2px;
        }

        paper-checkbox .title {
          color: white;
          display: block;
          font-size: 1.2em;
        }

        paper-checkbox .subtitle {
          color: grey;
          display: block;
          font-size: 0.9em;
          width: 100%;
        }
        .title,
        .subtitle {
          pointer-events: none;
        }

        .checkbox-container {
          position: relative;
          width: 500px;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 50px;
          font-size: 20px;
        }

        @media (max-width: 700px) {
          .random-btn {
            width: 80%;
            margin-left: 10%;
            left: 0;
            transform: translateX(0);
          }

          .text-container {
            position: relative;
            width: 80%;
            font-size: 26px;
            text-align: center;
            color: white;
            margin: 100px 10% 10% 10%;
          }
          .checkbox-container {
            position: relative;
            width: 90%;
            margin: 10% 0 0 5%;
            font-size: 18px;
            left: 0;
            transform: translateX(0);
          }
        }
      </style>

      <div id="startpage">
        <div class="text-container">
          Ihre täglichen Quarantäne-Vorschläge
        </div>
        <paper-button class="random-btn" on-click="_dispatchRandomBtnClickedEvent">Los Gehts</paper-button>
        <div class="checkbox-container">
          <div class="inner-checkbox-container">
            <dom-repeat items="{{categories}}" as="category">
              <template>
                <paper-checkbox id="[[category]]" class="checkBox" on-click="_checkboxClicked">
                  <span class="title">[[category]]</span>
                  <span class="subtitle">[[_getSugeestionSamples(category)]]</span>
                </paper-checkbox>
              </template>
            </dom-repeat>
          </div>
        </div>
      </div>
      <!-- <iron-icon icon="add-circle" id="add-suggestion-button" on-click="_addSuggestionClicked"></iron-icon> -->
    `;
  }

  static get properties() {
    return {
      categories: {
        type: Object
      }
    };
  }

  ready() {
    super.ready();
  }

  _addSuggestionClicked() {
    this.dispatchEvent(new CustomEvent("show-add-suggestion"));
  }

  _checkboxClicked(evt) {
    if (evt.target.checked) {
      this.dispatchEvent(
        new CustomEvent("category-checked", {
          detail: {
            name: evt.target.id
          }
        })
      );
    } else if (!evt.target.checked) {
      this.dispatchEvent(
        new CustomEvent("category-unchecked", {
          detail: {
            name: evt.target.id
          }
        })
      );
    }
  }

  _dispatchRandomBtnClickedEvent() {
    this.dispatchEvent(new CustomEvent("random-btn-clicked"));
  }

  _getSugeestionSamples(category) {
    var samples = this.suggestions.filter(suggestion => suggestion.categories.find(cat => cat == category));
    return "z. B. " + samples[0].name;
  }
}

window.customElements.define(StartpageScreen.is, StartpageScreen);
