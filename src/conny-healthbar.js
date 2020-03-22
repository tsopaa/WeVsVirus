import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

import "@polymer/iron-icons/iron-icons.js";

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
          background-color: #333;
        }
        #bar {
          background-color: green;
          transition: width 1s;
          transition-timing-function: ease;
        }
        .progress-bar {
          width: 100%;
          height: 100%;
          border-radius: 2px;
        }
        .numbers {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -4px;
          color: white;
        }
        iron-icon {
          color: white;
          height: 40px;
          width: 40px;
          position: absolute;
          top: 12px;
          right: 44px;
        }
        @media (max-width: 700px) {
          iron-icon {
            height: 30px;
            width: 30px;
            top: 16px;
          }
          .progress-container {
            width: calc(90% - 135px);
          }
        }
      </style>
      <img id="connyImg" class="conny" src="res/conny.png" />
      <div class="progress-container">
        <div id="progress" class="progress-bar">
          <div id="bar" class="progress-bar"></div>
          <div class="numbers">[[health]]/100</div>
        </div>
      </div>
      <iron-icon icon="help-outline" on-click="_helpClicked"></iron-icon>
    `;
  }

  static get properties() {
    return {
      health: {
        type: Number,
        observer: "_healthChanged",
        notify: true
      }
    };
  }

  ready() {
    super.ready();
  }

  _helpClicked() {
    this.dispatchEvent(new CustomEvent("help-clicked"));
  }

  _healthChanged() {
    if (this.health <= 0) {
      this.set("health", 0);
      this.$.connyImg.src = "res/conny-dead.png";
    } else {
      this.$.connyImg.src = "res/conny.png";
    }
    this.$.bar.style.width = this.health + "%";
  }
}

window.customElements.define(ConnyHealthbar.is, ConnyHealthbar);
