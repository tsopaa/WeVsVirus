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
          background-color: black;
        }
        #bar {
          background-image: linear-gradient(to bottom right, green, #c5eb8e);
          transition: width 1s;
          transition-timing-function: ease;
        }
        .progress-bar {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
        .numbers {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -4px;
          color: white;
        }
      </style>
      <img id="connyImg" class="conny" src="res/conny.png" />
      <div class="progress-container">
        <div id="progress" class="progress-bar">
          <div id="bar" class="progress-bar"></div>
          <div class="numbers">[[health]]/100</div>
        </div>
      </div>
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
