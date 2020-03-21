import {
  PolymerElement,
  html
} from "@polymer/polymer/polymer-element.js";

import "@polymer/paper-checkbox/paper-checkbox.js";

class StartpageScreen extends PolymerElement {
  static get is() {
    return "startpage-screen";
  }
  static get template() {
    return html `
      <style>
        :host {
          display: flex;
        }

        .random-btn {
          background-color: darkgreen;
          color: white;
          position: relative;
          width: 40%;
          margin-left: 30%;
        }

        .text-container {
          position: relative;
          width: 80%;
          font-size: 26px;
          text-align: center;
          color: white;
          margin: 20% 10% 10% 10%;
        }

        .checkBox {
          position: relative;
          align-self: flex-start;
          border: 1px solid var(--paper-green-200);
          border-radius: 2px;
          padding: 8px 16px;
          --paper-checkbox-checked-color: var(--paper-green-500);
          --paper-checkbox-checked-ink-color: var(--paper-green-500);
          --paper-checkbox-unchecked-color: var(--paper-green-900);
          --paper-checkbox-unchecked-ink-color: var(--paper-green-900);
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

        .checkbox-container {
          position: relative;
          width: 90%;
          margin: 5% 0 0 5%;
          font-size: 18px;
        }

        .conny-img {
          height: 380px;
          width: 380px;
          /* position: absolute; */

          bottom: 10px;
          right: -80px;
        }
        .start-text {
          color: white;
          font-size: 20px;
          text-align: left;
        }
        .start-text--top {
          width: 90%;
          margin: 10% 5% 5% 5%;
        }
        .start-text--bottom {
          margin: 5% 5% 5% 5%;
          width: 90%;
        }

        @media (max-width: 700px) {
          .random-btn {
            width: 80%;
            margin-left: 10%;
          }
        }
      </style>
      <div id="startHint" on-click="_hideStartHint">
        <div class="start-text start-text--top">
          Hilf dabei die Verbreitung des Corona-Virus zu stoppen und bleib Zuhause!
        </div>
        <div class="start-text start-text--bottom">
          Hier sind einige Vorschläge, was du Zuhause alles tun könntest. Und ganz nebenbei kannst du Conny die
          Corona-Vire bekämpfen.
        </div>
        <img class="conny-img" src="res/conny.png" />
      </div>
      <div id="startpage" style="display: none;">
        <div class="text-container">
          Deine täglichen Quarantäne-Vorschläge
        </div>
        <paper-button class="random-btn" on-click="_dispatchRandomBtnClickedEvent">Random</paper-button>
        <div class="checkbox-container">
          <div class="inner-checkbox-container">
            <dom-repeat items="{{categories}}" as="category">
              <template>
                <paper-checkbox id="[[category]]" class="checkBox" on-click="_checkboxClicked"
                  >
                    <span class="title">[[category]]</span>
                    <span class="subtitle">[[_getSugeestionSamples(category)]]</span>
                  </paper-checkbox
                >
              </template>
            </dom-repeat>
          </div>
        </div>
      </div>
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

  _hideStartHint() {
    this.$.startHint.style.display = "none";
    this.$.startpage.style.display = " block";
  }

  _checkboxClicked(evt) {
    if (evt.target.checked) {
      this.dispatchEvent(new CustomEvent("category-checked", {
        detail: {
          name: evt.target.id
        }
      }));
    } else if (!evt.target.checked) {
      this.dispatchEvent(new CustomEvent("category-unchecked", {
        detail: {
          name: evt.target.id
        }
      }));
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