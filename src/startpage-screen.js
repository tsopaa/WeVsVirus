import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

import "@polymer/paper-checkbox/paper-checkbox.js";

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
          --paper-checkbox-unchecked-color: white;
          /*--paper-checkbox-checked-color: black; blue*/
          --paper-checkbox-label-color: white;
          display: block;
          left: 50%;
          transform: translateX(-50%);

        }

        .checkbox-container {
          position: relative;
          width: 90%;
          margin: 5% 0 0 5%;
          font-size: 18px;

        }

        .inner-checkbox-container {
          margin-left: 10%;
        }

        @media (max-width: 700px) {
          .random-btn {
            width: 80%;
            margin-left: 10%;
          }
        }
      </style>
      <div class="text-container">
        Deine täglichen Quarantäne-Vorschläge
      </div>
      <paper-button class="random-btn" on-click="_dispatchRandomBtnClickedEvent">Random</paper-button>

      <div class="checkbox-container">
        <div class="inner-checkbox-container">
          <paper-checkbox class="checkBox">Unchecked</paper-checkbox>
          <paper-checkbox class="checkBox">UncheckedUNCHECKED</paper-checkbox>
          <paper-checkbox class="checkBox">Unchecked</paper-checkbox>
          <paper-checkbox class="checkBox">Unchecked</paper-checkbox>
          <paper-checkbox class="checkBox">Unchecked</paper-checkbox>
          <paper-checkbox class="checkBox">Unchecked</paper-checkbox>
          <paper-checkbox class="checkBox">Unchecked</paper-checkbox>
        </div>
      </div>
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
