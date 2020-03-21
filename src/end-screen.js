import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

class EndScreen extends PolymerElement {
  static get is() {
    return "end-screen";
  }
  static get template() {
    return html`
      <style>
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
        }
      </style>

      <iron-icon icon="arrow-back" on-click="_backClicked"></iron-icon>
      <div>[[message]]</div>
      <img id="dead" src="res/conny-dead.png" style="display: none;" />
      <img id="alive" src="res/conny.png" style="display: none;" />
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
      this.message = "CONNY IST TOT ";
      this.$.dead.style.display = "block";
      this.$.alive.style.display = "none";
    } else {
      this.message = "Hol dir noch mehr Vorschläge um Conny in die Knie zu zwängen";
      this.$.alive.style.display = "block";
      this.$.dead.style.display = "none";
    }
  }

  _backClicked() {
    this.dispatchEvent(new CustomEvent("back-clicked"));
  }
}

window.customElements.define(EndScreen.is, EndScreen);
