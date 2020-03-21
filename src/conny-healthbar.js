import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

class ConnyHealthbar extends PolymerElement {
  static get is() {
    return "conny-healthbar";
  }
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          color: white;
          width: 100%;
        }
        .conny {
          height: 60px;
          width: 60px;
          margin: 7px 0 0 -9px;
        }
        .progress-container {
          display: inline-block;
          width: calc(90% - 105px);
          height: 20px;
          position: absolute;
          top: 22px;
          left: 80px;
        }
        #progress {
          width: 100%;
          background-color: grey;
          height: 100%;
        }
        #bar {
          width: 25%;
          height: 100%;
          background-color: green;
        }
        .numbers {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -4px;
          color: black;
        }
      </style>
      <img class="conny" src="res/conny.png" />
      <div class="progress-container">
        <div id="progress">
          <div id="bar"></div>
          <div class="numbers">25/100</div>
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
}

window.customElements.define(ConnyHealthbar.is, ConnyHealthbar);
