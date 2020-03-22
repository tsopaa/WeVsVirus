import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "./shared-styles.js";

class EndScreen extends PolymerElement {
  static get is() {
    return "end-screen";
  }
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          color: white;
        }
        iron-icon {
          color: white;
        }
        img {
          width: 300px;
          height: 300px;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
        }
        .text {
          font-size: 20px;
          margin: 5%;
          text-align: center;
        }
        .continue-btn {
          background-color: darkgreen;
          color: white;
          position: relative;
          width: 170px;
          left: 50%;
          transform: translateX(-50%);
        }
      </style>

      <iron-icon icon="arrow-back" class="back-btn" on-click="_backClicked"></iron-icon>
      <div id="dead" style="display: none;">
        <img src="res/conny-dead.png" />
        <div class="text">
          Sie haben es geschafft, Sie haben Conny für heute besiegt! Kommen Sie morgen wieder, um die Vire erneut
          herauszufordern.
        </div>
      </div>
      <div id="alive">
        <div class="text">
          Holen Sie sich noch mehr Vorschläge um Conny in die Knie zu zwängen!
        </div>
        <img src="res/conny.png" />
        <paper-button class="continue-btn" on-click="_backClicked">Weiter gehts!</paper-button>
      </div>
    `;
  }

  static get properties() {
    return {
      health: {
        type: Number,
        observer: "_healthChanged"
      }
    };
  }

  ready() {
    super.ready();
  }

  _healthChanged() {
    if (this.health <= 0) {
      this.$.dead.style.display = "block";
      this.$.alive.style.display = "none";
    } else {
      this.$.alive.style.display = "block";
      this.$.dead.style.display = "none";
    }
  }

  _backClicked() {
    this.dispatchEvent(new CustomEvent("back-clicked"));
  }
}

window.customElements.define(EndScreen.is, EndScreen);
