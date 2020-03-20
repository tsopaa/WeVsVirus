import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

class SuggestionElement extends PolymerElement {
  static get is() {
    return "suggestion-element";
  }
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .suggestion-container {
          height: 50px;
          border: 1px solid white;
          width: 100%;
          position: relative;
        }
        .suggestion-element {
          font-size: 22px;
          color: white;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          left: 50%;
        }
        @media (max-width: 700px) {
        }
      </style>
      <div class="suggestion-container">
        <div class="suggestion-element">[[title]]</div>
      </div>
    `;
  }

  static get properties() {
    return {
      title: {
        type: String
      }
    };
  }

  ready() {
    super.ready();
    console.log(this.title);
  }
}

window.customElements.define(SuggestionElement.is, SuggestionElement);
